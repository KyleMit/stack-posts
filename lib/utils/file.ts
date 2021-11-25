import fs, { promises as fsp } from "fs"
import { uniq } from "./array";

export const checkFileExists = async (file: string): Promise<boolean> => fsp
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

export const createDirectories = async (paths: string[]): Promise<void> => {
    const allDirs = paths.map(p => p.substr(0, p.lastIndexOf('/')));
    const uniqDirs = uniq(allDirs)
    const createDirs = uniqDirs.map(d => createDirectory(d))
    await Promise.all(createDirs)
}

export const createDirectory = async (path: string): Promise<void> => {
    await fsp.mkdir(path, { recursive: true })
}

export const writeJsonData = async (data: any, path: string): Promise<void> => {
    const output = JSON.stringify(data, null, 2)
    await fsp.writeFile(path, output, "utf-8")
}

export const getJsonData = async <T>(path: string): Promise<T> => {
    const text = await fsp.readFile(path, "utf-8")
    const obj = JSON.parse(text) as T
    return obj
}


export const cacheFolderUpToDate = async (arr: any[], directory: string): Promise<boolean> => {
    const directoryStats = await fsp.readdir(directory)
    const simpleUpToDate = directoryStats.length === arr.length
    return simpleUpToDate
  }
