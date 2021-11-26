import { remark } from "remark"
import html from 'remark-html'

export const convertMarkdownToHtml = async (input: string): Promise<string> => {
    const processedContent = await remark()
        .use(html)
        .process(input)
    const output = processedContent.toString()
    return output
}
