#!/bin/bash

# cd src/backend

# Starting up Database

sudo service postgresql start

# Installing dependancies and Launching Server

source ~/.nvm/nvm.sh

npm install

npm start