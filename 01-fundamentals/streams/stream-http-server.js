import { createServer } from 'node:http'
import { Transform } from 'node:stream';

const PORT = 3334;

class InverNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = createServer((req, res) => {
  return req
    .pipe(new InverNumberStream())
    .pipe(res)
})

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
})