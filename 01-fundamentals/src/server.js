import http from 'node:http';

// GET /users => get users on the dataBase
// POST /users => Create new User in the dataBase

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if(method === "GET" && url === "/users"){
        return res.end("User list here!")
    }

    if(method === "POST" && url === "/users"){
        return res.end("User has been created!")
    }

    return res.end("Hello World!")
})

server.listen(3333);