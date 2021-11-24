import { promises as fsp } from "fs"
import { PostBase } from "../models";
import { objToFrontmatter } from "../utils";

export const writePosts = async <T extends PostBase>(posts: T[], postPath: (post: T) => string): Promise<void> => {
    const writeFiles = posts.map(async function (post) {
        const path = postPath(post)
        const file = createMarkdownContents(post)
        fsp.writeFile(path, file, "utf-8")
    });

    await Promise.all(writeFiles);
}

export const createMarkdownContents = (post: PostBase): string => {
    const { body_markdown, ...meta } = post
    const frontmatter = objToFrontmatter(meta)
    const content = `${frontmatter}\n${body_markdown}`
    return content;
}

