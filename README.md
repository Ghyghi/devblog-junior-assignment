# Blog Assignment

## Backend — README

This folder contains the Express + Sequelize backend for the React discovery app.

## Quick overview

- Node/Express server (ES module style)
- Sequelize ORM with MySQL
- JWT-based authentication
- Seeders provided for initial data (users + posts + comments)

## Required environment variables

Create a `.env` file at the backend root, follow `.env.example` to setup your `.env` file.

**Do not commit your `.env` file**

## Install dependencies

From the `backend` directory:

```bash
npm install
```

## Migrations & Seeders

This project includes seeders under `backend/seeders`. If you use `sequelize-cli` you can run seeders like:

```bash
# Migrate to DB
npx sequelize db:migrate

# Seed DB
npx sequelize db:seed:all
```

(Adjust the command to match your sequelize-cli configuration if necessary.)

If you don't use `sequelize-cli` directly, you can also run the seed scripts programmatically or via a small node script.

## Start the server (development)

You can run the server using these commands:

```bash
# from backend/
node app.js

# or 
npx nodemon app.js
```

The server prints the URL it is running on (e.g. <http://127.0.0.1:5000>).

## Frontend - README

This folder contains the Next.js frontend.

## Environment variables

Create a `.env` file at the backend root, follow `.env.example` to setup your `.env` file.

**Do not commit your `.env` file**

## Installing dependencies

From the `frontend` directory:

```bash
npm install
```

## Start the server

Use the following command to start the server

```bash
# from frontend/
node app.js
```

The server prints the URL it is running on (e.g. <http://127.0.0.1:3000>).