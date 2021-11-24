export type IEntry = [string, string]

export type Modify<T, R> = Omit<T, keyof R> & R;

export type CreateMethod<T> = (args: Partial<T>) => T
