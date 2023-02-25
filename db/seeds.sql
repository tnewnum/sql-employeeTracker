-- Populates information into the department table 
INSERT INTO department (name)
    VALUES ('FrontEnd-Team');

INSERT INTO department (name)
    VALUES ('BackEnd-Team');

INSERT INTO department (name)
    VALUES ('Management');
    

-- Populates information into the role table
INSERT INTO role (title, salary, department_id)
    VALUES ('Front-End Devloper', 100000, 1);

INSERT INTO role (title, salary, department_id)
    VALUES ('Back-End Devloper', 125000, 2);

INSERT INTO role (title, salary, department_id)
    VALUES ('Manager', 150000, 3);


-- Populates information into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Tommy', 'Newnum', 3, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Cylde', 'Barrow', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Bonnie', 'Parker', 1, 1);