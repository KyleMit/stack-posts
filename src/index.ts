import config from "./config.json"
import { objToFrontmatter, createDirectories } from "./utils"
import { IAnswer, IPostBase, IQuestion } from "./models"
import { getAnswersByUser, getQuestionsByUser } from "./apis/stack"
import { fetchDataCached, writeFilesCached } from "./utils/cache"
import { writePosts } from "./services/posts"

main()

async function main() {
  // create output directories
  await createDirectories(Object.values(config.paths))

  const questions = await fetchDataCached(getQuestions, config.paths.questionCacheData)
  const answers = await fetchDataCached(getAnswers, config.paths.answerCacheData)

  const answerQuestionIds = answers.map(q => q.question_id)

  await writeFilesCached(writeQuestionPosts, questions, config.paths.questionPostFolder)
  await writeFilesCached(writeAnswerPosts, answers, config.paths.answerPostFolder)
}

const getAnswers = async (): Promise<IAnswer[]> => getAnswersByUser(config.userId)
const getQuestions = async (): Promise<IQuestion[]> => getQuestionsByUser(config.userId)

const writeQuestionPosts = async (questions: IQuestion[]): Promise<void> =>
  writePosts(questions, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)

const writeAnswerPosts = async (answers: IAnswer[]): Promise<void> =>
  writePosts(answers, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)
