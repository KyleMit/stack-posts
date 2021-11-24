import {
  IAnswer,
  IAnswerApi,
  IStackParams,
  PARAM_FILTER,
  PARAM_ORDER,
  PARAM_SITE,
  PARAM_SORT,
  IQuestion,
  IQuestionApi,
  IResponseBase,
  transformApiAnswers,
  transformApiQuestions,
  StackParams,
} from "../models"
import { chunkArray, fetchJson, IEntry } from "../utils"
import { URLSearchParams } from "url"


/**
 * Get Questions By ID
 * https://api.stackexchange.com/docs/questions-by-ids
 */
export const getQuestionsById = async (userIds: number[]): Promise<IQuestionApi[]> => {
  const questBase = `https://api.stackexchange.com/2.3/questions`

  const questions = await fetchAllDataChunked<IQuestionApi>(questBase, userIds)

  return questions
}

/**
 * Questions by User
 * https://api.stackexchange.com/docs/questions-on-users
 */
export const getQuestionsByUser = async (userId: number): Promise<IQuestion[]> => {
  const questBase = `https://api.stackexchange.com/2.3/users/${userId}/questions`

  const questions = await fetchAllData<IQuestionApi>(questBase)
  return transformApiQuestions(questions)
}

/**
 * Answers by User
 * https://api.stackexchange.com/docs/answers-on-users
 */
export const getAnswersByUser = async (userId: number): Promise<IAnswer[]> => {
  const ansUrl = `https://api.stackexchange.com/2.3/users/${userId}/answers`

  const answers = await fetchAllData<IAnswerApi>(ansUrl)
  return transformApiAnswers(answers)
}




const fetchAllData = async <T>(url: string, queryParams?: Partial<IStackParams>): Promise<T[]> => {
  // declare placeholders
  let resp: IResponseBase<T>
  const params = StackParams.create(queryParams);
  const items: T[] = []

  // make calls in a loop
  do {
    const queryString = UrlStackParams(params)
    const queryUrl = `${url}?${queryString}`

    // query data
    resp = await fetchJson<IResponseBase<T>>(queryUrl)

    // append to questions
    items.push(...resp.items)

    // increment page counter as number
    params.page += 1
  } while (resp.has_more)

  return items
}

const fetchAllDataChunked = async <T>(url: string, ids: number[], params?: Partial<IStackParams>): Promise<T[]> => {
  const idChunks = chunkArray(ids, 99)

  // make calls in a loop
  const requests = idChunks.map(async (ids: number[]) => {
    const queryString = UrlStackParams(params)
    const queryUrl = `${url}${ids.join(';')}}?${queryString}`

    // query data
    const resp = await fetchJson<IResponseBase<T>>(queryUrl)

    return resp.items
  })

  const responses = await Promise.all(requests)
  const items = responses.flat()
  return items
}

const UrlStackParams = (queryParams?: Partial<IStackParams>): string => {
  const params = StackParams.create(queryParams);
  const entries = Object.entries(params).map<IEntry>(([key, val]) => [key, val.toString()])
  const url = new URLSearchParams(entries)
  return url.toString()
}
