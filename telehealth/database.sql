CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  date TIMESTAMP NOT NULL,
  description TEXT
);
INSERT INTO users (username, password) VALUES
('alice', '$2a$10$hashedpassword1'),
('bob', '$2a$10$hashedpassword2');

INSERT INTO appointments (user_id, date, description) VALUES
(1, '2026-06-22 10:00:00', 'General Checkup'),
(2, '2026-06-23 14:00:00', 'Follow-up Consultation');

INSERT INTO prescriptions (user_id, doctor, medicine, notes) VALUES
(1, 'Dr. Smith', 'Paracetamol', 'Take twice daily'),
(2, 'Dr. Jones', 'Amoxicillin', 'Complete 7-day course');
