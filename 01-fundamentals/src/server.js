import http from 'node:http';
import { json } from '../middlewares/json.js';
import { Database } from '../middlewares/Database.js';

const PORT = 3333;

const DB = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if (method === 'GET' && url === '/users') {
        const usersResponse = DB.select('users')

        return res.end(JSON.stringify(usersResponse))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        const newUser = {
            id: 1,
            name: name,
            email: email
        };

        DB.insert('users', newUser)

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end()
})

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})