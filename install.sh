#!/bin/bash

# Installing NodeJS and NPM

echo "Fetching nvm..."

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

chmod +x ~/.nvm/nvm.sh

source ~/.nvm/nvm.sh

echo "Installing node..."

nvm install 12.20.1

npm install -g npm@6.14.8

echo "Installed! 🎉"

node -v && npm -v

# Installing PostgreSQL and Setting User password

sudo apt-get update

sudo apt-get -y install postgresql postgresql-contrib

sudo service postgresql start

# Changing Password

sudo -u postgres psql -U postgres -d postgres -c "alter user postgres with password 'password';"

echo "Creating .env file..."

echo "PG_USER = postgres
PG_PASSWORD = password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = db_memes" > .env

# Creating DB

cat database/db_schema.sql | sudo -u postgres psql