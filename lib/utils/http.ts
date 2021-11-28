import { get } from 'https'
import { createGunzip } from 'zlib'

const getRequest = (url: string) => new Promise<string>((resolve, reject) => {
    const req = get(url, (res) => {
        const buffer: string[] = [];

        if (!res.headers['content-encoding']?.includes('gzip')) {
            res.on('data', (chunk) => buffer.push(chunk));
            res.on('end', () => resolve(buffer.join("")))
        } else {
            const gunzip = createGunzip();
            res.pipe(gunzip);
            gunzip.on('data', (data) => buffer.push(data.toString()))
            gunzip.on("end", () => resolve(buffer.join("")))
            gunzip.on("error", (e) => reject(e))
        }
    });

    req.on('error', (err) => reject(err));
    req.end();
})

export const fetchJson = async <T>(url: string): Promise<T> => {
    const resp = await getRequest(url)
    const data = JSON.parse(resp)
    return data as T;
}
