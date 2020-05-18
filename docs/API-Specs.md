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
            id: "contact ID",
            name: "name",
            email: "email",
            phone: "#####",
        }
        ...
    ]
}
```
