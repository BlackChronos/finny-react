import {RequestResponse} from "../../../api/connection/Connection.ts";
import {Token} from "../model/Token.ts";

export default class ChangePasswordController extends RequestResponse<{
    currentPassword: string,
    newPassword: string
}, Token> {
    protected route = "changePassword"
}