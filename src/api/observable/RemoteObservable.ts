import {observable} from "mobx";

export default class RemoteObservable<F, T> {
    private readonly fetch: (filter: F, update: (data: T) => void) => void
    private observables: Map<F, Promise<T>> = observable.map(new Map<F, Promise<T>>())

    constructor(fetch: (filter: F, update: (data: T) => void) => void) {
        this.fetch = fetch
    }

    private _fetch(filter: F, onNext?: (data: T) => void) {
        const promise = new Promise<T>(resolve => {
            this.fetch(filter, data => {
                const result = Promise.resolve(data);
                this.observables.set(filter, result)
                if (onNext) onNext(data)
                resolve(result)
            })
        })
        this.observables.set(filter, promise)
        return promise;
    }

    public get(filter: F, onNext?: (data: T) => void) {
        return this.observables.get(filter) || this._fetch(filter, onNext);
    }
}