import { RpcResponse } from "./rpc-response"

function createRpcResponse(
  id: number,
  result: object
): Required<Omit<RpcResponse, "error">> {
  return {
    id,
    result,
    jsonrpc: "2.0",
  }
}

export default createRpcResponse
