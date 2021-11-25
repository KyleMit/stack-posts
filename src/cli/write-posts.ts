import config from "../config.json"
import { createDirectories, getJsonData } from "../utils"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser } from "../apis/stack"
import { fetchDataCached, writePostsCached } from "../utils/cache"
import { IAnswer, IQuestion } from "../models"


export const writePosts = async() => {
  await createDirectories(Object.values(config.paths))

  const questions = await getJsonData<IQuestion[]>(config.paths.questionCacheData)
  const answers = await getJsonData<IAnswer[]>(config.paths.answerCacheData)
  const questionAlts = await getJsonData<IQuestion[]>(config.paths.questionAltCacheData)
  const answerAlts = await getJsonData<IAnswer[]>(config.paths.answerAltCacheData)

  // write posts
  await writePostsCached(questions, config.paths.questionPostFolder, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)
  await writePostsCached(answers, config.paths.answerPostFolder, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)

  await writePostsCached(questionAlts, config.paths.questionAltPostFolder, (p) => `${config.paths.questionAltPostFolder}${p.question_id}.md`)
  await writePostsCached(answerAlts, config.paths.answerAltPostFolder, (p) => `${config.paths.answerAltPostFolder}${p.answer_id}.md`)
}
