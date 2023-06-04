import {RequestResponse} from "../../../api/connection/Connection.ts";
import {Token} from "../model/Token.ts";

export default class SignInController extends RequestResponse<{
    username: string,
    password: string
}, Token> {
    protected route = "signIn"
}