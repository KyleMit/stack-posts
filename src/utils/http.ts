import fetch from "node-fetch"

export async function fetchJson<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    const json = await response.json() as T
    return json
  } catch (error) {
    console.log(error)
    throw error
  }
}
