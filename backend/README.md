# Development
## Instruction summary
### To run backend in local
(requires [Docker](https://www.docker.com/))

Run from backend root in separate terminal tabs:
```
docker-compose -f docker-compose.dev.yml down --volumes && docker-compose -f docker-compose.dev.yml up
```
```
MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev
```

## Database - MongoDB
A containerized MongoDB database for local development is configured in docker-compose.dev.yml file located in the backend root directory.
To start the container:
First run from the backend root
`docker-compose -f docker-compose.dev.yml down --volumes` to ensure that nothing is left and start from a clean slate.
then start the container by running `docker-compose -f docker-compose.dev.yml up`

The **MONGO_URL** parameter needs to be provided.

One option is to provide it when running the backend application.
`MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev`

## APIs

### `GET /api/users`
(only in development mode)

Returns list of users.

response:
```
[
    {
        "username": "test1",
        "name": "test1",
        "passwordHash": "$2b$10$TegnaYbpM1yGx3jwp02P1ODH6cV13sj7E2jMv8eQgBwT4sz7j2/ti",
        "id": "abc1"
    },
    {
        "username": "test2",
        "name": "test2",
        "passwordHash": "$2b$10$TegnaYbpM1yGx3jwp02P1ODH6cV13sj7E2jMv8eQgBwT4sz7j2/ti",
        "id": "abc2"
    }
]
```

### `POST /api/users`
Creates a new user.

body:
```
{
    "username":"test3",
    "password":"test3",
    "name": "name surname"
}
```

response:
```
{
    "username": "test3",
    "name": "name surname",
    "passwordHash": "$2b$10$xqKRfFIC.2wbc69IRnGNmui7ejrHhwRtltsH0UMh2Qx7ZFzeug3hO",
    "id": "64217f19b06f8ac3731b02bd"
}
```

### `DELETE /api/users/:id`
Removes user with the id.

### `POST /api/login`
Generates and returns a session token. Used for authorization and authentication.

body:
```
{
    "username":"test",
    "password":"test"
}
```

response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY0MjE3M2JhODMzMTNhYmRiYTg3MmZiOCIsImlhdCI6MTY3OTkxNzA1OSwiZXhwIjoxNjc5OTIwNjU5fQ.SbyyeqyfbDVHFDi6oF6butqIDqlly-bUygW06N6ebOc",
    "username": "test",
    "name": "test"
}
```
