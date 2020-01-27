const inquirer = require("inquirer");
const fs = require("fs");
const gen = require("./generateHTML.js");

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
    fs.writeFile(fileName, data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("success");
    });

}

function init() {
    promptUser()
        .then(function(answers) {
            const html = gen.generateHTML(answers);
            writeToFile("hi.html", html)
            
        })
        .catch(function(err) {
            console.log(err);
        });
}

init();
