const inquirer = require('inquirer');
const { default: Choice } = require('inquirer/lib/objects/choice');
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'camp',
    database: 'employee_db'
});

const firstQuestion = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Exit']
    }
];

const addDepartment = [
    {
        type: 'input',
        name: 'newDept',
        message: 'What is the Name of the Department you would like to add?'
    }
];

const newRole = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the Title of the Role you would like to add?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the Salary for this Role?'
    },
    {
        type: 'input',
        name: 'roleDept',
        message: 'What is the Deptartment ID for this Role?'
    }   
];

const newEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the First Name of the Employee?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the Last Name of the Employee?'
    },
    {
        type: 'input',
        name: 'roleId',
        message: 'What is the Role ID for this Employee?'
    },
    {
        type: 'input',
        name: 'managerId',
        message: `What is the ID for this Employee's Manager?`
    }
];

const updateEmployee = [
    {
        type: 'input',
        name: 'currentId',
        message: 'What is the ID for the Employee you would like to update?'
    },
    {
        type: 'input',
        name: 'newId',
        message: 'What is the ID for the new Role for this employee?'
    }
];

function firstChoice({options}) {

switch (options) {
    case 'View All Departments':
        viewDepts()               
        break;
    
    case 'View All Roles':
        viewRoles()
    
        break;
    
    case 'View All Employees':
         viewEmployees()
         break;
    
    case 'Add A Department':
        addDept()
        break;
    
    case 'Add A Role':
        addRole()
        break;
        
    case 'Add An Employee':
        addEmployee()
        break;
        
    case 'Update An Employee Role':
        updateRole()
        break;

    default:
        console.log('THIS IS NOT THE DATABASE YOU ARE LOOKING FOR! 🤖 ')
        break;
}

};

function viewDepts() {
    connection.query (
        `SELECT
            department.name AS 'Department',
            department.id AS 'Department ID'
        FROM
            department`,
        (err, results) => { 
            err
            ? console.log(err)
            : console.table(results)
            init();
        }
        
        );
       
}



function viewRoles()  {
    connection.query (
        `SELECT
            role.title AS 'Role Title',
            role.id AS 'Role ID',
            role.salary AS 'Salary',
            role.department_id AS 'Department ID'
        FROM
            role`,
        (err, results) => { 
            err
            ? console.log(err)
            : console.table(results)
            init();
        }

    );
}

function viewEmployees() {
    connection.query (
        `SELECT 
            employee.id AS 'Employee ID',
            employee.first_name AS 'First Name',
            employee.last_name AS 'Last Name',
            role.title AS 'Title',
            role.salary AS "Salary",
            role.department_id AS 'Department ID',
            department.name AS 'Department',
            employee.manager_id AS 'Manager ID',
            CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
        FROM
            employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id 
                LEFT JOIN employee manager ON manager.id = employee.manager_id`,
                

        (err, results) => { 
            err
            ? console.log(err)
            : console.table(results)
            init();
        }

    );
}

function addDept() {
    inquirer
    .prompt(addDepartment)
    .then((answers) =>{
        connection.query(
            `INSERT INTO department (name)
            VALUES(?)`, [answers.newDept],
            (err, results) => { 
                err
                ? console.log(err)
                : viewDepts();
            }
        );
    })
};

function addRole() {
    inquirer
    .prompt(newRole)
    .then((answers) =>{
        connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES(?, ?, ?)`, [answers.roleTitle, answers.roleSalary, answers.roleDept],
            (err, results) => { 
                err
                ? console.log(err)
                : viewRoles();
            }
        );
    })
};


function addEmployee() {
    inquirer
    .prompt(newEmployee)
    .then((answers) =>{
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES(?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
            (err, results) => { 
                err
                ? console.log(err)
                : viewEmployees();
            }
        );
    })
};

function updateRole() {
    inquirer
    .prompt(updateEmployee)
    .then((answers) =>{
        connection.query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
                [answers.newId, answers.currentId],
            (err, results) => { 
                err
                ? console.log(err)
                : viewEmployees();
            }
        );
    })
};

function init() {
    inquirer
    .prompt(firstQuestion)
        .then((answer) => {
            firstChoice(answer)
    });
}

init();

