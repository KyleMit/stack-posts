import fs, { promises as fsp } from "fs"
import { dirname } from 'path';
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

export const createDirectory = async(path: string): Promise<void> => {
    await fsp.mkdir(path, { recursive: true })
}
