import config from "../config.json"
import { createDirectories, writePostsCached } from "../utils"
import { fetchData } from "."



export const writeMarkdown = async() => {
  await createDirectories(Object.values(config.paths))

  const { questions,  answers,  questionAlts,  answerAlts, users } = await fetchData()

  // write posts
  await writePostsCached(questions, config.paths.questionPostFolder, (p) => `${config.paths.questionPostFolder}${p.question_id}.md`)
  await writePostsCached(answers, config.paths.answerPostFolder, (p) => `${config.paths.answerPostFolder}${p.answer_id}.md`)

  await writePostsCached(questionAlts, config.paths.questionAltPostFolder, (p) => `${config.paths.questionAltPostFolder}${p.question_id}.md`)
  await writePostsCached(answerAlts, config.paths.answerAltPostFolder, (p) => `${config.paths.answerAltPostFolder}${p.answer_id}.md`)
}
