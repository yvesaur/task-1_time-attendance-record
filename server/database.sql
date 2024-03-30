CREATE DATABASE attendance_record;

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    department VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL
);

CREATE TABLE time_history (
    time_history_id INT PRIMARY KEY,
    user_id INT,
    date DATE NOT NULL,
    time_in TIME,
    time_out TIME,
    computer VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);