import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "GET" && url === "/users") {
        return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {
        users.push({
            id: 1,
            name: "John Doe",
            email: "john@example.com",
        })

        return res.writeHead(201).end("User has been created");
    }

    return res.writeHead(404).end("Error your request was not found");
})

server.listen(3333);