DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE
  SET NULL
);

CREATE TABLE employee (
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
  REFERENCES employee(id)
  ON DELETE
  SET NULL
);

INSERT INTO department (name)
VALUES ("Managment"),
       ("Sales"),
       ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("President", 100000.00, 1),
       ("VP", 80000.00, 1),
       ("Sales", 60000.00, 2),
       ("Managment", 50000.00, 1),
       ("Engineer", 40000.00, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Smith", 1, 1),
      ("Jane", "Smith", 2, 1),
      ("Michael", "Fritz", 3, 2),
      ("Melissa", "Doug", 3, 3),
      ("Mark", "Kana", 3, 1),
      ("Eddy", "Eagle", 4, 4);


