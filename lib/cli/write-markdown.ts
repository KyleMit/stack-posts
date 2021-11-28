import { config } from "../config"
import { createDirectories, writePostsCached } from "../utils"
import { fetchData } from "."



export const writeMarkdown = async() => {
  await createDirectories(Object.values(config.posts))

  const { questions,  answers } = await fetchData()

  // write posts
  await writePostsCached(questions, config.posts.questionPost, (p) => `${config.posts.questionPost}${p.question_id}.md`)
  await writePostsCached(answers, config.posts.answerPost, (p) => `${config.posts.answerPost}${p.answer_id}.md`)
}
