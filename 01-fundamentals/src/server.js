import http from 'node:http';

/**
 * Stateless API:
 * - Save data in databases or otherPlaces
 * - In a stateless API, the server does not store any client session information between requests. 
 *   Each request from the client is independent and self-contained.
 * 
 * StateFul API: 
 * - Save data in webSession and restore the data each initialization
 * - Stateful APIs are often used in scenarios where maintaining session state across multiple requests 
 *   is necessary, such as in traditional web applications with user sessions.
 * 
 */

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

        return res.end("User has been created")
    }

    return res.end("Hello World!")
})

server.listen(3333);