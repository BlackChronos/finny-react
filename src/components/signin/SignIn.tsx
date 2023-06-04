import {FormEvent, PureComponent} from "react";
import "./SignIn.scss"
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {WS} from "../../api";
import credentialsRepository from "../../module/account/repository/CredentialsRepository.ts";
import SignInController from "../../module/account/controller/SignInController.ts";

@observer
export default class SignIn extends PureComponent<unknown> {
    @observable private email?: string
    @observable private password?: string

    constructor(properties: unknown) {
        super(properties);
        this.clearForm()
        makeObservable(this)
    }

    private clearForm() {
        this.email = ''
        this.password = ''
    }

    private signIn(event: FormEvent) {
        event.preventDefault()
        WS.process(SignInController, {
            username: this.email as string,
            password: this.password as string
        }).then(({token}) => {
            credentialsRepository.setToken(token)
        })
        this.clearForm()
    }

    render() {
        return (
            <form className={"signIn"} onSubmit={this.signIn.bind(this)}>
                <input type="email" placeholder={"email"}
                       value={this.email}
                       onChange={({target}) => this.email = target.value}/>
                <input type="password"
                       placeholder={"password"}
                       value={this.password}
                       onChange={({target}) => this.password = target.value}/>
                <input type="submit" value={"Sign In"}/>
            </form>
        );
    }

}