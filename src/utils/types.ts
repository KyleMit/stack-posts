export type IEntry = [string, string]

export type Modify<T, R> = Omit<T, keyof R> & R;

export type CreateMethod<T> = (args?: Partial<T>) => T

export type Json =
  | null
  | string
  | number
  | boolean
  | Array<JSON>
  | {
    [prop: string]: Json
  }
