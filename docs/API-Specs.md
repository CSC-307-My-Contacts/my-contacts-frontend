# Backend API Specs

### `GET` http://{APIROOT}/

```JavaScript
header: {
    token: "user-token"
}
```

```JavaScript
Status-Code: 200
{
    contacts: [
        {
            uid: "contact ID",
            name: "name",
            email: "email",
            phone: "#####",
        },
        ...
    ]
}
```

### `POST` http://{APIROOT}/

```JavaScript
header: {
    token: "user-token"
},
body: {
    contact: {
        uid: "contact ID", // Optional
        name: "name",
        email: "email",
        phone: "#####",
    }
}
```

```JavaScript
Status-Code: 200
{
    contact: {
        uid: "contact ID",
        name: "name",
        email: "email",
        phone: "#####",
    }

}
```
### `POST` http://{APIROOT}/{login|create}

```JavaScript
body: {
    username: "username",
    password: "password"
}
```

On success:
```JavaScript
Status-Code: 200
{
    token: "user-token"
}
```
On failure:
```JavaScript
Status-Code: 403
```


### `DELETE` http://{APIROOT}/

```JavaScript
header: {
    token: "user-token"
},
body: {
    uid: "contact ID"
}
```

```JavaScript
Status-Code: 204
```
