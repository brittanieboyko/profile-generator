const inquirer = require("inquirer");
const fs = require("fs");
const gen = require("./generateHTML.js");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


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
    return inquirer.prompt(questions)
}

function getGitHubData(response) {
    const queryUrl = `https://api.github.com/search/users?q=${response.username}`;
    console.log(color);
    axios.get(queryUrl)
    .then(function(result) {
        console.log("hey this worked");
     })
     .catch(err => {
         throw(err);
     })
}

function init() {

    promptUser()
    .then(function(answers) {
        const html = gen.generateHTML(answers);
        getGitHubData(answers)
        return  writeFileAsync("okay.html", html);
    })
    .catch(err => {
        throw(err);
    });
}

init();
