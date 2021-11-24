import { promises as fsp } from "fs"
import yaml from "js-yaml"
import config from "./config.json"
import { epochToISO, checkFileExists } from "./utils"
import { Answer, AnswerApi, Question, QuestionApi } from "./models"
import { getAnswersByUser, getQuestionsByUser } from "./stack"

main()

async function main() {
  // create output directories
  await fsp.mkdir("./_site/data", { recursive: true })
  await fsp.mkdir("./_site/posts/questions", { recursive: true })
  await fsp.mkdir("./_site/posts/answers", { recursive: true })

  const questions = await getQuestions()
  await writeQuestionPosts(questions)

  const answers = await getAnswers()
  await writeAnswerPosts(answers)
}

const getAnswers = async (): Promise<Answer[]> => {
  let answers: Answer[]

  // TODO cache bust param?
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

  // TODO cache bust param?
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

const writeQuestionPosts = async (questions: Question[]): Promise<void> => {
  const cachedPosts = await fsp.readdir(config.paths.questionPostFolder)
  const simpleUpToDate = cachedPosts.length === questions.length

  if (simpleUpToDate) return

  // write file param
  await Promise.all(
    questions.map(async function (question) {
      const path = `${config.paths.questionPostFolder}/${question.question_id}.md`

      const { question_id, title, score, tags, creation_date } = question
      const meta = { question_id, title, score, creation_date, tags }
      const frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      const post = `---\n${frontmatter}---\n\n${question.body_markdown}`

      fsp.writeFile(path, post, "utf-8")
    })
  )
}

const writeAnswerPosts = async (answers: Answer[]): Promise<void> => {
  const cachedPosts = await fsp.readdir(config.paths.answerPostFolder)
  const simpleUpToDate = cachedPosts.length === answers.length

  if (simpleUpToDate) return

  // write file param
  await Promise.all(
    answers.map(async function (answer) {
      const path = `${config.paths.answerPostFolder}/${answer.answer_id}.md`

      const { question_id, score, creation_date } = answer
      const meta = { question_id, score, creation_date }
      const frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      const post = `---\n${frontmatter}---\n\n${answer.body_markdown}`

      fsp.writeFile(path, post, "utf-8")
    })
  )
}
