import fetch from "node-fetch"

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    const json: T = await response.json()
    return json
  } catch (error) {
    console.log(error)
    throw error
  }
}
