const uuid = require('uuid');
const fs = require('fs');


exports.getAllColleges =  async function() {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges;
}

exports.getCollege =  function(collegeName) {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges[collgeName];
}

exports.createCollege = function(collegeName, applicationTypes, edDueDate, regDueDate){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  allColleges[collgeName] = {
    "collegeName": collegeName,
    "applicationTypes": applicationTypes,
    "dueDates": {
      "ED":edDueDate,
      "reg": regDueDate
    }
  }

  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));
}

exports.createSupplement = function(collegeName, supplementID, prompt, wordMin, wordMax){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  let newSupplement = {
    "prompt": prompt,
    "wordMin": wordMin,
    "wordMax": wordMax
  }
  allColleges[collgeName]["supplements"][supplementID] = newSupplement;
  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));
}


exports.getSupplements = function(collegeName){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges[collgeName]["supplements"];
}
