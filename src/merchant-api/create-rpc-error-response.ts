import { isRpcError, RpcError } from "./rpc-errors"
import { RpcResponse } from "./rpc-response"

type CreateRpcErrorResponseReturnType = Required<Omit<RpcResponse, "result">>

function createRpcErrorResponse(
  error: RpcError
): CreateRpcErrorResponseReturnType

function createRpcErrorResponse(
  id: number,
  error: RpcError
): CreateRpcErrorResponseReturnType

function createRpcErrorResponse(
  idOrError: number | RpcError,
  optionalError?: RpcError
): CreateRpcErrorResponseReturnType {
  const id = typeof idOrError === "number" ? idOrError : null

  const error = isRpcError(idOrError) ? idOrError : optionalError!

  return {
    id,
    error,
    jsonrpc: "2.0",
  }
}

export default createRpcErrorResponse
