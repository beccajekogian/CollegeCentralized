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

exports.getCollegeList = async function(studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  //console.log("hey" + students[studentName]["collegeList"]);
  let list = students[studentName]["collegeList"];
  //console.log("wow " + students[studentName].collegeList)
  let collegeArray = [];
  for (college in list){
    //console.log("m" + college);
    college.collegeName = college;
    collegeArray.push(list[college])
  }
  //console.log(collegeArray);
  return collegeArray;
}

exports.getSupplementDetails = async function(studentName, collegeName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  // let colleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  console.log("yes" + students[studentName].collgeList);
  let supplements = students[studentName]["collegeList"][collegeName]["supplements"];
  for (supplement in supplements){
    console.log(supplement);
  }
  console.log(students[studentName]["collegeList"][collegeName]);
  //let supplements = students[studentName]["collegeList"][collegeName]["supplements"]
  console.log(supplements);
  return supplements;
}

exports.addCollege =  function (studentName, collegeName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let colleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));

  let newCollege={
    collegeName: colleges[collegeName][supplements],
  }
  students[studentName][collegeList][collegeName] = newCollege;
  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
  return students[studentName][collegeList];
}

exports.updateSupplements =  function (studentName, supplementIndex, supplementContent){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  students[studentName]["collegeList"][collegeName[supplementIndex]]["content"] = supplementContent;

  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
}
