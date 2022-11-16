import { Reason } from "./reason"
import { TransactionState } from "./transaction-state"

export interface Transaction<Account> {
  id: string
  time: Date | string
  amount: number
  account: Account
  create_time?: Date | string | null
  perform_time?: Date | string | null
  cancel_time?: Date | string | null
  transaction: string
  state: TransactionState
  reason?: Reason | null
}
