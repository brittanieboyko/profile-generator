const inquirer = require("inquirer");
const fs = require("fs");
const gen = require("./generateHTML.js");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
let inquirerData = {};

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

function writeToFile(gitHubData) {
    const html = gen.generateHTML(inquirerData, gitHubData);
    return writeFileAsync("okay.html", html);
}

function populateProfile(data) {
    user = {
        name: data.items[0].login,
        profileImage: data.items[0].avatar_url,
        githubLink: data.items[0].html_url,
    }
    writeToFile(user);
}


function getGitHubData(response) {
    const queryUrl = `https://api.github.com/search/users?q=${response.username}`;
    axios.get(queryUrl)
    .then(function(result) {
        populateProfile(result.data);
     })
     .catch(err => {
         throw(err);
     })
}

function init() {

    promptUser()
    .then(function(answers) {
        inquirerData = answers;
        getGitHubData(inquirerData)
        
    })
    .catch(err => {
        throw(err);
    });
}

init();
