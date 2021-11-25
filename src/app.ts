import config from "./config.json"
import { createDirectories, isNumber, uniq } from "./utils"
import { IAnswer, IPostBase, IQuestion } from "./models"
import { getAnswersById, getAnswersByUser, getQuestionsById, getQuestionsByUser, getUsersById } from "./apis/stack"
import { fetchDataCached, writeFilesCached } from "./utils/cache"
import { writePosts } from "./services/posts"


export const main = async() => {
  // create output directories
  await createDirectories(Object.values(config.paths))

  const questions = await fetchDataCached(() => getQuestionsByUser(config.userId), config.paths.questionCacheData)
  const answers = await fetchDataCached(() => getAnswersByUser(config.userId), config.paths.answerCacheData)

  const questionAltIds = answers.map(a => a.question_id)
  const answerAltIds = questions.map(q => q.accepted_answer_id).filter(isNumber)

  const questionAlts = await fetchDataCached(() => getQuestionsById(questionAltIds), config.paths.questionAltCacheData)
  const answerAlts = await fetchDataCached(() => getAnswersById(answerAltIds), config.paths.answerAltCacheData)

  const userIds = getUsersIds([...questions, ...answers, ...questionAlts, ...answerAlts])
  const users = await fetchDataCached(() => getUsersById(userIds), config.paths.userCacheData)

  // await writeFilesCached(writeQuestionPosts, questions, config.paths.questionPostFolder)
  // await writeFilesCached(writeAnswerPosts, answers, config.paths.answerPostFolder)
}

const getUsersIds = (posts: IPostBase[]): number[] => uniq(posts.map(p => p.owner.user_id).filter(isNumber))

const writeQuestionPosts = async (questions: IQuestion[]): Promise<void> =>
  writePosts(questions, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)

const writeAnswerPosts = async (answers: IAnswer[]): Promise<void> =>
  writePosts(answers, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)
