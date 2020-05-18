# Backend API Specs

### `GET` http://{APIROOT}/

```JavaScript
body: {
    token: user-token
}
```

```JavaScript
{
    contacts: [
        {
            uid: "contact ID",
            name: "name",
            email: "email",
            phone: "#####",
        }
        ...
    ]
}
```
### `GET` http://{APIROOT}/login

```JavaScript
body: {
    username: "username"
    password: "password"
}
```

```JavaScript
{
    token: "usertoken"
}
```
