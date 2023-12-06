CREATE SCHEMA IF NOT EXISTS rotten;

CREATE TABLE IF NOT EXISTS rotten.media (
    media_id SERIAL,
    media_title TEXT NOT NULL,
    overview TEXT NOT NULL,
    adult BOOLEAN NOT NULL,
    original_language TEXT NOT NULL,
    release_date TIMESTAMP NOT NULL,
    is_tv BOOLEAN NOT NULL,
    poster_url TEXT,
    trailer_url TEXT,
    api_id INTEGER NOT NULL,
    UNIQUE (api_id),
    PRIMARY KEY(media_id)
);

CREATE TABLE IF NOT EXISTS rotten.genres (
    genre_id SERIAL,
    genre_title TEXT NOT NULL,
    PRIMARY KEY (genre_id)
);

CREATE TABLE IF NOT EXISTS rotten.media_genre (
    media_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (media_id, genre_id),
    FOREIGN KEY (media_id) REFERENCES rotten.media (media_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES rotten.genre (genre_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rotten.users (
    user_id SERIAL,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    pass TEXT NOT NULL,
    is_critic BOOLEAN NOT NULL,
    UNIQUE (username),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS rotten.reviews (
    review_id SERIAL,
    user_id INTEGER NOT NULL,
    review_content TEXT NOT NULL,
    media_id INTEGER NOT NULL,
    review_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (review_id),
    FOREIGN KEY (media_id) REFERENCES rotten.media (media_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES rotten.users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rotten.comments (
    comment_id SERIAL,
    user_id INTEGER NOT NULL,
    comment_content TEXT NOT NULL,
    review_id INTEGER NOT NULL,
    comment_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (review_id) REFERENCES rotten.reviews (review_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES rotten.users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rotten.ratings (
    user_id INTEGER,
    media_id INTEGER,
    score NUMERIC NOT NULL,
    PRIMARY KEY (user_id, media_id),
    FOREIGN KEY (media_id) REFERENCES rotten.media (media_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES rotten.users (user_id) ON DELETE CASCADE
);