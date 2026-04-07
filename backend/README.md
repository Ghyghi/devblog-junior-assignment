# Backend — README

This folder contains the Express + Sequelize backend for the React discovery app.

## Quick overview

- Node/Express server (ES module style)
- Sequelize ORM with MySQL
- JWT-based authentication
- Seeders provided for initial data (users + books)

## Required environment variables

Create a `.env` file at the project root (or set these in your environment), follow `.env.example` to setup your `.env` file.

**Do not commit your `.env` file**

## Install dependencies

From the `backend` directory:

```bash
npm install
```

## Migrations & Seeders

This project includes seeders under `backend/seeders`. If you use `sequelize-cli` you can run seeders like:

```bash
# Migrate to Azure
npx sequelize db:migrate --config ./config/config.cjs --env development

# Seed to Azure
npx sequelize db:seed:all --config ./config/config.cjs --env development
```

(Adjust the command to match your sequelize-cli configuration if necessary.)

If you don't use `sequelize-cli` directly, you can also run the seed scripts programmatically or via a small node script.

## Start the server (development)

There is no `start` script in `package.json` by default. You can run the server directly:

```bash
# from backend/
node app.js

# or during development with nodemon if installed
npx nodemon app.js
```

The server prints the URL it is running on (e.g. <http://127.0.0.1:4000>).

## API endpoints (summary)

Check out the Swagger UI more info on the APIs

## Notes & troubleshooting

- Ensure your MySQL server is running and accessible with the env vars provided.
- If migrations or seeding fail, verify table names and column constraints match the defined models.
- For production, ensure `JWT_SECRET` is a strong secret and do not commit `.env` to source control.
