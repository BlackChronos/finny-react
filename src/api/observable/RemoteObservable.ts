import {observable} from "mobx";

export default class RemoteObservable<F, T> {
    private readonly fetch: (filter: F, update: (data: T) => void) => void
    @observable private observables: Map<F, Promise<T>> = new Map<F, Promise<T>>()

    constructor(fetch: (filter: F, update: (data: T) => void) => void) {
        this.fetch = fetch
    }

    private _fetch(filter: F) {
        const promise = new Promise<T>(resolve => {
            this.fetch(filter, data => {
                this.observables.set(filter, Promise.resolve(data))
                resolve(data)
            })
        })
        this.observables.set(filter, promise)
        return promise;
    }

    public get(filter: F) {
        return this.observables.get(filter) || this._fetch(filter);
    }
}