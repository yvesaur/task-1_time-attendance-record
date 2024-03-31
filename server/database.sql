CREATE DATABASE attendance_record;

CREATE TABLE
    users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        birthdate DATE NOT NULL,
        department VARCHAR(255) NOT NULL,
        project VARCHAR(255) NOT NULL
    );

CREATE TABLE
    attendance_records (
        time_history_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        date DATE NOT NULL,
        time_in TIME,
        time_out TIME,
        computer VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    );

SELECT
    user_id,
    username,
    first_name,
    last_name,
    birthdate,
    department,
    project
FROM
    users;

SELECT
    *
FROM
    attendance_records
WHERE
    DATE (date) = CURDATE ()
    AND user_id = ?
INSERT INTO
    attendance_records (user_id, date, time_in, time_out, computer)
VALUES
    (
        1,
        CURDATE (),
        '08:00:00',
        '17:00:00',
        'Computer1'
    ),
    (
        2,
        CURDATE (),
        '09:00:00',
        '18:00:00',
        'Computer2'
    ),
    (
        3,
        CURDATE (),
        '10:00:00',
        '19:00:00',
        'Computer3'
    );

UPDATE attendance_records
SET
    time_out = CURTIME ()
WHERE
    user_id = ?
    AND DATE (date) = CURDATE ()