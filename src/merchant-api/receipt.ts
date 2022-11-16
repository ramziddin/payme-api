export enum ReceiptState {
  ReceiptCreated = 0,
  TransactionCreation = 1,
  Withdrawal = 2,
  TransactionClosing = 3,
  ReceiptPaid = 4,
  ReceiptInHold = 5,
  HoldInProcess = 6,
  ReceiptPaused = 20,
  ReceiptWillBeCanceled = 21,
  ReceiptWillBeClosedInBilling = 30,
  ReceiptCanceled = 50,
}

export type Receipt = {
  _id: string
  state: ReceiptState
}
