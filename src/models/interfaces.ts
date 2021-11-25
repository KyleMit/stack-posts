import { Modify } from "../utils";
import { IAnswer, IQuestion, IUser, IUserBase } from ".";

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
  owner: IUserBase;
}

export interface IPostBase extends Modify<IPostBaseApi, {
  creation_date: string
  last_activity_date: string
}> {}

export interface IFetchedData {
  questions: IQuestion[];
  answers: IAnswer[];
  questionAlts: IQuestion[];
  answerAlts: IAnswer[];
  users: IUser[];
}
