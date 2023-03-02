const uuid = require('uuid');
const fs = require('fs');


exports.getAllColleges =  function() {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges;
}

exports.getCollege =  function(collegeName) {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges[collgeName];
}


exports.createCollege = function(collegeName){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  allColleges[collgeName] = {

  }

  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));
}

exports.createSupplement = function(collegeName, prompt, wordMin, wordMax){
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  let newSupplement = {
    "prompt": prompt,
    "wordMin": wordMin,
    "wordMax": wordMax
  }
  allColleges[collgeName].push(newSupplement);
  fs.writeFileSync(__dirname+'/../data/colleges.json', JSON.stringify(allColleges));

}
  
