CREATE DATABASE db_memes;

\c db_memes

CREATE TABLE tab_memes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(70),
    url VARCHAR(500),
    caption VARCHAR(200)
);