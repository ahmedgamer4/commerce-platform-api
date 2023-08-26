# COMMERCE PLATFORM API
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

## API endpoints
* Success response format ✅
```
{
  "message": "order found",
  "status": "success",
  "data": ...
}
```
* Error response format ❌
```
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

- `POST /api/v1/master/collages` - Create new collage ✅
- `GET /api/v1/master/collages` - Index collages ✅
- `GET /api/v1/master/collages/:collageId` - Show collage ✅
- `PUT /api/v1/master/collages/:collageId` - Update collage ✅
- `DELETE /api/v1/master/collages/:collageId` - Delete collage ✅

#### Admin ⏺

- `POST /api/v1/master/collages/:collageId/admins` - Create new admin ✅
- `GET /api/v1/master/collages/:collageId/admins` - Index admins ✅
- `GET /api/v1/master/collages/:collageId/admins/:adminId` - Show admin ✅
- `PUT /api/v1/master/collages/:collageId/admins/:adminId` - Update admin ✅
- `DELETE /api/v1/master/collages/:collageId/admins/:adminId` - Delete admin ✅

### Admin (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/admin/collages/:collageId` - Show collage ✅

#### Employee ⏺

- `POST /api/v1/admin/collages/:collageId/employees` - Create new employee ✅
- `GET /api/v1/admin/collages/:collageId/employees` - Index employees ✅
- `GET /api/v1/admin/collages/:collageId/employees/:employeeId` - Show employee ✅
- `PUT /api/v1/admin/collages/:collageId/employees/:employeeId` - Update employee ✅
- `DELETE /api/v1/admin/collages/:collageId/employees/:employeeId` - Delete employee ✅

#### Program ⏺

- `POST /api/v1/admin/collages/:collageId/programs` - Create new program ✅
- `GET /api/v1/admin/collages/:collageId/programs` - Index programs ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId` - Show program ✅
- `PUT /api/v1/admin/collages/:collageId/programs/:programId` - Update program ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId` - Delete program ✅

#### Application ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/applications` - Index applications ✅

### Employee (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/employee/collages/:collageId` - Show collage ✅

#### Program ⏺

- `GET /api/v1/employee/collages/:collageId/programs` - Index programs ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId` - Show program ✅

#### Application ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications` - Index applications ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Show application ✅
- `PUT /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Update application ✅

### Applicant (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/applicant/collages/:collageId` - Show collage ✅

#### Program ⏺

- `GET /api/v1/applicant/collages/:collageId/programs` - Index programs ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId` - Show program ✅
- `POST /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Create new application ✅

#### Application ⏺

- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Index applications (of applicant) ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Show application (of applicant) ✅
- `PUT /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Update application (of applicant - such as : documents) ✅
