import {RequestResponse} from "../../../api/connection/Connection.ts";
import {Token} from "../model/Token.ts";

export default class SignUpController extends RequestResponse<{
    username: string,
    password: string
}, Token> {
    protected route = "signUp"
}