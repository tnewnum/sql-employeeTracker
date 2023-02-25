-- deletes database if exists
DROP DATABASE IF EXISTS employee_db;

-- creates database
CREATE DATABASE employee_db;

-- chooses the employee_db
USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY(department_id)
     REFERENCES department(id)
      ON DELETE SET NULL,
    PRIMARY KEY (id)
)

CREATE TABLE employee (
    id INT AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
     FOREIGN KEY(role_id)
      REFERENCES role(id)
       ON DELETE SET NULL,
    manager_id INT,
     FOREIGN KEY(manager_id)
      REFERENCES employee(id)
       ON DELETE SET NULL,
    PRIMARY KEY (id)
)