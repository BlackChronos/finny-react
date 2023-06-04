import {FormEvent, PureComponent} from "react";
import "./ChangePassword.scss"
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {WS} from "../../api";
import credentialsRepository from "../../module/account/repository/CredentialsRepository.ts";
import ChangePasswordController from "../../module/account/controller/ChangePasswordController.ts";

@observer
export default class ChangePassword extends PureComponent<unknown> {
    @observable private currentPassword?: string
    @observable private newPassword?: string

    constructor(properties: unknown) {
        super(properties);
        this.clearForm()
        makeObservable(this)
    }

    private clearForm() {
        this.currentPassword = ''
        this.newPassword = ''
    }

    private changePassword(event: FormEvent) {
        event.preventDefault()
        WS.process(ChangePasswordController, {
            currentPassword: this.currentPassword as string,
            newPassword: this.newPassword as string
        }).then(({token}) => {
            credentialsRepository.setToken(token)
        })
        this.clearForm()
    }

    render() {
        return (
            <form className={"changePassword"} onSubmit={this.changePassword.bind(this)}>
                <input type="password" placeholder={"current password"}
                       value={this.currentPassword}
                       onChange={({target}) => this.currentPassword = target.value}/>
                <input type="password"
                       placeholder={"new password"}
                       value={this.newPassword}
                       onChange={({target}) => this.newPassword = target.value}/>
                <input type="submit" value={"Change Password"}/>
            </form>
        );
    }

}