# Login System Boilerplate

## Boilerplate for a simple login system using React, Express, Postgresql and Redis

A react app for authentication and authorization with session cookies using Redis. The server is written using express with the database being postgresql.

Only one method of authentication is being implemented: login using email and password. For future project development is to implement a JWT auth system.

## Develop

To further develop this project, clone this repo and make sure you have the following prerequisites.

- [Node](https://nodejs.org/en/download/) ^16.3.0
- [npm](https://nodejs.org/en/download/package-manager/)

From your command line go tothe repo's folder and run the following scripts in the terminal.

1\. Go to repo's folder

```terminal
$ cd login-system-boilerplate
```

2\. Install dependencies

```terminal
$ npm install
```

3\. Start the web application (in any order)

Start the redis server

```terminal
$ redis-server
```

Start the client

```terminal
$ npm run devClient
```

Start the server

```terminal
$ npm run devServer
```
