[]()# COMMERCE PLATFORM API
## Getting started
**NOTE:** First of all you should have postgress DB, node.js installed locally in your PC

### Env required
**EX**
```
# ENV info
PORT=XXXX
NODE_ENV=dev
# DB connection info
POSTGRES_HOST=XXXXXXXX
POSTGRES_PORT=XXXXXXXX
POSTGRES_DB=XXXX
POSTGRES_DB_TEST=XXXXXXXX
POSTGRES_USER=XXXX
POSTGRES_PASSWORD=XXXXXXXX
# CORS config
CORS_ORIGIN=XXXXXXXXXXXX
# REQ limit
REQEST_LIMIT_TIMEOUT=XXXXXXXX
REQEST_NUMBER_LIMIT=XXXXXXXX
# BCRYPT config
BCRYPT_SALT_ROUNDS=XXXXXXXX
BCRYPT_PASSWORD_PEPPER=XXXXXXXX
# JWT config
JWT_SECRET=XXXXXXXX
JWT_EXPIRES_IN=XXXX
```

### DB Creation
**NOTE:** You should create 2 databases locally in your PC
```
psql -U YOUR-USERNAME
Password: ....
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

### Installation Steps

1. Clone the repository
2. Run `npm install` to install dependencies
3. up migration `npm run migration:up`
4. down migration `npm run migration:down`
5. reset migration `npm run migration:reset`
6. Run `npm start` to start the server
7. Run `npm test` to run the tests
8. Run `npm run dev` to start the server in development mode
9. Run `npm run lint` to run the linter
10. Run `npm run format` to format the code using Prettier
11. Run `npm run build` to build the project for production
12. Run `npm run clean` to remove the build directory

## API DOCUMENTATION 📖
## API endpoints
* Success response format ✅
```json
{
"message": "order found",
"status": "success",
"data": ...
}
```
* Error response format ❌
```json
{
"message": "authorization denied",
"status": "error"
}
```

### Auth 🎯

- `POST /api/v1/auth/applicant/register` - Register new user (for new applicants only) ✅
- `POST /api/v1/auth/login` - Login user (Master - Admin - Employee - Applicant) ✅

### Storage 🎯

- `POST /api/v1/storage/upload` - Upload file ✅
- `GET /api/v1/storage/download/:fileName` - Download file ✅

### Master (authentication required) 🎯

#### Collage ⏺

- `POST /api/v1/master/collages` - Create new collage [Details](#create-collage-master) ✅
- `GET /api/v1/master/collages` - Index collages [Details](#index-collage-master) ✅
- `GET /api/v1/master/collages/:collageId` - Show collage [Details](#show-collage-master)✅
- `PUT /api/v1/master/collages/:collageId` - Update collage [Details](#udpate-collage-master)✅
- `DELETE /api/v1/master/collages/:collageId` - Delete collage [Details](#delete-collage-master)✅

#### Admin ⏺

- `POST /api/v1/master/collages/:collageId/admins` - Create new admin [Details](#create-admin) ✅
- `GET /api/v1/master/collages/:collageId/admins` - Index admins [Details](#index-admin) ✅
- `GET /api/v1/master/collages/:collageId/admins/:adminId` - Show admin [Details](#show-admin) ✅
- `PUT /api/v1/master/collages/:collageId/admins/:adminId` - Update admin [Details](#update-admin) ✅
- `DELETE /api/v1/master/collages/:collageId/admins/:adminId` - Delete admin [Details](#delete-admin) ✅

### Admin (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/admin/collages/:collageId` - Show collage [Details](#show-collage-admin)✅

#### Employee ⏺

- `POST /api/v1/admin/collages/:collageId/employees` - Create new employee [Details](#create-employee-admin) ✅
- `GET /api/v1/admin/collages/:collageId/employees` - Index employees [Details](#index-employee-admin) ✅
- `GET /api/v1/admin/collages/:collageId/employees/:employeeId` - Show employee [Details](#show-employee-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/employees/:employeeId` - Update employee [Details](#update-employee-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/employees/:employeeId` - Delete employee [Details](#delete-employee-admin) ✅

#### Program ⏺

- `POST /api/v1/admin/collages/:collageId/programs` - Create new program [Details](#create-program-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs` - Index programs [Details](#index-program-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId` - Show program [Details](#show-program-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/programs/:programId` - Update program [Details](#update-program-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId` - Delete program [Details](#delete-program-admin) ✅

#### Application ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/applications` - Index applications [Details](#index-applications-admin) ✅

### Employee (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/employee/collages/:collageId` - Show collage [Details](#show-collage-employee) ✅

#### Program ⏺

- `GET /api/v1/employee/collages/:collageId/programs` - Index programs [Details](#index-program-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId` - Show program [Details](#show-program-employee) ✅

#### Application ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications` - Index applications [Details](#index-applications-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Show application [Details](#show-applications-employee) ✅
- `PUT /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Update application [Details](#update-applications-employee) ✅

### Applicant (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/applicant/collages/:collageId` - Show collage [Details](#show-collage-applicant) ✅

#### Program ⏺

- `GET /api/v1/applicant/collages/:collageId/programs` - Index programs [Details](#index-program-applicant) ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId` - Show program [Details](#show-program-applicant) ✅

#### Application ⏺

- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Index applications (of applicant) [Details](#index-applications-applicant) ✅
- `POST /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Create new application [Details](#create-program-applicant) ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Show application (of applicant) [Details](#show-applications-applicant) ✅
- `PUT /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Update application (of applicant - such as : documents) [Details](#update-applications-applicant) ✅

### All Enpoints (in details)📡

#### Master

##### Collage

###### Index collages
<a name="index-collage-master"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/master/collages`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collages found successfully.",
  "data": {
    "collages": [
      {
        "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "name": "collage",
        "university_name": "kafr",
        "created_at": "2023-08-28T14:16:48.306Z",
        "updated_at": "2023-08-28T14:16:48.306Z"
      },
      {
        "id": "6fb783e2-c4fa-4f11-9b4e-22425ef75f38",
        "name": "collage",
        "university_name": "kafr",
        "created_at": "2023-08-30T09:45:59.937Z",
        "updated_at": "2023-08-30T09:45:59.937Z"
      }
    ],
    "count": "2"
  }
}
```

- _Example - JS_:
```js
let headersList = {
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
};

let response = await fetch(
  'http://localhost:3000/api/v1/master/collages',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Create collage
<a name="create-collage-master"></a>
- _HTTP Method:_ `POST` 
- _Endpoint URL :_ `api/v1/master/collages`
- _Headers_ `Authorization`
- _Request Body_: 
```json
{
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
}
```
- _Success Response:_ `201`
```json
{
  "status": "success",
  "message": "Collage created successfully",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "FCI",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:
```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
});

let response = await fetch(
  'http://localhost:3000/api/v1/master/collages',
  {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Show collage
<a name="show-collage-master"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/master/collages/:collageId`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:
```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/master/collages/68267de3-113e-4655-916f-ae954f488146',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update collage
<a name="update-collage-master"></a>
- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/master/collage/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
}
```

- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage updated successfully.",
  "data": {
    "collage": {
      "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-28T14:16:48.306Z",
      "updated_at": "2023-08-28T14:16:48.306Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
});

let response = await fetch(
  'http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16',
  {
    method: 'PATCH',
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```
###### Delete collage
<a name="delete-collage-master"></a>
- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/master/collage/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage deleted successfully.",
  "data": {
    "collage": {
      "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-28T14:16:48.306Z",
      "updated_at": "2023-08-28T14:16:48.306Z"
    }
  }
}
```
- _Example - JS_:

  ```js
  let headersList = {
    Accept: '*/*',
    Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
    'Content-Type': 'application/json',
  };

  let response = await fetch(
    'http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16',
    {
      method: 'DELETE',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
  ```


##### Admin

###### Create Admin
<a name="create-admin"></a>
- _HTTP Method:_ `POST` 
- _Endpoint URL :_ `api/v1/master/collages/:collageId/admins`
- _Headers_ `Authorization`
- _Request Body_: 
```json
{
  "name": "admin4",
  "email": "4@email.com",
  "password": "ahmed123456"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Admin created successfully",
  "data": {
    "admin": {
      "id": "763e44e0-bd5c-4023-8d19-8794c0898514",
      "email": "5@email.com",
      "name": "admin5",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T14:18:07.575Z",
      "updated_at": "2023-08-30T14:18:07.575Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "admin4",
  "email": "4@email.com",
  "password": "ahmed123456"
});

let response = await fetch(
  'http://localhost:3000/api/v1/master/collage-types',
  {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index admin
<a name="index-admin"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/master/collages/:collageId/admins`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Admins found successfully.",
  "data": {
    "admins": [
      {
        "id": "048545f1-47aa-4a3f-9438-dea96dfd1ee6",
        "email": "email@email.com",
        "name": "admin",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-28T15:21:08.704Z",
        "updated_at": "2023-08-28T15:21:08.704Z"
      },
      {
        "id": "8688e9cc-d9d3-4cd1-a881-a7067e8be7af",
        "email": "1@email.com",
        "name": "admin2",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-28T15:51:00.198Z",
        "updated_at": "2023-08-28T15:51:00.198Z"
      },
      {
        "id": "9258b19e-bfa6-41da-a65a-2f6c3154bae3",
        "email": "3@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:23:10.496Z",
        "updated_at": "2023-08-29T13:23:10.496Z"
      },
    ],
    "count": "3"
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/master/admins',
  {
    method: 'GET',
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show admin 
<a name="show-admin"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Admin retrieved successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/master/universities/642deaa976e91123782b7f16',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```


###### Update admin 
<a name="update-admin"></a>
- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "mohamed",
  "password": "ahmed123456",
  "email": "a@email.com"
}
```

- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Admin updated successfully",
  "data": {
    "admin": {
      "id": "d0d640d1-9851-410d-84de-a263dc67b67f",
      "email": "a@email.com",
      "name": "mohamed",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T22:51:41.851Z",
      "updated_at": "2023-08-28T22:51:41.851Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "mohamed",
  "password": "ahmed123456",
  "email": "a@email.com"
});

let response = await fetch(
  'http://localhost:3000/api/v1/master/universities/642deaa976e91123782b7f16',
  {
    method: 'PATCH',
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete admin 
<a name="delete-admin"></a>
- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Admin removed successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/master/universities/642deaa976e91123782b7f16',
  {
    method: 'DELETE',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

#### Admin

##### Collage

###### Show collage
<a name="show-collage-admin"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/admin/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```

##### Employee

###### Create Employee 
<a name="create-employee-admin"></a>
- _HTTP Method:_ `POST` 
- _Endpoint URL :_ `/api/v1/admin/collages/:collageId/employees`
- _Headers_ `Authorization`
- _Request Body_: 
```json
{
  "name": "emp",
  "email": "11@email.com",
  "password": "ahmed123456"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Employee created successfully",
  "data": {
    "employee": {
      "id": "bd63391e-0591-41ff-86d5-ac0205f27c73",
      "email": "11@email.com",
      "name": "emp",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T16:05:02.695Z",
      "updated_at": "2023-08-30T16:05:02.695Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "emp",
  "email": "11@email.com",
  "password": "ahmed123456"
});

let response = await fetch(
  'http://localhost:3000//api/v1/admin/collages/:collageId/employees',
  {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index employee
<a name="index-employee-admin"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/admin/collages/:collageId/employees`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Employees found successfully.",
  "data": {
    "employees": [
      {
        "id": "cae16920-056f-4a9b-bb52-fc2f0d38ab84",
        "email": "5@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:43:10.567Z",
        "updated_at": "2023-08-29T13:43:10.567Z"
      },
      {
        "id": "0a211647-efb4-4177-ac53-68162019e90a",
        "email": "6@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:49:56.226Z",
        "updated_at": "2023-08-29T13:49:56.226Z"
      },
      {
        "id": "bc62ba72-fc69-4f0c-9812-a315f11c7636",
        "email": "7@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:50:30.888Z",
        "updated_at": "2023-08-29T13:50:30.888Z"
      },
    ],
    "count": "3"
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000api/v1/admin/collages/:collageId/employees',
  {
    method: 'GET',
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show employee
<a name="show-employee-admin"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Employee retrieved successfully",
  "data": {
    "employee": {
      "id": "a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
      "email": "mohamed1@gmail.com",
      "name": "mohamed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-29T13:36:09.189Z",
      "updated_at": "2023-08-29T13:36:09.189Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000api/v1/admin/collages/:collageId/employees/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```


###### Update employee 
<a name="update-employee-admin"></a>
- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "mohamed1",
  "password": "ahmed123456",
  "email": "mohamed1@gmail.com"
}
```

- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Employee updated successfully",
  "data": {
    "employee": {
      "id": "a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
      "email": "mohamed1@gmail.com",
      "name": "mohamed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-29T13:36:09.189Z",
      "updated_at": "2023-08-29T13:36:09.189Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "mohamed",
  "password": "ahmed123456",
  "email": "a@email.com"
});

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/:collageId/employees/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'PATCH',
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete employee
<a name="delete-employee-admin"></a>
- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Employee removed successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/collageId/employees/642deaa976e91123782b7f16',
  {
    method: 'DELETE',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

##### Program

###### Create program
<a name="create-program-admin"></a>
- _HTTP Method:_ `POST` 
- _Endpoint URL :_ `/api/v1/admin/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: 
```json
{
  "name": "program",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Program created successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}

```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "program",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
});

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/:collageId/programs',
  {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index program
<a name="index-program-admin"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/admin/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/:collageId/programs',
  {
    method: 'GET',
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program
<a name="show-program-admin"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000api/v1/admin/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```


###### Update program
<a name="show-program-admin"></a>
- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "programex",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
}
```

- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Program updated successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "programex",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  "name": "program",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
});

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'PATCH',
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete program
<a name="delete-program-admin"></a>
- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Program removed successfully."
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/admin/collages/collageId/programsi/642deaa976e91123782b7f16',
  {
    method: 'DELETE',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```


#### Employee

##### Collage 

###### Show collage
<a name="show-collage-employee"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/employee/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```

##### Program

###### Index program
<a name="index-program-employee"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/employee/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/employee/collages/:collageId/programs',
  {
    method: 'GET',
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program
<a name="show-program-employee"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000api/v1/employee/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```



#### Applicant

##### Collage 

###### Show collage
<a name="show-collage-applicant"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/applicant/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```


##### Program

###### Index program
<a name="index-program-applicant"></a>
- _HTTP Method:_ `GET` 
- _Endpoint URL :_ `api/v1/applicant/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000/api/v1/applicant/collages/:collageId/programs',
  {
    method: 'GET',
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program
<a name="show-program-applicant"></a>
- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`
```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```
- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
  'http://localhost:3000api/v1/applicant/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076',
  {
    method: 'GET',
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```


