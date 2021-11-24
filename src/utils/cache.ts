import { cacheFolderUpToDate, checkFileExists, getJsonData, writeJsonData } from ".";

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

export const writeFilesCached = async <T>(writeFunc: (_: T[]) => Promise<void>, data: T[], cachePath: string, bustCache = false): Promise<void> => {
    const cacheUpToDate = await cacheFolderUpToDate(data, cachePath)
    if (cacheUpToDate && !bustCache) return

    await writeFunc(data)
}
