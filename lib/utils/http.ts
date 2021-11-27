import { request, RequestOptions } from 'https'


export const fetchJson = async <T>(url: string): Promise<T> => {
    const urlOptions = new URL(url)
    const resp = await executeRequest(urlOptions)
    return resp as T;
}

const executeRequest = (options: RequestOptions) => new Promise((resolve, reject) => {
  const req = request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
          responseBody += chunk;
      });

      res.on('end', () => {
          resolve(JSON.parse(responseBody));
      });
  });

  req.on('error', (err) => {
      reject(err);
  });

  req.end();
})

