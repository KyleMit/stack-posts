interface ObjectConstructor {
    entries<TKey extends string, TVal>(o: Record<TKey,TVal>): [TKey, TVal][];
    keys<TKey extends string>(obj: Record<TKey,any>): TKey[];
}
