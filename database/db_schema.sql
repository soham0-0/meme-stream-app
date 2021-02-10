CREATE DATABASE db_memes;

CREATE TABLE tab_memes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(500),
    caption VARCHAR(200)
);