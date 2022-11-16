import { encode } from "js-base64"

export default function createPaymeCheckoutLink<
  Account extends { [key: string]: string }
>({
  merchantId,
  amount,
  account,
  language,
  countdown,
  returnUrl,
}: {
  merchantId: string
  amount: number
  account: Account
  language: "uz" | "en" | "ru"
  countdown: number
  returnUrl: string
}) {
  const accountWithPrefixedKeys = Object.entries(account).map(
    ([key, value]) => [`ac.${key}`, value]
  )

  const prefixedAccountObject = Object.fromEntries(accountWithPrefixedKeys)

  const paramsEntries = Object.entries({
    m: merchantId,
    ...prefixedAccountObject,
    a: amount,
    l: language,
    c: returnUrl,
    ct: countdown,
  })

  const paramsString = paramsEntries
    .map(([key, value]) => `${key}=${value}`)
    .join(";")

  const base64Result = encode(paramsString)

  return `https://checkout.paycom.uz/${base64Result}`
}
