function rc4(data: string, secret: string) {
    let i
    const s = [];
    let j = 0;
    let x;
    let res = ''
    for (i = 0; i < 256; i++) {
        s[i] = i
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + secret.charCodeAt(i % secret.length)) % 256
        x = s[i]
        s[i] = s[j]
        s[j] = x
    }
    i = 0
    j = 0
    for (let y = 0; y < data.length; y++) {
        i = (i + 1) % 256
        j = (j + s[i]) % 256
        x = s[i]
        s[i] = s[j]
        s[j] = x
        res += String.fromCharCode(data.charCodeAt(y) ^ s[(s[i] + s[j]) % 256])
    }
    return res
}

export const RC4 = {
    encode: (data: string, secret: string) => {
        return rc4(data, secret)
    },
    decode: (data: string, secret: string) => {
        return rc4(data, secret)
    }
}