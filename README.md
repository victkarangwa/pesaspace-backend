# pesaspace-backend
This is a system where a shareholder will deposit an e-Money , and  the system lend them and re-pay with some interest.

## Staging environment base URL
`https://pesaspace.herokuapp.com/api/v1/`

## Setting Up The Application in development environment

### I. Clone the Application

1. Open your terminal

2. Run `git clone https://github.com/victkarangwa/pesaspace-backend.git` OR [Download](https://github.com/victkarangwa/pesaspace-backend/archive/refs/heads/develop.zip) the project

### II. Setting up the environment

1. **Create** a `.env` file reflecting to `.env.example` file

2. Add the values to all environmental variables in `.env` file

3. Make sure you have PostgreSQL installed (You can download it [here](https://www.postgresql.org/download/))

### IV. Running the application

Open termin in the directory you clone the repo from:

1. Run `npm install` to install all dependencies

2. Using postgres, create database for both dev and testing environment. In your `.env`, database URL should be of this format:
   `DATABASE_DEV_URL=postgres://[user]:[password@[host]:[port/[db_name]`
   ex:
   `DATABASE_DEV_URL=postgres://postgres:123@localhost:5432/pesaspace_dev`

3. Run `npm run db:migrate` or `yarn db:migrate` to automatically create all necessary models

4. Run `npm run db:seed:dev` or `yarn db:seed:dev` to seed data in the database

5. Run `npm run dev-server` to start local development server. You can also simulate production server locally by running `npm start`

6. Open your postman and access `http://localhost:<:APPLICATION_PORT>` (by default, the port is `3000`) , if app is running correctly, you will get a response with a message:

   ```javascript
   {
      status: 200,
      message: "Pesa Space APIs"
   }

7. For more, please read [Pesa Space API documentation](https://documenter.getpostman.com/view/7772830/TzzEouXz)

   # Author :computer:

   [Victor KARANGWA](https://github.com/victkarangwa)