import fetch from 'node-fetch'

export const fetchJson = async <T>(url: string): Promise<T> => {
    const resp = await fetch(url)
    const data = await resp.json()
    return data as T;
}
