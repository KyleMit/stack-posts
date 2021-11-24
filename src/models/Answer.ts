import { IPostBase, IPostBaseApi } from ".";
import { CreateMethod, epochToISO, Modify } from "../utils";

export interface IAnswerApi extends IPostBaseApi {
    question_id: number
    answer_id: number
    is_accepted: boolean
}

export interface IAnswer extends Modify<IAnswerApi, {
    creation_date: string
    last_activity_date: string
}> {}

export interface IAnswerMeta extends Omit<IAnswer, 'body_markdown'> {}

export const transformApiAnswers = (questions: IAnswerApi[]): IAnswer[] => questions.map((a) => Answer.create({
    ...a,
    creation_date: epochToISO(a.creation_date),
    last_activity_date: epochToISO(a.last_activity_date)
  }))


const create: CreateMethod<IAnswer> = (args) => ({
    question_id: args?.question_id ?? 0,
    answer_id: args?.answer_id ?? 0,
    score: args?.score ?? 0,
    is_accepted: args?.is_accepted ?? false,
    creation_date: args?.creation_date ?? '',
    last_activity_date: args?.last_activity_date ?? '',
    body_markdown:  args?.body_markdown ?? ''
})

export const Answer = {
    create
}
