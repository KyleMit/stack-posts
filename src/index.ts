import fs, { promises as fsp } from "fs"
import { URLSearchParams } from "url"
import fetch from "node-fetch"
import yaml from "js-yaml"
import config from "./config.json"
import { Question, QuestionResponse } from "./interfaces"

const QUESTION_DATA_FILE = "./_site/data/questions.json"
const QUESTION_POST_FOLDER = "./_site/posts/questions"

main()

async function main() {
  // create output directories
  await fsp.mkdir("./_site/data", { recursive: true })
  await fsp.mkdir("./_site/posts/questions", { recursive: true })

  let questions = await getQuestions()

  await writeQuestionPosts(questions)
}

async function getQuestions(): Promise<Question[]> {
  let questions: Question[]

  // TODO cache bust param?
  let questionsExist = await checkFileExists(QUESTION_DATA_FILE)

  if (!questionsExist) {
    questions = await fetchQuestions(config.userId)
    await cacheQuestions(questions)
  } else {
    questions = await readQuestions()
  }

  return questions
}

async function fetchQuestions(userId: Number) {
  let questBase = `https://api.stackexchange.com/2.2/users/${userId}/questions`

  let params = {
    page: "1",
    pagesize: "100",
    order: "desc",
    sort: "activity",
    site: "stackoverflow",
    filter: config.questionFilter,
  }

  // declare placeholders
  let json: QuestionResponse
  let questions: Question[] = []

  // make calls in a loop
  do {
    let queryString = new URLSearchParams(params).toString()
    let queryUrl = `${questBase}?${queryString}`

    // query data
    json = await getData<QuestionResponse>(queryUrl)

    // append to questions
    questions.push(...json.items)

    // increment page counter
    params.page += 1
  } while (json.has_more)

  return questions
}

async function cacheQuestions(questions: Question[]) {
  let output = JSON.stringify(questions, null, 2)
  await fsp.writeFile(QUESTION_DATA_FILE, output, "utf-8")
}

async function readQuestions(): Promise<Question[]> {
  let questionText = await fsp.readFile(QUESTION_DATA_FILE, "utf-8")
  let questions: Question[] = JSON.parse(questionText)
  return questions
}

async function writeQuestionPosts(questions: Question[]) {
  // write file param
  await Promise.all(
    questions.map(async function (question) {
      let path = `${QUESTION_POST_FOLDER}/${question.question_id}.md`

      let { question_id, title, score, view_count, tags } = question
      let meta = { question_id, title, score, view_count, tags }
      let frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      let post = `---\n${frontmatter}---\n\n${question.body_markdown}
`
      // can skip last await
      fsp.writeFile(path, post, "utf-8")
    })
  )
}

async function checkFileExists(file: string) {
  return fsp
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    const json: T = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw error
  }
}
