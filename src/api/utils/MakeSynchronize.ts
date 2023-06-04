import {autorun, set, toJS} from "mobx";
import {RC4} from "./RC4.ts";

export function makeSynchronize(_this: any, name: string, storage: Storage) {
    const encoded = RC4.encode(name, name)
    const storedJson = storage.getItem(encoded)
    if (storedJson) {
        set(_this, JSON.parse(RC4.decode(storedJson, name)))
    }
    autorun(() => {
        const value = toJS(_this)
        storage.setItem(encoded, RC4.encode(JSON.stringify(value), name))
    })
}