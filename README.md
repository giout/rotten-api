# Rotten tomatoes clone REST API
API that serves data to a rotten tomatoes clone app. This service collects data from <a href="https://www.themoviedb.org/">The Movie Database</a>.

- [API Documentation](#api-documentation)
- [Tech stack](#tech-stack)
- [Required installations](#required-installations)
- [Project initialization](#project-initialization)
- [Commands](#commands)
- [Environment variables](#environment-variables)

## API Documentation
https://documenter.getpostman.com/view/27562812/2s9YkgEkmM

## Tech stack
* [Node.js](https://nodejs.org)
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [Typescript](https://www.typescriptlang.org)
* [Express](https://expressjs.com)
* [PostgreSQL](https://www.postgresql.org/)

## Required installations
* [Node.js](https://nodejs.org/) - This project was developed using Node v20.10.0.
* [PostgreSQL](https://www.postgresql.org/) - This project was developed using Postgres 12

## Project initialization
1. Install dependencies by executing the dependencies command.
2. Create a postgres database.
3. Execute db.sql in the database to create the data structure.
4. Run the deploy or develop mode command to start the server.

## Commands 

### Install dependencies
It is mandatory to install dependencies before executing any other step.
```sh
$ npm install
```

### Generate Js code
Transpile .ts files into .js files, store them at */dist* folder and run these .js files.
```sh
$ npm run build
```

### Deploy in production mode
Deploy
```sh
$ npm run start
```
(This command will automatically transpile .ts files into .js files, store them at */dist* folder and run these .js files).

## Environment variables
Environment variables should be added to a .env in the root directory, following the structure of .env.example
<table>
<tr>
<th>Variable</th>
<th>Description</th>
</tr>
<tr>
<td>DB_URI</td>
<td>URI to connect to database</td>
</tr>
<tr>
<td>TOKEN_SIGNATURE</td>
<td>Secret key to sign jwt</td>
</tr>
<tr>
<td>API_KEY</td>
<td>Api key to authenticate to external api (TMDB)</td>
</tr>
<tr>
<td>PORT</td>
<td>Server listening port</td>
</tr>
</table>
