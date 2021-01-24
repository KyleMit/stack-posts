import fs, { promises as fsp } from "fs"

export async function checkFileExists(file: string) {
  return fsp
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}
