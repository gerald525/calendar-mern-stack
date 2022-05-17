# MERN Calendar

Calendar web application for adding, editing, deleting or listing other people's events. Developed using the MERN stack.

*API, CRUD, Auth system, JWT, Redux, Calendar.*

## [Try demo](https://mern-redux-calendar.herokuapp.com/)

<img src="./preview.jpeg">

### Table of contents 📃

- [MERN Calendar](#mern-calendar)
  - [Try demo](#try-demo)
    - [Table of contents 📃](#table-of-contents-)
  - [Starting 🚀](#starting-)
    - [Pre-requirements 📋](#pre-requirements-)
    - [Installation 🔧](#installation-)
  - [Deployment 📦](#deployment-)
  - [Built with 🛠️](#built-with-️)

## Starting 🚀
  
### Pre-requirements 📋

* [Git](https://git-scm.com/)
* [npm](https://www.npmjs.com/)
* [Mongo database](https://www.mongodb.com/)

### Installation 🔧

Local installation:

```bash
# Clone this repository
$ git clone https://github.com/Ju4npx/mern-calendar.git

# Change directory to the project path
$ cd mern-calendar
```

---

**Server setup:**
```bash
# Change directory to the server path
$ cd server

# Install dependencies
$ npm install

# Copy .env file
$ cp .env.example .env
```

server **.env** file setup:

```shell
PORT=5000
MONGODB_CNN=mongodb+srv://user:password@clusterrestaurant.rgq1n.mongodb.net/schema
JWT_SECRET_KEY=RANDOMKEY
```

---

**Client setup:**
```bash
# Go back to the project path
$ cd ..

# Change directory to the client path
$ cd client

# Install dependencies
$ npm install

# Copy .env file
$ cp .env.example .env
```

client **.env** file setup:

```shell
REACT_APP_API_URL="http://localhost:5000/api"
```

## Deployment 📦

```bash
# Open terminal in project path and run
$ cd server
$ npm start


# Open another terminal in project path and run
$ cd client
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Built with 🛠️

* [React](https://es.reactjs.org/) - Frontend framework
* [React Redux](https://react-redux.js.org/) - State management
* [Node.js](https://nodejs.org/) - Javascript runtime environment
* [Express.js](https://expressjs.com/) - Backend framework
* [MongoDB](https://www.mongodb.com/) - NoSQL database

---
⌨️ with ❤️ by [Juan Pablo Machado](https://github.com/Ju4npx ) 😊 