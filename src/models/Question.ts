import { CreateMethod, Modify } from "../utils";

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

export interface Question extends Modify<QuestionApi, {
    creation_date: string
    last_activity_date: string
}> {}

const create: CreateMethod<Question> = (args) => ({
    question_id: args?.question_id ?? 0,
    accepted_answer_id: args?.accepted_answer_id ?? 0,
    title: args?.title ?? '',
    score: args?.score ?? 0,
    creation_date: args?.creation_date ?? '',
    last_activity_date: args?.last_activity_date ?? '',
    tags: args?.tags ?? [],
    body_markdown:  args?.body_markdown ?? ''
})

export const Question = {
    create
}