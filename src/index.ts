import express from "express"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  BillingMethods,
  BillingMethodName,
} from "./merchant-api/billing-methods"
import createPaymeCheckoutLink from "./merchant-api/create-payme-checkout-link"
import createRpcErrorResponse from "./merchant-api/create-rpc-error-response"
import createRpcResponse from "./merchant-api/create-rpc-response"
import isAuthorizationHeaderValid from "./merchant-api/is-authorization-header-valid"
import { rpcErrors, isRpcError } from "./merchant-api/rpc-errors"

const createBilling = <Account extends { [key: string]: string }>(
  id: string,
  key: string,
  methods: BillingMethods<Account>
) => {
  const handleBillingRequest = async (
    req: NextApiRequest | express.Request,
    res: NextApiResponse | express.Response
  ) => {
    if (
      req.method !== "POST" ||
      req.headers["content-type"] !== "application/json" ||
      typeof req.body !== "object" ||
      // Check ID
      !("id" in req.body) ||
      typeof req.body.id !== "number" ||
      // Check method
      !("method" in req.body) ||
      typeof req.body.method !== "string" ||
      // Check params
      !("params" in req.body) ||
      typeof req.body.params !== "object"
    ) {
      const error = createRpcErrorResponse(rpcErrors.invalidRequest)
      return res.send(error)
    }

    const { id, method, params } = req.body

    const authorizationHeader = req.headers.authorization

    if (
      !authorizationHeader ||
      !isAuthorizationHeaderValid(authorizationHeader, "Paycom", key!)
    ) {
      const error = createRpcErrorResponse(id, rpcErrors.accessDenied)
      return res.send(error)
    }

    const methodName = method as BillingMethodName

    const realizedMethod = Object.entries(methods).find(
      ([name]) => name.toLowerCase() === methodName.toLowerCase()
    )?.[1]

    if (typeof realizedMethod !== "function") {
      const error = createRpcErrorResponse(id, rpcErrors.methodNotFound)
      return res.send(error)
    }

    try {
      const result = await realizedMethod(params)
      return res.send(createRpcResponse(id, result))
    } catch (error) {
      if (isRpcError(error)) {
        return res.send(createRpcErrorResponse(id, error))
      } else {
        return res.status(500).end()
      }
    }
  }

  const createCheckoutLink = (
    amount: number,
    returnUrl: string,
    account: Account,
    options: {
      language: "uz" | "en" | "ru"
      countdown: number
    } = {
      language: "uz",
      countdown: 10_000,
    }
  ) =>
    createPaymeCheckoutLink<Account>({
      merchantId: id,
      account,
      amount,
      returnUrl,
      ...options,
    })

  return { handleBillingRequest, createCheckoutLink }
}

export default createBilling
