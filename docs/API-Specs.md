# Backend API Specs

### `GET` http://{APIROOT}/

```Json
body: {
    token: user-token
}
```

```Json
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