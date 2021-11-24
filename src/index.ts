import { promises as fsp } from "fs"
import config from "./config.json"
import { epochToISO, checkFileExists, objToFrontmatter, createDirectories } from "./utils"
import { Answer, AnswerApi, Question, QuestionApi } from "./models"
import { getAnswersByUser, getQuestionsByUser } from "./apis/stack"

main()

async function main() {
  // create output directories
  await createDirectories(Object.values(config.paths))

  const questions = await getQuestions()
  const answers = await getAnswers()

  await writeQuestionPostsCache(questions)
  await writeAnswerPostsCache(answers)
}

const getAnswers = async (): Promise<Answer[]> => {
  let answers: Answer[]

  const answersExist = await checkFileExists(config.paths.answerCacheData)

  if (!answersExist) {
    const answersApi = await getAnswersByUser(config.userId)
    answers = transformAnswers(answersApi)
    await setCacheData(answers, config.paths.answerCacheData)
  } else {
    answers = await getCacheData<Answer[]>(config.paths.answerCacheData)
  }

  return answers
}

const getQuestions = async (): Promise<Question[]> => {
  let questions: Question[]

  const questionsExist = await checkFileExists(config.paths.questionCacheData)

  if (!questionsExist) {
    const questionsApi = await getQuestionsByUser(config.userId)
    questions = transformQuestions(questionsApi)
    await setCacheData(questions, config.paths.questionCacheData)
  } else {
    questions = await getCacheData<Question[]>(config.paths.questionCacheData)
  }

  return questions
}

const transformQuestions = (questions: QuestionApi[]): Question[] => questions.map((q) => Question.create({
    ...q,
    creation_date: epochToISO(q.creation_date),
    last_activity_date: epochToISO(q.last_activity_date)
}))

const transformAnswers = (questions: AnswerApi[]): Answer[] => questions.map((a) => Answer.create({
  ...a,
  creation_date: epochToISO(a.creation_date),
  last_activity_date: epochToISO(a.last_activity_date)
}))

const setCacheData = async (data: any, path: string): Promise<void> => {
  const output = JSON.stringify(data, null, 2)
  await fsp.writeFile(path, output, "utf-8")
}
const getCacheData = async <T>(path: string): Promise<T> => {
  const text = await fsp.readFile(path, "utf-8")
  const obj = JSON.parse(text) as T
  return obj
}

const writeQuestionPostsCache = async (questions: Question[]): Promise<void> => {
  const cachedPosts = await fsp.readdir(config.paths.questionPostFolder)
  const simpleUpToDate = cachedPosts.length === questions.length

  if (simpleUpToDate) return

  await writeQuestionPosts(questions)
}

const writeAnswerPostsCache = async (answers: Answer[]): Promise<void> => {
  const cachedPosts = await fsp.readdir(config.paths.answerPostFolder)
  const simpleUpToDate = cachedPosts.length === answers.length

  if (simpleUpToDate) return

  await writeAnswerPosts(answers)
}

const writeQuestionPosts = async (questions: Question[]): Promise<void> => {
  const writeFiles = questions.map(async function (question) {
    const path = `${config.paths.questionPostFolder}/${question.question_id}.md`

    const { body_markdown, ...meta } = question
    const frontmatter = objToFrontmatter(meta)
    const post = `${frontmatter}\n${body_markdown}`

    fsp.writeFile(path, post, "utf-8")
  });

  await Promise.all(writeFiles);
}

const writeAnswerPosts = async (answers: Answer[]): Promise<void> => {
  const writeFiles = answers.map(async function (answer) {
    const path = `${config.paths.answerPostFolder}/${answer.answer_id}.md`

    const { body_markdown, ...meta } = answer
    const frontmatter = objToFrontmatter(meta);
    const post = `${frontmatter}\n${body_markdown}`

    fsp.writeFile(path, post, "utf-8")
  })

  await Promise.all(writeFiles);
}
