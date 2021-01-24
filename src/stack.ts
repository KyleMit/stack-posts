import {
  Params as StackParams,
  PARAM_FILTER,
  PARAM_ORDER,
  PARAM_SITE,
  PARAM_SORT,
  QuestionApi,
  ResponseBase,
} from "./interfaces"
import { getData } from "./http"
import { URLSearchParams } from "url"

export async function getQuestionsByUser(
  userId: Number
): Promise<QuestionApi[]> {
  let questBase = `https://api.stackexchange.com/2.2/users/${userId}/questions`

  let questions = await fetchAllData<QuestionApi>(questBase)

  return questions
}

export async function fetchAllData<T>(
  url: string,
  params: StackParams = {
    page: 1,
    pagesize: 100,
    order: PARAM_ORDER.desc,
    sort: PARAM_SORT.activity,
    site: PARAM_SITE.stackoverflow,
    filter: PARAM_FILTER.shallow,
  }
): Promise<T[]> {
  // declare placeholders
  let resp: ResponseBase<T>
  let questions: T[] = []

  // make calls in a loop
  do {
    let queryString = UrlStackParams(params)
    let queryUrl = `${url}?${queryString}`

    // query data
    resp = await getData<ResponseBase<T>>(queryUrl)

    // append to questions
    questions.push(...resp.items)

    // increment page counter as number
    params.page += 1
  } while (resp.has_more)

  return questions
}

function UrlStackParams(params: StackParams): string {
  const keys: [string, string][] = Object.entries(params).map((entry) => {
    return [entry[0], entry[1].toString()]
  })
  console.log(keys)
  let url = new URLSearchParams(keys)

  return url.toString()
}
