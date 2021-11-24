import {
  AnswerApi,
  Params as StackParams,
  PARAM_FILTER,
  PARAM_ORDER,
  PARAM_SITE,
  PARAM_SORT,
  QuestionApi,
  ResponseBase,
} from "../models"
import { chunkArray, fetchJson, IEntry } from "../utils"
import { URLSearchParams } from "url"


/**
 * Get Questions By ID
 * https://api.stackexchange.com/docs/questions-by-ids
 */
export const getQuestionsById = async (userIds: number[]): Promise<QuestionApi[]> => {
  const questBase = `https://api.stackexchange.com/2.3/questions`

  const questions = await fetchAllDataChunked<QuestionApi>(questBase, userIds)

  return questions
}

/**
 * Questions by User
 * https://api.stackexchange.com/docs/questions-on-users
 */
export const getQuestionsByUser = async (userId: number): Promise<QuestionApi[]> => {
  const questBase = `https://api.stackexchange.com/2.3/users/${userId}/questions`

  const questions = await fetchAllData<QuestionApi>(questBase)

  return questions
}

/**
 * Answers by User
 * https://api.stackexchange.com/docs/answers-on-users
 */
export const getAnswersByUser = async (userId: number): Promise<AnswerApi[]> => {
  const ansUrl = `https://api.stackexchange.com/2.3/users/${userId}/answers`

  const answers = await fetchAllData<AnswerApi>(ansUrl)

  return answers
}

const defaultOptions: StackParams = {
  page: 1,
  pagesize: 100,
  order: PARAM_ORDER.desc,
  sort: PARAM_SORT.activity,
  site: PARAM_SITE.stackoverflow,
  filter: PARAM_FILTER.shallow,
}

const fetchAllData = async <T>(url: string, params: StackParams = defaultOptions): Promise<T[]> => {
  // declare placeholders
  let resp: ResponseBase<T>
  const items: T[] = []

  // make calls in a loop
  do {
    const queryString = UrlStackParams(params)
    const queryUrl = `${url}?${queryString}`

    // query data
    resp = await fetchJson<ResponseBase<T>>(queryUrl)

    // append to questions
    items.push(...resp.items)

    // increment page counter as number
    params.page += 1
  } while (resp.has_more)

  return items
}

const fetchAllDataChunked = async <T>(url: string, ids: number[], params: StackParams = defaultOptions): Promise<T[]> => {
  const idChunks = chunkArray(ids, 99)

  // make calls in a loop
  const requests = idChunks.map(async (ids: number[]) => {
    const queryString = UrlStackParams(params)
    const queryUrl = `${url}${ids.join(';')}}?${queryString}`

    // query data
    const resp = await fetchJson<ResponseBase<T>>(queryUrl)

    return resp.items
  })

  const responses = await Promise.all(requests)
  const items = responses.flat()
  return items
}

const UrlStackParams = (params: StackParams): string => {
  const entries = Object.entries(params).map<IEntry>(([key, val]) => [key, val.toString()])

  const url = new URLSearchParams(entries)

  return url.toString()
}
