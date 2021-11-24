import fs, { promises as fsp } from "fs"
import { dirname } from 'path';
import { uniq } from "./array";

export const checkFileExists = async (file: string): Promise<boolean> => fsp
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

export const createDirectories = async (paths: string[]): Promise<void> => {
    const dirs = uniq(paths.map(p => dirname(p)))
    const createDirs = dirs.map(d => createDirectory(d))
    await Promise.all(createDirs)
}

export const createDirectory = async(path: string): Promise<void> => {
    await fsp.mkdir(path, { recursive: true })
}
