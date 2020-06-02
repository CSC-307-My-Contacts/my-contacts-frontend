# Backend API Specs

## Objects

### Contact

```JavaScript
{
    _id: "contact ID",
    name: "name",
    emails: [
        {address: "address", type: "home" },
        ...
    ],
    phones: [
        {number: "#######", type: "work" },
        ...
    ],
    labels: ["Friends", "Family", ...],
    image: {
        type: "none" | "external" | "hosted",
        url: "www"
    }
}
```

## API ROUTES

### `GET` http://{APIROOT}/

```JavaScript
header: {
    token: "user-token"
}
```

```JavaScript
Status-Code: 200
{
    contacts: [ /* SEE CONTACT */ ]
}
```

### `POST` http://{APIROOT}/

```JavaScript
header: {
    token: "user-token"
},
body: {
    contact: /* SEE CONTACT (maybe no _id) */
}
```

```JavaScript
Status-Code: 200
{
    contact: /* SEE CONTACT */
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
    _id: "contact ID"
}
```

```JavaScript
Status-Code: 204
```

### `POST` http://{APIROOT}/csv

```JavaScript
header: {
    token: "user-token"
},
files: {
    file: CSV-File
}
```

```JavaScript
Status-Code: 200
{
    contacts: [ /* SEE CONTACT */ ]
}
```

### `GET` http://{APIROOT}/img/<filename>
- No headers or body needed
- If the file system contains the image, serve it
    
### `POST` http://{APIROOT}/img
```JavaScript
header: {
    token: "user-token"
},
files: {
    file: Image-File
},
form: {
    _id: "id"
}
```
```JavaScript
Status-Code: 200
{
    contact: /* SEE CONTACT */
}
```
