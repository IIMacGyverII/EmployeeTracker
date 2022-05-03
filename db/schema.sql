DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
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
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  manager_id INT,
  FOREIGN KEY (roles_id)
  REFERENCES roles(id)
  ON DELETE
  SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE
  SET NULL
);




INSERT INTO departments (name)
VALUES ("Managment"),
       ("Sales"),
       ("Engineering");

INSERT INTO roles (title, salary, departments_id)
VALUES ("President", 100000.00, 1),
       ("VP", 80000.00, 1),
       ("Sales", 60000.00, 2),
       ("Managment", 50000.00, 1),
       ("Engineer", 40000.00, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Smith President", 1, 1),
      ("Jane", "Smith VP Sales", 2, 1),
      ("Michael", "Fritz Sales Manager", 3, 2),
      ("Melissa", "Doug Sales", 3, 3),
      ("Mark", "Kana Head of Engineering", 3, 1),
      ("Eddy", "Eagle Engineer", 4, 4);


SELECT *
FROM employees