import { Modify } from "../utils";

export interface IResponseBase<T> {
  has_more: boolean
  quota_max: number
  quota_remaining: number
  page: number
  page_size: number
  total: number
  items: T[]
}

export interface IPostBaseApi {
  score: number
  body_markdown: string
  creation_date: number
  last_activity_date: number
}

export interface IPostBase extends Modify<IPostBaseApi, {
  creation_date: string
  last_activity_date: string
}> {}
