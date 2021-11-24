import { Modify } from "../utils";

export interface ResponseBase<T> {
  has_more: boolean
  quota_max: number
  quota_remaining: number
  page: number
  page_size: number
  total: number
  items: T[]
}

export interface PostBaseApi {
  score: number
  body_markdown: string
  creation_date: number
  last_activity_date: number
}

export interface PostBase extends Modify<PostBaseApi, {
  creation_date: string
  last_activity_date: string
}> {}
