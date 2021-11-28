import { objMapValues, fetchDataCached } from '../utils'
import { IAnswerEnriched, IQuestionEnriched } from '../models'
import { config } from '../config'
import { fetchData } from '.'


export interface IPost {
    id: string,
    q: IQuestionEnriched,
    a?: IAnswerEnriched
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
    const usersHash = Object.fromEntries(users.map(u => [u.user_id, u]))

    const postsHash = objMapValues(questionsHash, (q) => {
        const a = answersHash[q.question_id]
        return ({
            id: String(q.question_id),
            q: {
                ...q,
                owner: usersHash[q.owner.user_id]
            },
            a: {
                ...a,
                owner: usersHash[a?.owner?.user_id]

            }
        })
    })

    return postsHash
}
