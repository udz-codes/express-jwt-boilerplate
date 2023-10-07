# ExpressJS REST API Boilerplate

<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" /></a> <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /></a> <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-FB015B?style=for-the-badge" /></a>

A cookiecutter template to create REST API with ExpressJS and MongoDB, with JWT authentication.

## Boilerplate Features:
- Registration
- Login
- JWT authentication
- Private routes example
- Schema Validation check (email validation, minimum characters, etc.)
- Password Encryption
- MongoDB Database
- API rate limit

## Setup
1. Clone the project
```
git clone https://github.com/udz-codes/express-rest-boilerplate.git
```
2. Install packages
```
npm install
```
3. Setup environment variables: Create .env file in root of the project and set 3 enviroment variables
```
PORT = ""

DB_URL = ""

JWT_SECRET = ""
```
  > **PORT:** Port number for local host <br/>
  > **DB_URL:** MongoDB URL, You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as database <br/>
  > **JWT_SECRET:** A random string that will be used for JWT encoding and authentication <br/>

4. Run the project
```
node app.js
```
OR, if you have [nodemon](https://www.npmjs.com/package/nodemon) installed
```
npm start
```

## API endpoints

| **Endpoint** | **Purpose** | **Features** |
| :------------- | :---------- | :----------- |
| / | Homepage  | None |
| /api/user/register | Registration route that saves information of a new user on the database  | Duplicate user check, password hashing |
| /api/user/login | Login route that returns token on successful login  | User existance check, Password match check, JWT Creation |
| /api/private | Example private route that can't be accessed without a token  | "auth-token" header is required, which means user must be logged in to access this route |
| **Examples** | | |
| **Endpoint** | **Purpose** | **Link** |
| /api/examples/pagination/products?limit=100&page=3 | Demonstrating Pagination | [paginationExample.js](https://github.com/udz-codes/express-jwt-boilerplate/blob/master/routes/examples/paginationExample.js) |


## Production dependencies
| **Package** | **Version** | **Purpose** |
| :------------- | :---------- | :----------- |
| [express](https://expressjs.com/) | ^4.18.2 | Creating the REST API |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  | ^9.0.2 | Generating JWT and Authenticating it |
| [mongoose](https://www.npmjs.com/package/mongoose) | ^6.12.0 | Connecting to MongoDB |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | ^2.4.3 | Hashing the password  |
| [@hapi/joi](https://www.npmjs.com/package/joi) | ^17.1.1 | Schema validation check |
| [joi](https://www.npmjs.com/package/joi) | ^17.10.2 | Schema validation check |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^10.0.0 | Loads environment variables |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.5| enable CORS |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | ^7.1.0| Rate limiting for Users |

## Contributions <a href="https://github.com/udz-codes/express-jwt-boilerplate/blob/master/LICENSE"><img src="https://img.shields.io/github/license/udz-codes/express-jwt-boilerplate" /></a> <a href="https://github.com/udz-codes/express-jwt-boilerplate/issues"><img src="https://img.shields.io/github/issues/udz-codes/express-jwt-boilerplate" /></a>
Contributions are welcomed, to learn more about it, please check [Contributing.md](https://github.com/udz-codes/express-rest-boilerplate/blob/master/Contributing.md).

#### Current Contributors
<a href="https://github.com/udz-codes/express-rest-boilerplate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=udz-codes/express-rest-boilerplate" />
</a>
