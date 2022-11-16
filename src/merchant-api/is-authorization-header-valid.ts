import { decode } from "js-base64"

export default function isAuthorizationHeaderValid(
  header: string,
  login: string,
  password: string
) {
  const [basic, credentials] = header.trim().split(" ")

  if (basic !== "Basic" || !credentials) return false

  const [extractedLogin, extractedPassword] = decode(credentials)
    .toString()
    .trim()
    .split(":")

  return extractedLogin === login && extractedPassword === password
}
