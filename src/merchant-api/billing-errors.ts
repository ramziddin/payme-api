type BillingErrorName =
  | "transactionNotFound"
  | "unexpectedTransactionState"
  | "incorrectAmount"
  | "orderNotFound"
  | "orderAvailable"
  | "orderNotСanceled"

interface BillingError {
  code: number
  message: {
    en: string
    ru: string
    uz: string
  }
}

type BillingErrors = Record<BillingErrorName, BillingError>

export const billingErrors: BillingErrors = {
  transactionNotFound: {
    code: -31003,
    message: {
      en: "Transaction not found",
      ru: "Транзакция не найдена",
      uz: "Tranzaksiya topilmadi",
    },
  },

  unexpectedTransactionState: {
    code: -31008,
    message: {
      en: "The transaction status does not allow the operation to be completed",
      ru: "Статус транзакции не позволяет выполнить операцию",
      uz: "Tranzaksiya holati operatsiyani bajarishga imkon bermaydi",
    },
  },

  incorrectAmount: {
    code: -31001,
    message: {
      en: "Invalid order amount",
      ru: "Неверная сумма заказа",
      uz: "Buyurtma narxi noto‘g‘ri",
    },
  },

  orderNotFound: {
    code: -31050,
    message: {
      en: "Order not found",
      ru: "Заказ не найден",
      uz: "Buyurtma topilmadi",
    },
  },

  orderAvailable: {
    code: -31051,
    message: {
      en: "Unable to perform operation. Order pending payment or is already paid",
      ru: "Не возможно выполнить операцию. Заказ ожидает оплаты или уже оплачен",
      uz: "Operatsiyani amalga oshirib bo'lmadi. Buyurtma toʻlanishi kutilmoqda yoki allaqachon toʻlangan",
    },
  },

  orderNotСanceled: {
    code: -31007,
    message: {
      en: "The order has been completed and cannot be canceled",
      ru: "Заказ выполнен и не подлежит отмене",
      uz: "Buyurtma bajarildi va uni bekor qilib bo'lmaydi",
    },
  },
}
