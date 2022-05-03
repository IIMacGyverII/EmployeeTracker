const { prompt } = require("inquirer");
const mysql = require('mysql2/promise');
let db;
  
awaitMySqlWithInquirer();

async function init(){
    db =await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'employee_db'
        },
        console.log(`Connected to the employee_db database.`)
      );


}
async function awaitMySqlWithInquirer(){
    await init()

    const [departments] =  await db.execute("select * from department")
    const [employees] =  await db.execute("select * from employee")    
    const [roles] =  await db.execute("select * from roles")

    // console.table(employees);
    
    await prompt([
      {
        type: "list",
        name: "firstChoice",
        message: "What would you like to do first?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
      },
    ])
  .then(function (responses) {
    if (responses.firstChoice === "View all departments") {
        console.table(departments)
        console.log("departments")
        return awaitMySqlWithInquirer()
        
    }
    else if (responses.firstChoice === "View all roles") {
      console.table(roles);
      console.log("departments")
      return awaitMySqlWithInquirer()
    }
    else if (responses.firstChoice === "View all employees") {
      console.table(employees);
      awaitMySqlWithInquirer()
    }
    else {
        console.log("4");
    }
    })
    
      //  const {department} = await prompt([{
      //           type: 'list',
      //           name: 'department',
      //           message: 'What Would you like to do?',
      //           choices: departments.map(department=> ({name:department.id + " "+ department.name, value: department}))
      //         }])
        
      //         console.log(department)

              
      //           /// write next sql statements here! you would do some sort of sql query after this
              
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






