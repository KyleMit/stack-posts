import {
  AnswerApi,
  Params as StackParams,
  PARAM_FILTER,
  PARAM_ORDER,
  PARAM_SITE,
  PARAM_SORT,
  QuestionApi,
  ResponseBase,
} from "./models"
import { fetchJson, IEntry } from "./utils"
import { URLSearchParams } from "url"

export const getQuestionsByUser = async (userId: Number): Promise<QuestionApi[]> => {
  const questBase = `https://api.stackexchange.com/2.2/users/${userId}/questions`

  const questions = await fetchAllData<QuestionApi>(questBase)

  return questions
}

export const getAnswersByUser = async (userId: Number): Promise<AnswerApi[]> => {
  const ansUrl = `https://api.stackexchange.com/2.2/users/${userId}/answers`

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

// type IFetchData<T> = (url: string, params: StackParams) => Promise<T[]>

const fetchAllData = async <T>(url: string, params: StackParams = defaultOptions): Promise<T[]> => {
  // declare placeholders
  let resp: ResponseBase<T>
  const questions: T[] = []

  // make calls in a loop
  do {
    const queryString = UrlStackParams(params)
    const queryUrl = `${url}?${queryString}`

    // query data
    resp = await fetchJson<ResponseBase<T>>(queryUrl)

    // append to questions
    questions.push(...resp.items)

    // increment page counter as number
    params.page += 1
  } while (resp.has_more)

  return questions
}

const UrlStackParams = (params: StackParams): string => {
  const entries = Object.entries(params).map<IEntry>(([key, val]) => [key, val.toString()])

  const url = new URLSearchParams(entries)

  return url.toString()
}
