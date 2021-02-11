#!/bin/bash

# Installing NodeJS and NPM

echo "Fetching nvm..."

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

.~/.nvm/nvm.sh

echo "Installing node..."

nvm install node

echo "Installed! 🎉"

node -v && npm -v

# Installing PostgreSQL and Setting User password

sudo apt-get update

sudo apt-get install postgresql postgresql-contrib

service postgresql start

sudo -u postgres psql -U postgres -d postgres -c "alter user postgres with password 'password';"