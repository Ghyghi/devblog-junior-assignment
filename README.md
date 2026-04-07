# Blog Assignment

## Project description

For this assignment, I created a bloging web app called *The Publication* which would allow people to view posts on the site and for authenticated people to create posts or comment on them.

## Tech Stack

To complet this assignment, I used the following stack:

1. Express for the backend
2. Next.js and CSS modules for the frontend
3. Postgres for my Db and Sequelize as my ORM

## Setup Instructions

### Backend — README

This folder contains the Express + Sequelize backend for the React discovery app.

#### Quick overview

- Node/Express server (ES module style)
- Sequelize ORM with MySQL
- JWT-based authentication
- Seeders provided for initial data (users + posts + comments)

#### Required environment variables

Create a `.env` file at the backend root, follow `.env.example` to setup your `.env` file.

**Do not commit your `.env` file**

#### Install dependencies

From the `backend` directory:

```bash
npm install
```

#### Migrations & Seeders

This project includes seeders under `backend/seeders`. If you use `sequelize-cli` you can run seeders like:

```bash
# Migrate to DB
npx sequelize db:migrate

# Seed DB
npx sequelize db:seed:all
```

(Adjust the command to match your sequelize-cli configuration if necessary.)

If you don't use `sequelize-cli` directly, you can also run the seed scripts programmatically or via a small node script.

#### Start the server (development)

You can run the server using these commands:

```bash
# from backend/
node app.js

# or 
npx nodemon app.js
```

The server prints the URL it is running on (e.g. <http://127.0.0.1:5000>).

### Frontend - README

This folder contains the Next.js frontend.

#### Environment variables

Create a `.env` file at the backend root, follow `.env.example` to setup your `.env` file.

**Do not commit your `.env` file**

#### Installing dependencies

From the `frontend` directory:

```bash
npm install
```

#### Start the server

Use the following command to start the server

```bash
# from frontend/
node app.js
```

The server prints the URL it is running on (e.g. <http://127.0.0.1:3000>)

## Environment variables explanation

### Backend Variables

```markdown
# Database configuration
DB_USER: The username for your DB configurations
DB_HOST=The host for your DB
DB_DATABASE=The name of the DB
DB_PASSWORD=The password of the DB user
DB_PORT=The posrt to reach your DB

# Server configuration
PORT=The port the backend will connect through
HOST=The host the bcakend can be reached through
FRONTEND_URL=The frontend url for cors permissions

# JWT configuration
JWT_SECRET=The secret key to encode the JWT tokens
JWT_EXPIRES_IN=The life time the tokens

# Seed Data
SEED_PASSWORD=The password to the seeded users
```

### Frontend Variables

```markdown
API_URL=The backend URL to your endpoints
AUTH_API_URL=The backend URL specific to your auth endpoints
```

## Design Decisions

The design of the system was restricted to the functional requirements only since the fullness of the system was not an evaluation criterion.

## Challenges faced and how they were solved

The major challenge I faced was my unfamiliarity with either of the suggested frontend frameworks, Angular and NextJS. However, since I was already familiar with React, NextJS was the better choice. I adapted to the chalenge by using tutorials and looking up syntax to fill in the gaps of knowledge.

---
