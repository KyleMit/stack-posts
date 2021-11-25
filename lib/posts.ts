import fs from 'fs'
import path from 'path'
import matter, { GrayMatterFile } from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Modify } from './utils'
import { IAnswer, IQuestion } from './models'

interface AnswerMatter extends Modify<GrayMatterFile<string>, {
    data: IAnswer
}> {}

interface QuestionMatter extends Modify<GrayMatterFile<string>, {
    data: IQuestion
}> {}

export interface IPostData {
    id: number,
    answer: IAnswer,
    question: IQuestion
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as AnswerMatter

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.answer_id < b.answer_id) {
      return 1
    } else {
      return -1
    }
  })
}



export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents) as AnswerMatter

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
