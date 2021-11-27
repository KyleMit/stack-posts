import { objMapValues, fetchDataCached } from '../utils'
import { IAnswer, IQuestion } from '../models'
import config from '../config'
import { fetchData } from '.'


export interface IPost {
    id: string,
    q: IQuestion,
    a?: IAnswer
}

export const getPostsCached = async ():  Promise<Record<string, IPost>> => {
    const posts = await fetchDataCached(() => getPosts(), config.cache.postData)
    return posts
}

export const getPosts = async (): Promise<Record<string, IPost>> => {
   const { questions, questionAlts, answers, answerAlts, users } = await fetchData()

    const allQuestions = [...questions, ...questionAlts]
    const allAnswers = [...answers, ...answerAlts]

    const questionsHash = Object.fromEntries(allQuestions.map(q => [String(q.question_id), q]))
    const answersHash = Object.fromEntries(allAnswers.map(a => [String(a.question_id), a]))

    const postsHash = objMapValues(questionsHash, (q) => ({
        id: String(q.question_id),
        q: q,
        a: answersHash[q.question_id]
    }))

    return postsHash
}
