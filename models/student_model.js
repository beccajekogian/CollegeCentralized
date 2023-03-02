const fs = require('fs');

exports.getStudents = function(){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/student.json'));
  return students;
}
//
// exports.isStudent = function(opponentName){
//   let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));
//   if(opponents[opponentName]) return true;
//   else return false;
// }
//
// exports.getSortedOpponents = function(){
//   let opponents = JSON.parse(fs.readFileSync(__dirname+'/../data/opponents.json'));
//   let opponentArray=[];
//
//   //create an array to use sort, and dynamically generate win percent
//   for(name in opponents){
//     opponents[name].win_percent = (opponents[name].win/parseFloat(opponents[name].win+opponents[name].lose+opponents[name].tie) * 100).toFixed(2);
//     if(opponents[name].win_percent=="NaN") opponents[name].win_percent=0;
//     opponentArray.push(opponents[name])
//   }
//   opponentArray.sort(function(a, b){
//     return parseFloat(b.win_percent)-parseFloat(a.win_percent);
//   })
//   return opponentArray;
// }

exports.getStudent = function(studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  return students[studentName];
}

exports.getCollegeList = function(studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  return students[studentName][collegeList];
}

exports.addCollege =  function (studentName, collegeName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let colleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));

  let newCollege={
    collegeName: colleges[collegeName][supplements],
  }
  students[studentName][collegeList][collegeName] = newCollege;
  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
}

exports.updateSupplements =  function (studentName, supplementIndex, supplementContent){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  students[studentName]["collegeList"][collegeName[supplementIndex]]["content"] = supplementContent;

  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
}
