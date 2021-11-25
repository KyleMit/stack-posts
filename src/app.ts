import config from "./config.json"
import { createDirectories, isNumber } from "./utils"
import { IAnswer, IQuestion } from "./models"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser } from "./apis/stack"
import { fetchDataCached, writeFilesCached } from "./utils/cache"
import { writePosts } from "./services/posts"


export const main = async() => {
  // create output directories
  await createDirectories(Object.values(config.paths))

  const questions = await fetchDataCached(() => getQuestionsByUser(config.userId), config.paths.questionCacheData)
  const answers = await fetchDataCached(() => getAnswersByUser(config.userId), config.paths.answerCacheData)

  const answerAltIds = answers.map(a => a.question_id)
  const questionAltIds = questions.map(q => q.accepted_answer_id).filter(isNumber)

  const answerCompliments = await fetchDataCached(() => getQuestionsById(answerAltIds), config.paths.questionAltCacheData)
  const questionCompliments = await fetchDataCached(() => getAnswersById(questionAltIds), config.paths.answerAltCacheData)

  // await writeFilesCached(writeQuestionPosts, questions, config.paths.questionPostFolder)
  // await writeFilesCached(writeAnswerPosts, answers, config.paths.answerPostFolder)
}


const writeQuestionPosts = async (questions: IQuestion[]): Promise<void> =>
  writePosts(questions, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)

const writeAnswerPosts = async (answers: IAnswer[]): Promise<void> =>
  writePosts(answers, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)
