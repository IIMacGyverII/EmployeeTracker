DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  departments_id INT,
  FOREIGN KEY (departments_id)
  REFERENCES departments(id)
  ON DELETE
  SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (roles_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE
  SET NULL
);




INSERT INTO movies (id, movie_name)
VALUES (1, "The Fifth Element"),
       (2, "Saving Private Ryan"),
       (3, "The Count of Monte Cristo"),
       (4, "Dr. Stranglove"),
       (5, "Leathal Weapon");

INSERT INTO reviews (movie_id, review)
VALUES (1, "Awesome"),
       (2, "Sweet"),
       (3, "Cool"),
       (4, "Amazing"),
       (5, "Narly");

SELECT *
FROM movies
JOIN reviews ON movies.id = reviews.movies;