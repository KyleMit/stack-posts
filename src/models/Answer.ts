import { CreateMethod, Modify } from "../utils";

export interface AnswerApi {
    question_id: number
    answer_id: number
    score: number
    is_accepted: boolean
    creation_date: number
    last_activity_date: number
    body_markdown: string
}

export interface Answer extends Modify<AnswerApi, {
    creation_date: string
    last_activity_date: string
}> {}

export interface AnswerMeta extends Omit<Answer, 'body_markdown'> {}

const create: CreateMethod<Answer> = (args) => ({
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
