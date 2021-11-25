import config from "../config.json"
import { createDirectories, writePostsCached } from "../utils"
import { fetchData } from "."



export const writeSite = async() => {
  await createDirectories(Object.values(config.paths))

  const { questions,  answers,  questionAlts,  answerAlts, users } = await fetchData()


}
