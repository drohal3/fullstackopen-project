!!! Work In Progress !!!
# Login
`POST /api/login`

```
{
    "email": "test@gmail.com",
    "password": "test"
}
```

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGFsLmRvbWluaWsuMTIzQGdtYWlsLmNvbSIsImlkIjoiNjQzNTNiZjY1ODk4MDg3NzUzYTBkOTljIiwiaWF0IjoxNjgzMDM2MjI2LCJleHAiOjE2ODMwMzk4MjZ9.XjL8SVIhBZttuaz0tZoGMcwSj048ooMj-nI1IbdOOq4",
    "id": "64353bf65898087753a0d99c",
    "email": "rohal.dominik.123@gmail.com",
    "firstName": "Dominik",
    "lastName": "Rohal"
}
```
...

# Users
`POST /api/user`

```
{
    "email": "test@gmail.com",
    "password": "test pswd",
    "firstName": "test",
    "lastName": "test",
    "nickName": "test01"
}
```

...

`DELETE /api/user/:id`

...

`POST /api/change-password`

```
{
    "currentPassword": "test",
    "newPassword" "test1"
}
```

...


# Articles


GraphQl



# Volunteers
...