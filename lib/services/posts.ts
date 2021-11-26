import { promises as fsp } from "fs"
import matter from 'gray-matter'
import { IPostBase } from "../models";

export const writePosts = async <T extends IPostBase>(posts: T[], postPath: (post: T) => string): Promise<void> => {
    const writeFiles = posts.map(async function (post) {
        const path = postPath(post)
        const file = createMarkdownContents(post)
        fsp.writeFile(path, file, "utf-8")
    });

    await Promise.all(writeFiles);
}

export const createMarkdownContents = (post: IPostBase): string => {
    const { body_markdown, ...meta } = post
    const content = matter.stringify(body_markdown, meta)
    return content;
}

