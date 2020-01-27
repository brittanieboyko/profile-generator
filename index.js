const inquirer = require("inquirer");
const questions = [ 
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "list",
      name: "color",
      message: "What's your favorite color?",
      choices: ["blue","green","red","pink"]
    }
];

function promptUser() {
    return inquirer.prompt(questions);
}

function writeToFile(fileName, data) {
 
}

function init() {
    promptUser()
        .then(function(answers) {
            console.log(answers);
        })
        .catch(function(err) {
            console.log(err);
        });
}

init();
