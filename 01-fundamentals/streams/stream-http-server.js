import { createServer } from 'node:http'
import { Transform } from 'node:stream';

const PORT = 3334;

class InverNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
})