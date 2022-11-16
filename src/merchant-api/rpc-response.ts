import { RpcError } from "./rpc-errors"

export interface RpcResponse {
  jsonrpc: "2.0"
  id: number | null
  result?: any
  error?: RpcError
}
