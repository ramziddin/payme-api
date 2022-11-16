export type RpcErrorName =
  | "transportError"
  | "accessDenied"
  | "parsingError"
  | "invalidRequest"
  | "methodNotFound"

export interface RpcError {
  code: number
  message: {
    en: string
    uz: string
    ru: string
  }
}

type RpcErrors = Record<RpcErrorName, RpcError>

export const isRpcError = (error: unknown): error is RpcError =>
  typeof error === "object" &&
  typeof (error as RpcError).code === "number" &&
  typeof (error as RpcError).message.en === "string" &&
  typeof (error as RpcError).message.uz === "string" &&
  typeof (error as RpcError).message.ru === "string"

export const rpcErrors: RpcErrors = {
  transportError: {
    code: -32300,
    message: {
      en: "Transport error",
      ru: "Транспортная ошибка",
      uz: "Transport xatosi",
    },
  },

  accessDenied: {
    code: -32504,
    message: {
      en: "Access denied",
      ru: "Доступ запрещен",
      uz: "Ruxsat berilmadi",
    },
  },

  parsingError: {
    code: -32700,
    message: {
      en: "Parsing error",
      ru: "Ошибка синтаксического анализа",
      uz: "Tahlil xatosi",
    },
  },

  invalidRequest: {
    code: -32600,
    message: {
      en: "Invalid request",
      ru: "Неверный запрос",
      uz: "So‘rov noto‘g‘ri",
    },
  },

  methodNotFound: {
    code: -32601,
    message: {
      en: "Method not found",
      ru: "Метод не найден",
      uz: "Usul topilmadi",
    },
  },
}
