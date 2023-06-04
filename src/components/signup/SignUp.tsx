import {FormEvent, PureComponent} from "react";
import "./SignUp.scss"
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {WS} from "../../api";
import credentialsRepository from "../../module/account/repository/CredentialsRepository.ts";
import SignUpController from "../../module/account/controller/SignUpController.ts";

@observer
export default class SignUp extends PureComponent<unknown> {
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

    private signUp(event: FormEvent) {
        event.preventDefault()
        WS.process(SignUpController, {
            username: this.email as string,
            password: this.password as string
        }).then(({token}) => {
            credentialsRepository.setToken(token)
        })
        this.clearForm()
    }

    render() {
        return (
            <form className={"signUp"} onSubmit={this.signUp.bind(this)}>
                <input type="email" placeholder={"email"}
                       value={this.email}
                       onChange={({target}) => this.email = target.value}/>
                <input type="password"
                       placeholder={"password"}
                       value={this.password}
                       onChange={({target}) => this.password = target.value}/>
                <input type="submit" value={"Sign Up"}/>
            </form>
        );
    }

}