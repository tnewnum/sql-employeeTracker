const inquirer = require('inquirer')
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
        message: 'What would you like to do first?',
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

const addRole = [
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

const addEmployee = [
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
        name: 'roleID',
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
        name: 'employeeId',
        message: 'What is the ID for the Employee you would like to update?'
    },
    {
        type: 'input',
        name: 'newRole',
        message: 'What is the ID for the new Role for this employee?'
    }
];


