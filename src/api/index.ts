import Connection from "./connection/Connection.ts";

export const IS_DEV = true
export const WS_URL = (window.location.protocol === 'http:' ? 'ws' : 'wss') + '://' + window.location.hostname + (IS_DEV ? ':7000/' : '/ws')
export const WS = new Connection(WS_URL)
