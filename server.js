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
        // console.log("\x1b[33m%s\x1b[0m", "Log Message")
        // console.log('\x1b[36m%s\x1b[0m', 'I am cyan')
        
      );


}
async function mainMenuWithInquirer(){
    await init()

    const [departments] =  await db.execute("select * from department")
    const [employees] =  await db.execute("select * from employee")    
    const [roles] =  await db.execute("select * from roles")

    // console.table(employees);
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
        console.log(" ==============================")
        console.log("|           Departments        |")
        console.log(" ==============================")
        console.table(departments);
        return mainMenuWithInquirer()
        
    }
    else if (responses.firstChoice === "View All Roles") {
      console.log(" =======================================================")
      console.log("|                         Roles                         |")
      console.log(" =======================================================")
      console.table(roles);
      return mainMenuWithInquirer()
    }
    else if (responses.firstChoice === "View All Employees") {
      console.log(" ================================================================================")
      console.log("|                                    Employees                                   |")
      console.log(" ================================================================================")
      console.table(employees);
      return mainMenuWithInquirer()
    }
    else if (responses.firstChoice === "Add A Department") {
      addADepartment() 
    }
    else if (responses.firstChoice === "Add A Role") {
      addARole()
    }
    else if (responses.firstChoice === "Add A Employee") {
      addAEmployee()
    }
    else if (responses.firstChoice === "Update A Employee Role") {
      updateAEmployeeRole()
    }
    else {
        console.log("you've been dropped to limbo... please press ctrl-c to escape");
    }
    })
    
function addADepartment() {
  console.log("add a department test")
  return mainMenuWithInquirer()
}

function addARole() {
  console.log("add a role test")
  return mainMenuWithInquirer()
}

async function addAEmployee() {
  console.log("add a employee test")
  return mainMenuWithInquirer()
}

async function updateAEmployeeRole() {
  await init()

    const [employees] =  await db.execute("select * from employee")
    const [roles] =  await db.execute("select * from roles")

    console.table(employees);
    
       const response = await prompt([{
                type: 'list',
                name: 'employee',
                message: 'Which employees role would you like to update?',
                choices: employees.map(employee=> ({name:employee.first_name + " "+ employee.last_name, value: employee}))
              },
              {
                type: 'list',
                message: 'Choose Role',
                name: 'chooseRole',
                choices: roles.map(role=> ({name:role.id + ": "+ role.title, value: role}))
                },
              ])
              db.execute( `UPDATE employee SET roles_id =${response.chooseRole.id} WHERE id = ${response.employee.id}`)
              console.log(response)

              
                /// write next sql statements here! you would do some sort of sql query after this
              
    }

  console.log("update a employee role test")
  // return mainMenuWithInquirer()
}


async function awaitWithInquirerByItself(){
 
    
       const {size} = await prompt([{
                type: 'list',
                name: 'size',
                message: 'What size do you need?',
                choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro']
              }])
        
          console.log(size);
        
    }






