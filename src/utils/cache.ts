import { cacheFolderUpToDate, checkFileExists, getJsonData, writeJsonData } from ".";
import { IPostBase } from "../models";
import { writePosts } from "../services";

export const fetchDataCached = async <T>(fetchFunc: () => Promise<T>, cachePath: string, bustCache = false): Promise<T> => {
    const cacheExists = await checkFileExists(cachePath)

    if (cacheExists && !bustCache) {
        const data = await getJsonData<T>(cachePath)
        return data;
    }

    const data = await fetchFunc()
    await writeJsonData(data, cachePath)
    return data;
}

export const writePostsCached = async <T extends IPostBase>(data: T[], cacheDir: string, postPath: (post: T) => string, bustCache = false): Promise<void> => {
    const cacheUpToDate = await cacheFolderUpToDate(data, cacheDir)
    if (cacheUpToDate && !bustCache) return

    await writePosts(data, postPath)
}
