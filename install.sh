#!/bin/bash

# Installing NodeJS and NPM

echo "Fetching nvm..."

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

chmod +x ~/.nvm/nvm.sh

source ~/.nvm/nvm.sh

sleep 10

echo "Installing node..."

nvm install 12.20.1

npm install -g npm@6.14.8

echo "Installed! 🎉"

node -v && npm -v

# Installing PostgreSQL and Setting User password

sudo apt-get update

sudo apt-get install postgresql postgresql-contrib

service postgresql start

sudo -u postgres psql -U postgres -d postgres -c "alter user postgres with password 'password';"
