export default <R extends object>(json: R): R => {
    const result: R | any = {}
    for (const array of Object.entries(json)) {
        const key = array[0]
        const value = array[1]
        const entry = {
            [key]: value === 'null' || value === '' ? null : value
        }
        Object.assign(result, entry)
    }
    return result
}