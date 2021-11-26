export const objMapValues = <TKey extends PropertyKey, TOld, TNew>(
    obj: Record<TKey,TOld>,
    fn: (v: TOld) => TNew
) : Record<TKey, TNew> => {
    const oldEntries = Object.entries<TKey, TOld>(obj)
    const newEntries = oldEntries.map<[TKey, TNew]>(([key, val]) => [key, fn(val)])
    const newObj = Object.fromEntries<TKey, TNew>(newEntries)
    return newObj
}

export const objMapValuesAsync = async <TKey extends PropertyKey, TOld, TNew>(
    obj: Record<TKey,TOld>,
    fn: (v: TOld) => Promise<TNew>
) : Promise<Record<TKey, TNew>> => {
    const oldEntries = Object.entries<TKey, TOld>(obj)
    const newEntriesPromises = oldEntries.map<Promise<[TKey, TNew]>>(async ([key, val]) => [key, await fn(val)])
    const newEntries = await Promise.all(newEntriesPromises)
    const newObj = Object.fromEntries<TKey, TNew>(newEntries)
    return newObj
}
