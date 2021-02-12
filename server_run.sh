#!/bin/bash

# cd src/backend

# Setting up Database

echo "Creating .env file..."

echo "PG_USER = postgres
PG_PASSWORD = password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = db_memes" > .env

cat database/db_schema.sql | sudo -u postgres psql

# Installing dependancies and Launching Server

source ~/.nvm/nvm.sh

npm install

npm start