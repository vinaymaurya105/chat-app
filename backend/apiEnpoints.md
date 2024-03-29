# login

- url - `user/login`
- Method `POST`

### Body

```json
{
  "username": "email",
  "password": ""
}
```

### Response

```json
{
  "success": true,
  "message": "Request successful",
  "token": ""
}
```

# listAll chat against user

- url `/chat`
  method - `get`

### Response

```json
{
  "success": true,
  "message": "",
  "result": {
    "pages": {
      "curruntPage": 1,
      "totalPage": 1,
      "totalRecords": 1
    },
    "values": [
      {
        "id": "",
        "chatName": "",
        "isGroupChat": false,
        "timestamp": "date",
        "users": [
          {
            "id": "",
            "label": "",
            "email": "",
            "icon": ""
          }
        ],
        "latestMesage": {
          "sender": {
            "id": "",
            "label": "",
            "email": "",
            "icon": ""
          },
          "content": ""
        }
      }
    ]
  }
}
```

# Create group chat

- url `/chat`
- method : `POST`,

### body

```json
{ "name": "chatName", "users": ["userId"] }
```

### Response

```json
{
  "success": true,
  "message ": "",
  "result": {
    "id": "chat id",
    "chatName": "chatName",
    "isGroupChat": true,
    "users": [
      {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
        "admin": true // if userId in admin then true else false
      }
    ],
    // "groupAdmin": [
    //   {
    //     "id": "",
    //     "label": "",
    //     "email": "",
    //     "icon": ""
    //   }
    // ],
    "createdBy":{ {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
      }},
    "timestamp": "date"
  }
}
```

# Rename chat

- url : `/chat/chatId`
- method `PATCH`,

### body

```json
{
  "name": "chatName"
}
```

### Response

```json
{
  "success": true,
  "message ": "",
  "result": {
    "id": "chat id",
    "chatName": "chatName",
    "isGroupChat": true,
    "users": [
      {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
        "admin": true // if userId in admin then true else false
      }
    ],
    // "groupAdmin": [
    //   {
    //     "id": "",
    //     "label": "",
    //     "email": "",
    //     "icon": ""
    //   }
    // ],
    "timestamp": "date"
  }
}
```

# Add user in group

- url :`chat/adduser`
- method- `patch`

### body

```json
{ "users": ["userId"] }
```

### Response

```json
{
  "success": true,
  "message ": "User added successfully",
  "result": {
    "id": "chat id",
    "chatName": "chatName",
    "isGroupChat": true,
    "users": [
      {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
        "admin": true // if userId in admin then true else false
      }
    ],
    // "groupAdmin": [
    //   {
    //     "id": "",
    //     "label": "",
    //     "email": "",
    //     "icon": ""
    //   }
    // ],
    "timestamp": "date"
  }
}
```

# Remove user from group

- url :`chat/remove-user/groupId`
- method- `put`

### body

```json
{ "user": "userId" }
```

### Response

```json
{
  "success": true,
  "message ": "User Removed successfully",
  "result": {
    "id": "chat id",
    "chatName": "chatName",
    "isGroupChat": true,
    "users": [
      {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
        "admin": true // if userId in admin then true else false
      }
    ]
  }
}
```

# makeGroupAdmin

url :`chat/admin/chatId`

- method- `patch`

### body

```json
{ "user": "userId" }
```

### Response

```json
{
  "success": true,
  "message ": "Request  successfully",
  "result": {
    "id": "chat id",
    "chatName": "chatName",
    "isGroupChat": true,
    "users": [
      {
        "id": "",
        "label": "",
        "email": "",
        "icon": "",
        "admin": true // if userId in admin then true else false
      }
    ],
    // "groupAdmin": [
    //   {
    //     "id": "",
    //     "label": "",
    //     "email": "",
    //     "icon": ""
    //   }
    // ],
    "timestamp": "date"
  }
}
```

# Remove from group chat

-url :`chat/remove-admin/chatId`

- method- `patch`

### body

```json
{ "user": "userId" }
```

### Response

```json
{
  "success": true,
  "message ": "User removed from admin succesfully"
}
```
