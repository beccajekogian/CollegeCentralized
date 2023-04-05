const uuid = require('uuid');
const fs = require('fs');


exports.getAllColleges =  async function() {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges;
}

exports.getCollege =  async function(collegeName) {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges[collegeName];
}

exports.createCollege = async function(collegeName, applicationTypes, edDueDate, regDueDate){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  let newCollege = {
    "collegeName": collegeName,
    "applicationTypes": applicationTypes,
    "dueDates": {
      "ED":edDueDate,
      "reg": regDueDate
    }
  }
  allColleges[collegeName] = newCollege;

  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));
}

exports.createSupplement = async function(collegeName, supplementID, prompt, wordMin, wordMax){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));

  let newSupplement = {
    "prompt": prompt,
    "wordMin": wordMin,
    "wordMax": wordMax
  }

  allColleges[collegeName]["supplements"][supplementID] = newSupplement;
  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));
}


exports.getSupplements = async function(collegeName){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  console.log("good" + collegeName);
  return allColleges[collegeName]["supplements"];
}
