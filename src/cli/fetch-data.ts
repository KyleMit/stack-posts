import config from "../config.json"
import { createDirectories, isNumber, uniq, fetchDataCached } from "../utils"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser, getUsersById } from "../apis/stack"
import { IFetchedData } from "../models"


export const fetchData = async(): Promise<IFetchedData> => {
  await createDirectories(Object.values(config.paths))

  const questions = await fetchDataCached(() => getQuestionsByUser(config.userId), config.paths.questionCacheData)
  const answers = await fetchDataCached(() => getAnswersByUser(config.userId), config.paths.answerCacheData)

  const questionAltIds = answers.map(a => a.question_id)
  const answerAltIds = questions.map(q => q.accepted_answer_id).filter(isNumber)

  const questionAlts = await fetchDataCached(() => getQuestionsById(questionAltIds), config.paths.questionAltCacheData)
  const answerAlts = await fetchDataCached(() => getAnswersById(answerAltIds), config.paths.answerAltCacheData)

  const allPosts = [...questions, ...answers, ...questionAlts, ...answerAlts]
  const userIds = uniq(allPosts.map(p => p.owner.user_id).filter(isNumber))

  const users = await fetchDataCached(() => getUsersById(userIds), config.paths.userCacheData)

  return {
    questions,
    answers,
    questionAlts,
    answerAlts,
    users
  }
}
