import { promises as fsp } from "fs"
import yaml from "js-yaml"
import config from "./config.json"
import { epochToISO } from "./date"
import { checkFileExists } from "./file"
import { Answer, AnswerApi, Question, QuestionApi } from "./interfaces"
import { getAnswersByUser, getQuestionsByUser } from "./stack"

main()

async function main() {
  // create output directories
  await fsp.mkdir("./_site/data", { recursive: true })
  await fsp.mkdir("./_site/posts/questions", { recursive: true })
  await fsp.mkdir("./_site/posts/answers", { recursive: true })

  let questions = await getQuestions()
  await writeQuestionPosts(questions)

  let answers = await getAnswers()
  await writeAnswerPosts(answers)
}

async function getAnswers(): Promise<Answer[]> {
  let answers: Answer[]

  // TODO cache bust param?
  let answersExist = await checkFileExists(config.paths.answerCacheData)

  if (!answersExist) {
    let answersApi = await getAnswersByUser(config.userId)
    answers = transformAnswers(answersApi)
    await setCacheData(answers, config.paths.answerCacheData)
  } else {
    answers = await getCacheData<Answer[]>(config.paths.answerCacheData)
  }

  return answers
}

async function getQuestions(): Promise<Question[]> {
  let questions: Question[]

  // TODO cache bust param?
  let questionsExist = await checkFileExists(config.paths.questionCacheData)

  if (!questionsExist) {
    let questionsApi = await getQuestionsByUser(config.userId)
    questions = transformQuestions(questionsApi)
    await setCacheData(questions, config.paths.questionCacheData)
  } else {
    questions = await getCacheData<Question[]>(config.paths.questionCacheData)
  }

  return questions
}

function transformQuestions(questions: QuestionApi[]): Question[] {
  let transformed: Question[] = questions.map((q1) => {
    let {
      question_id,
      accepted_answer_id,
      title,
      score,
      creation_date: creation_date_epoch,
      last_activity_date: last_activity_date_epoch,
      tags,
      body_markdown,
    } = q1

    let creation_date = epochToISO(creation_date_epoch)
    let last_activity_date = epochToISO(last_activity_date_epoch)

    let q2 = {
      question_id,
      accepted_answer_id,
      title,
      score,
      creation_date,
      last_activity_date,
      tags,
      body_markdown,
    }

    return q2
  })

  return transformed
}

function transformAnswers(answers: AnswerApi[]): Answer[] {
  let transformed: Answer[] = answers.map((a1) => {
    let {
      answer_id,
      question_id,
      score,
      is_accepted,
      creation_date: creation_date_epoch,
      last_activity_date: last_activity_date_epoch,
      body_markdown,
    } = a1

    let creation_date = epochToISO(creation_date_epoch)
    let last_activity_date = epochToISO(last_activity_date_epoch)

    let a2 = {
      answer_id,
      question_id,
      score,
      is_accepted,
      creation_date,
      last_activity_date,
      body_markdown,
    }

    return a2
  })

  return transformed
}

async function setCacheData(data: any, path: string) {
  let output = JSON.stringify(data, null, 2)
  await fsp.writeFile(path, output, "utf-8")
}
async function getCacheData<T>(path: string): Promise<T> {
  let text = await fsp.readFile(path, "utf-8")
  let obj: T = JSON.parse(text)
  return obj
}

async function writeQuestionPosts(questions: Question[]) {
  let cachedPosts = await fsp.readdir(config.paths.questionPostFolder)
  let simpleUpToDate = cachedPosts.length === questions.length

  if (simpleUpToDate) return

  // write file param
  await Promise.all(
    questions.map(async function (question) {
      let path = `${config.paths.questionPostFolder}/${question.question_id}.md`

      let { question_id, title, score, tags, creation_date } = question
      let meta = { question_id, title, score, creation_date, tags }
      let frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      let post = `---\n${frontmatter}---\n\n${question.body_markdown}`

      fsp.writeFile(path, post, "utf-8")
    })
  )
}

async function writeAnswerPosts(answers: Answer[]) {
  let cachedPosts = await fsp.readdir(config.paths.answerPostFolder)
  let simpleUpToDate = cachedPosts.length === answers.length

  if (simpleUpToDate) return

  // write file param
  await Promise.all(
    answers.map(async function (answer) {
      let path = `${config.paths.answerPostFolder}/${answer.answer_id}.md`

      let { question_id, score, creation_date } = answer
      let meta = { question_id, score, creation_date }
      let frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      let post = `---\n${frontmatter}---\n\n${answer.body_markdown}`

      fsp.writeFile(path, post, "utf-8")
    })
  )
}
