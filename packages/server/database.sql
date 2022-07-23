CREATE DATABASE login_system_boilerplate;

-- \c login_system_boilerplate

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(28) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    passhash VARCHAR(255) NOT NULL
);