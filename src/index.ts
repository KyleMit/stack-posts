import { promises as fsp } from "fs"
import config from "./config.json"
import { epochToISO, checkFileExists, objToFrontmatter, createDirectories, getJsonData, writeJsonData, cacheFolderUpToDate } from "./utils"
import { Answer, AnswerApi, Question, QuestionApi, transformApiAnswers, transformApiQuestions } from "./models"
import { getAnswersByUser, getQuestionsByUser } from "./apis/stack"

main()

async function main() {
  // create output directories
  await createDirectories(Object.values(config.paths))

  const questions = await fetchDataWithCache(getQuestions, config.paths.questionCacheData)
  const answers = await fetchDataWithCache(getAnswers, config.paths.answerCacheData)

  const answerQuestionIds = answers.map(q => q.question_id)

  await writeQuestionPostsCache(questions)
  await writeAnswerPostsCache(answers)
}

const fetchDataWithCache = async <T>(fetchFunc: () => Promise<T>, cachePath: string, bustCache = false): Promise<T> => {
  const cacheExists = await checkFileExists(cachePath)

  if (cacheExists && !bustCache) {
    const data = await getJsonData<T>(cachePath)
    return data;
  } else {
    const data = await fetchFunc()
    await writeJsonData(data, cachePath)
    return data;
  }
}


const getAnswers = async (): Promise<Answer[]> => {
  const answersApi = await getAnswersByUser(config.userId)
  const answers = transformApiAnswers(answersApi)
  return answers
}

const getQuestions = async (): Promise<Question[]> => {
  const questionsApi = await getQuestionsByUser(config.userId)
  const questions = transformApiQuestions(questionsApi)
  return questions
}

const writeQuestionPostsCache = async (questions: Question[]): Promise<void> => {
  if (await cacheFolderUpToDate(questions, config.paths.questionPostFolder)) return
  await writeQuestionPosts(questions)
}

const writeAnswerPostsCache = async (answers: Answer[]): Promise<void> => {
  if (await cacheFolderUpToDate(answers, config.paths.answerPostFolder)) return
  await writeAnswerPosts(answers)
}

const writeQuestionPosts = async (questions: Question[]): Promise<void> => {
  const writeFiles = questions.map(async function (question) {
    const path = `${config.paths.questionPostFolder}${question.question_id}.md`

    const { body_markdown, ...meta } = question
    const frontmatter = objToFrontmatter(meta)
    const post = `${frontmatter}\n${body_markdown}`

    fsp.writeFile(path, post, "utf-8")
  });

  await Promise.all(writeFiles);
}

const writeAnswerPosts = async (answers: Answer[]): Promise<void> => {
  const writeFiles = answers.map(async function (answer) {
    const path = `${config.paths.answerPostFolder}${answer.answer_id}.md`

    const { body_markdown, ...meta } = answer
    const frontmatter = objToFrontmatter(meta);
    const post = `${frontmatter}\n${body_markdown}`

    fsp.writeFile(path, post, "utf-8")
  })

  await Promise.all(writeFiles);
}
