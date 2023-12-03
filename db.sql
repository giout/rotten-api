CREATE SCHEMA IF NOT EXISTS rotten;

CREATE TABLE IF NOT EXISTS media (
    film_id SERIAL,
    media_title TEXT NOT NULL,
    overview TEXT NOT NULL,
    adult BOOLEAN NOT NULL,
    original_language TEXT NOT NULL,
    release_date TIMESTAMP NOT NULL,
    is_tv BOOLEAN NOT NULL,
    poster_url TEXT NOT NULL,
    trailer_url TEXT NOT NULL,
    PRIMARY KEY(film_id)
);

CREATE TABLE IF NOT EXISTS genre (
    genre_id SERIAL,
    genre_title TEXT NOT NULL,
    PRIMARY KEY (genre_id)
);

CREATE TABLE IF NOT EXISTS media_genre (
    media_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (media_id, genre_id),
    FOREIGN KEY media_id REFERENCES media (media_id) ON DELETE CASCADE,
    FOREIGN KEY genre_id REFERENCES genre (genre_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    pass TEXT NOT NULL,
    is_critic BOOLEAN NOT NULL,
    UNIQUE (username),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL,
    user_id INTEGER NOT NULL,
    review_content TEXT NOT NULL,
    media_id INTEGER NOT NULL,
    review_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (review_id),
    FOREIGN KEY media_id REFERENCES media (media_id) ON DELETE CASCADE,
    FOREIGN KEY user_id REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL,
    user_id INTEGER NOT NULL,
    comment_content TEXT NOT NULL,
    review_id INTEGER NOT NULL,
    comment_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (comment_id),
    FOREIGN KEY review_id REFERENCES reviews (review_id) ON DELETE CASCADE,
    FOREIGN KEY user_id REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings (
    user_id INTEGER,
    media_id INTEGER,
    score NUMERIC NOT NULL,
    PRIMARY KEY (user_id, media_id)
);
