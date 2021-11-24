import fs, { promises as fsp } from "fs"

export const checkFileExists = async (file: string) => fsp
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

