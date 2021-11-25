import config from "./config.json"
import { createDirectories, isNumber, uniq } from "./utils"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser, getUsersById } from "./apis/stack"
import { fetchDataCached, writePostsCached } from "./utils/cache"


export const main = async() => {
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

  // write posts
  await writePostsCached(questions, config.paths.questionPostFolder, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)
  await writePostsCached(answers, config.paths.answerPostFolder, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)

  await writePostsCached(questionAlts, config.paths.questionAltPostFolder, (p) => `${config.paths.questionAltPostFolder}${p.question_id}.md`)
  await writePostsCached(answerAlts, config.paths.answerAltPostFolder, (p) => `${config.paths.answerAltPostFolder}${p.answer_id}.md`)
}
