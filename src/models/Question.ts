import { IPostBase, IPostBaseApi } from ".";
import { CreateMethod, epochToISO, Modify } from "../utils";

export interface IQuestionApi extends IPostBaseApi {
    question_id: number
    accepted_answer_id?: number
    title: string
    tags: string[]
}

export interface IQuestion extends Modify<IQuestionApi, {
    creation_date: string
    last_activity_date: string
}> {}

export interface IQuestionMeta extends Omit<IQuestion, 'body_markdown'> {}

export const transformApiQuestions = (questions: IQuestionApi[]): IQuestion[] => questions.map((q) => Question.create({
    ...q,
    creation_date: epochToISO(q.creation_date),
    last_activity_date: epochToISO(q.last_activity_date)
}))

const create: CreateMethod<IQuestion> = (args) => ({
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
