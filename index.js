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
    return writeFileAsync("profile.html", html);
}

function populateProfile(data) {
    const starArray =  data.starred_url.split(",");
    const location = data.location;
    user = {
        name: data.login,
        profileImage: data.avatar_url,
        githubLink: data.html_url,
        location: location,
        locationLink: `https://www.google.com/maps?q=${location}`,
        blog: data.blog,
        bio: data.bio,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        stars: starArray.length
    }
    writeToFile(user);
}

function getGitHubData(response) {
    const queryUrl = `https://api.github.com/users/${response.username}`;
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
