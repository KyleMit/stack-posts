export type IEntry = [string, string]

export type Modify<T, R> = Omit<T, keyof R> & R;

export type CreateMethod<T> = (args?: Partial<T>) => T

export const isNumber = (x: any): x is number => typeof x === 'number'
