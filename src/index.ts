import { promises as fsp } from "fs"
import yaml from "js-yaml"
import config from "./config.json"
import { epochToISO } from "./date"
import { checkFileExists } from "./file"
import { Question, QuestionApi } from "./interfaces"
import { getQuestionsByUser } from "./stack"

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
  let questionsApi: QuestionApi[]
  let questions: Question[]

  // TODO cache bust param?
  let questionsExist = await checkFileExists(QUESTION_DATA_FILE)

  if (!questionsExist) {
    questionsApi = await getQuestionsByUser(config.userId)
    questions = transformQuestions(questionsApi)
    await cacheQuestions(questions)
  } else {
    questions = await readQuestions()
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
  let cachedPosts = await fsp.readdir(QUESTION_POST_FOLDER)
  let simpleUpToDate = cachedPosts.length === questions.length

  if (simpleUpToDate) return

  // write file param
  await Promise.all(
    questions.map(async function (question) {
      let path = `${QUESTION_POST_FOLDER}/${question.question_id}.md`

      let { question_id, title, score, tags, creation_date } = question
      let meta = { question_id, title, score, creation_date, tags }
      let frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

      let post = `---\n${frontmatter}---\n\n${question.body_markdown}`

      fsp.writeFile(path, post, "utf-8")
    })
  )
}
