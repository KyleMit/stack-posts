export interface ResponseBase<T> {
  has_more: boolean
  quota_max: number
  quota_remaining: number
  page: number
  page_size: number
  total: number
  items: T[]
}

export interface QuestionApi {
  question_id: number
  accepted_answer_id?: number
  title: string
  score: number
  creation_date: number
  last_activity_date: number
  tags: string[]
  body_markdown: string
}

export interface Question {
  question_id: number
  accepted_answer_id?: number
  title: string
  score: number
  creation_date: string
  last_activity_date: string
  tags: string[]
  body_markdown: string
}

export interface AnswerApi {
  question_id: number
  answer_id: number
  score: number
  is_accepted: boolean
  creation_date: number
  last_activity_date: number
  body_markdown: string
}

export interface Answer {
  question_id: number
  answer_id: number
  score: number
  is_accepted: boolean
  creation_date: string
  last_activity_date: string
  body_markdown: string
}

export interface Params {
  page: number
  pagesize: number
  order: PARAM_ORDER
  sort: PARAM_SORT
  site: PARAM_SITE
  filter: PARAM_FILTER
}

export enum PARAM_ORDER {
  asc = "asc",
  desc = "desc",
}

export enum PARAM_SORT {
  activity = "activity",
  votes = "votes",
  creation = "creation",
}

// todo - more at https://api.stackexchange.com/docs/sites#page=1&pagesize=99&filter=!8IfavuYKi8X5bq1EkTI2n&run=true
export enum PARAM_SITE {
  stackoverflow = "stackoverflow",
  serverfault = "serverfault",
  superuser = "superuser",
  meta = "meta",
  webapps = "webapps",
  webmasters = "webmasters",
  ux = "ux",
}

export enum PARAM_FILTER {
  default = "default",
  withbody = "withbody",
  total = "total",
  shallow = "*I6kVOgAG3VAp35OqFW2FpKDCdyq)WBEv)NpyrRZAt)K",
}
