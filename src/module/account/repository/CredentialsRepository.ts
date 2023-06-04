import {action, makeObservable, observable} from "mobx";
import {makeSynchronize} from "../../../api/utils/MakeSynchronize.ts";
import {WS} from "../../../api";

class CredentialsRepository {
    @observable private token: string | undefined

    constructor() {
        makeObservable(this)
        makeSynchronize(this, 'credentialsStore', localStorage)
        if(this.token) this.setToken(this.token)
    }

    @action setToken(token: string) {
        this.token = token
        WS.setBearerAuthentication(token)
    }

    @action clearToken() {
        this.token = undefined
        WS.removeAuthentication()
    }

    getToken() {
        return this.token
    }
}

export default new CredentialsRepository();