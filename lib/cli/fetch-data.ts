import { config } from "../config"
import { createDirectories, isNumber, uniq, fetchDataCached } from "../utils"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser, getUsersById } from "../apis/stack"
import { IFetchedData } from "../models"


export const fetchData = async(): Promise<IFetchedData> => {
  await createDirectories(Object.values(config.cache))

  const questions = await fetchDataCached(() => getQuestionsByUser(config.userId), config.cache.questionData)
  const answers = await fetchDataCached(() => getAnswersByUser(config.userId), config.cache.answerData)

  const questionAltIds = answers.map(a => a.question_id)
  const answerAltIds = questions.map(q => q.accepted_answer_id).filter(isNumber)

  const questionAlts = await fetchDataCached(() => getQuestionsById(questionAltIds), config.cache.questionAltData)
  const answerAlts = await fetchDataCached(() => getAnswersById(answerAltIds), config.cache.answerAltData)

  const allPosts = [...questions, ...answers, ...questionAlts, ...answerAlts]
  const userIds = uniq(allPosts.map(p => p.owner.user_id).filter(isNumber))

  const users = await fetchDataCached(() => getUsersById(userIds), config.cache.userData)

  return {
    questions,
    answers,
    questionAlts,
    answerAlts,
    users
  }
}
