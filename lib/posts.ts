import { getPostsCached } from "./cli"


export async function getAllPostIds() {
    const allPosts = await getPostsCached()
    return Object.keys(allPosts).map(id => ({
        params: { id }
    }))
}

export async function getAllPosts() {
    const allPosts = await getPostsCached()
    return Object.values(allPosts)
}

export async function getPostData(id: string) {
    const allPosts = await getPostsCached()
    return allPosts[id]
}
