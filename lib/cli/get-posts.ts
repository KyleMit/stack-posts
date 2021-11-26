import { promises as fsp} from 'fs'
import path from 'path'
import matter, { GrayMatterFile } from 'gray-matter'
import { objMapValues, Modify, objMapValuesAsync, fetchDataCached } from '../utils'
import { IAnswer, IQuestion } from '../models'
import config from '../config'
import { convertMarkdownToHtml } from '../utils/markdown'


export interface GrayMatterInfo extends Pick<GrayMatterFile<string>, 'content' | 'data'> {}
export interface GrayMatterQuestion extends Modify<GrayMatterInfo, {
    data: IQuestion
}> {}
export interface GrayMatterAnswer extends Modify<GrayMatterInfo, {
    data: IAnswer
}> {}


export interface IPost {
    id: string,
    q: GrayMatterQuestion,
    a: GrayMatterAnswer
}

export const getPostsCached = async ():  Promise<Record<string, IPost>> => {
    const posts = await fetchDataCached(() => getPosts(), config.cache.postData)
    return posts
}

export const getPosts = async (): Promise<Record<string, IPost>> => {
    const postsDirectory = objMapValues(config.posts, (x) => path.join(process.cwd(), x))
    const postDirs = await objMapValuesAsync(postsDirectory, async (dir) => {
        const fileNames = await fsp.readdir(dir)
        const allPostsPromises = fileNames.map(async (fileName) => {
            const fullPath = path.join(dir, fileName)
            const fileContents = await fsp.readFile(fullPath, 'utf8')
            const matterResult = matter(fileContents)
            const { data, content } = matterResult
            const html = await convertMarkdownToHtml(content)
            const info: GrayMatterInfo = {
                data,
                content: html
            }
            return info
        })
        const postData = await Promise.all(allPostsPromises)
        return postData
    })

    const { questionPost, questionAltPost, answerPost, answerAltPost } = postDirs

    const allQuestions = [...questionPost, ...questionAltPost] as GrayMatterQuestion[]
    const allAnswers = [...answerPost, ...answerAltPost] as GrayMatterAnswer[]

    const questionsHash = Object.fromEntries(allQuestions.map(q => [String(q.data.question_id), q]))
    const answersHash = Object.fromEntries(allAnswers.map(a => [String(a.data.question_id), a]))

    const postsHash = objMapValues(questionsHash, (q) => ({
        id: String(q.data.question_id),
        q: q,
        a: answersHash[q.data.question_id]
    }))

    return postsHash
}
