
interface ObjectConstructor {
    fromEntries<TKey extends PropertyKey, TVal>(e: [TKey, TVal][]): Record<TKey,TVal>;
    entries<TKey extends PropertyKey, TVal>(o: Record<TKey,TVal>): [TKey, TVal][];
    keys<TKey extends PropertyKey>(obj: Record<TKey,any>): TKey[];
    map<TOut>(arr: any[]): TOut[];
}
