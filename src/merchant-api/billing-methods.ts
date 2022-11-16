import { FiscalizationItem } from "./fiscalization-item"
import { Reason } from "./reason"
import { Transaction } from "./transaction"
import { TransactionReceiver } from "./transaction-receiver"
import { TransactionState } from "./transaction-state"

export type BillingMethodName =
  | "checkPerformTransaction"
  | "createTransaction"
  | "performTransaction"
  | "cancelTransaction"
  | "checkTransaction"
  | "getStatement"

export type BillingMethods<Account> = {
  checkPerformTransaction: (data: {
    amount: number
    account: Account
  }) => Promise<{
    allow: boolean

    additional?: Record<string, string>

    detail?: {
      discount?: {
        title: string
        price: number
      }

      shipping?: {
        title: string
        price: number
      }

      items: FiscalizationItem[]
    }
  }>

  createTransaction: (data: {
    id: string
    time: number
    amount: number
    account: Account
  }) => Promise<{
    create_time: number
    transaction: string
    state: TransactionState
    receivers?: TransactionReceiver[] | null
  }>

  performTransaction: (data: { id: string }) => Promise<{
    transaction: string
    perform_time: number
    state: TransactionState
  }>

  cancelTransaction: (data: { id: string; reason: Reason }) => Promise<{
    transaction: string
    cancel_time: number
    state: TransactionState
  }>

  checkTransaction: (data: { id: string }) => Promise<{
    reason: number | null
    transaction: string
    create_time: number
    cancel_time: number
    perform_time: number
    state: TransactionState
  }>

  getStatement: (data: { from: number; to: number }) => Promise<{
    transactions: Transaction<Account>[]
  }>
}
