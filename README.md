# Login System Boilerplate

![Login Page](https://user-images.githubusercontent.com/71662324/183850119-a77a0a19-494e-4ccf-a284-bae4148d57f4.PNG)

## Boilerplate for a simple login system using React, Express, Postgresql and Redis

A react app for authentication and authorization with session cookies using Redis. The server is written using express with the database being postgresql.

Only one method of authentication is being implemented: login using email and password. Will implement JWT auth strategy in near future.

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

3\. Start the web application (in order)

Start the redis server

```terminal
$ redis-server
```

Start the server

```terminal
$ npm run devServer
```

Start the client

```terminal
$ npm run devClient
```

## Project Folder Structure

#### Top Level Directory Layout

```terminal
.
├── packages
    ├── client               # react app
    ├── common               # validation data shared by client and server
    ├── server               # express app
├── package.json
└── README.md
```

## Technologies Used

| Client-side | Server-side |
| ----------- | ----------- |
| React       | Express     |
| Charkra UI  | Redis       |
| Yup         | Postgresql  |
| Formik      |
