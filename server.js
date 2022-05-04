const { prompt } = require("inquirer");
const mysql = require('mysql2/promise');
let db;
  
mainMenuWithInquirer();

async function init(){
    db =await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'employee_db'
        },
        console.log(" ========================================="),
        console.log("\x1b[33m%s\x1b[0m",`| *Connected to the employee_db database* |`),
        console.log(" =========================================",),
      );


}
async function mainMenuWithInquirer(){
    await init()

        console.log(" ==================================================")
        console.log("|                     Main Menu                    |")
        console.log(" ==================================================")
    await prompt([
      {
        type: "list",
        name: "firstChoice",
        message: "What would you like to do first?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add A Employee", "Update A Employee Role"]
      },
    ])

  .then(function (responses) {
    if (responses.firstChoice === "View All Departments") {
      return viewDepartments()
        
    }
    else if (responses.firstChoice === "View All Roles") {
      return viewRoles()
    }
    else if (responses.firstChoice === "View All Employees") {
      return viewEmployees()
    }
    else if (responses.firstChoice === "Add A Department") {
      return addADepartment() 
    }
    else if (responses.firstChoice === "Add A Role") {
      return addARole()
    }
    else if (responses.firstChoice === "Add A Employee") {
      return addAEmployee()
    }
    else if (responses.firstChoice === "Update A Employee Role") {
      return updateAEmployeeRole()
    }
    else {
        console.log("you've been dropped to limbo... please press ctrl-c to escape");
    }
})
    
async function addADepartment() {
  await init()

    const [departments] =  await db.execute("select * from department")

    console.table(departments);
    
      const response = await prompt([
        {
          type: 'input',
          name: 'departmentTitle',
          message: 'What is the new department?',
        },
        ])
        db.execute(`INSERT INTO department (name)
                  VALUES ("${response.departmentTitle}");`)
        console.log(" ================================================="),
        console.log("\x1b[31m%s\x1b[0m",`| New department ${response.departmentTitle} has been added! |`),
        console.log(" ================================================="),
  viewDepartments()
}

async function addARole() {
  await init()

    const [roles] =  await db.execute("select * from roles")
    const [departments] =  await db.execute("select * from department")

    console.table(roles);
    
      const response = await prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'What is the new role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for the new role?',
        },
        {
          type: 'list',
          message: 'To what department does it belong to?',
          name: 'chooseDepartment',
          choices: departments.map(department=> ({name:department.name, value: department}))
          },
        ])
        db.execute(`INSERT INTO roles (title, salary, department_id)
                  VALUES ("${response.roleTitle}", "${response.salary}", ${response.chooseDepartment.id});`)
        console.log(" ==============================================================================================="),
        console.log("\x1b[31m%s\x1b[0m",`| New role (${response.roleTitle}) with a salary of $${response.salary} belonging to the ${response.chooseDepartment.name}(${response.chooseDepartment.id}) department has been added! |`),
        console.log(" ==============================================================================================="),
  viewRoles()
}

async function addAEmployee() {
  await init()

    const [employees] =  await db.execute("select * from employee")
    const [roles] =  await db.execute("select * from roles")

    console.table(employees);
    
      const response = await prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the employees first name?',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the employees last name?',
        },
        {
          type: 'list',
          message: 'Choose the employees Role',
          name: 'chooseRole',
          choices: roles.map(role=> ({name:role.id + ": "+ role.title, value: role}))
        },
        {
          type: 'list',
          message: 'Choose the employees manager',
          name: 'chooseManager',
          choices: employees.map(employee=> ({name:employee.first_name + " "+ employee.last_name, value: employee}))
        },
        ])
        db.execute(`INSERT INTO employee (first_name, last_name, roles_id, manager_id)
                    VALUES ("${response.firstName}", "${response.lastName}", ${response.chooseRole.id}, ${response.chooseManager.id});`)
        console.log(" ================================================="),
        console.log("\x1b[31m%s\x1b[0m",`| Employee ${response.firstName} ${response.lastName} with a role of ${response.chooseRole.id} has been added! |`),
        console.log(" ================================================="),
  viewEmployees();
}


async function updateAEmployeeRole() {
  await init()

    const [employees] =  await db.execute("select * from employee")
    const [roles] =  await db.execute("select * from roles")

    console.table(employees);
    
        const response = await prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Which employees role would you like to update?',
            choices: employees.map(employee=> ({name:employee.first_name + " "+ employee.last_name, value: employee}))
          },
          {
            type: 'list',
            message: 'What would you like their new role to be?',
            name: 'chooseRole',
            choices: roles.map(role=> ({name:role.id + ": "+ role.title, value: role}))
            },
          ])
          db.execute( `UPDATE employee SET roles_id =${response.chooseRole.id} WHERE id = ${response.employee.id}`)
          console.table(employees)
          console.log(" ================================================="),
          console.log("\x1b[31m%s\x1b[0m",`| Employee ${response.employee.first_name} ${response.employee.last_name}s role has been changed to ${response.chooseRole.id} |`),
          console.log(" ================================================="),
  viewEmployees()
}

async function viewRoles() {
  const [roles] =  await db.execute("select * from roles")
      console.log(" =======================================================")
      console.log("|                         Roles                         |")
      console.log(" =======================================================")
  console.table(roles)
  return mainMenuWithInquirer()
}

async function viewDepartments() {
  const [departments] =  await db.execute("select * from department")
  console.log(" ==============================")
  console.log("|           Departments        |")
  console.log(" ==============================")
  console.table(departments)
  return mainMenuWithInquirer()
}

async function viewEmployees() {
  const [employees] =  await db.execute("select * from employee")
  console.log(" ================================================================")
  console.log("|                            Employees                           |")
  console.log(" ================================================================")
  console.table(employees);
  return mainMenuWithInquirer()
}
}







