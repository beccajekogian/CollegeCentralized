const fs = require('fs');

exports.getStudents = function(){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/student.json'));
  return students;
}


exports.getStudent = function(studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  return students[studentName];
}

exports.getPermissions = async function(name){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
  if (name.includes('2')){
    console.log("hello" + students[name].permission);
    return students[name].permission;
  } else return counselors[name].permission;
}

exports.getCollegeList = async function(studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let list = students[studentName]["collegeList"];

  let collegeArray = [];
  for (college in list){
    college.collegeName = college;
    collegeArray.push(list[college])
  }
  return collegeArray;
}

exports.getSupplements = async function(studentName, collegeName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let colleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  let supplements = students[studentName]["collegeList"][collegeName]["supplements"];

  return supplements;
}


exports.getSupplement = async function(studentName, collegeName, supplementID){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let supplement = students[studentName]["collegeList"][collegeName]["supplements"][supplementID];
  return supplement;
}

exports.addCollege = async function (studentName, collegeName, applicationType){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let colleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  let newCollege = {
    "collegeName": collegeName,
    "applicationType": applicationType,
    "dueDate": colleges[collegeName]["dueDates"][applicationType],
    "supplements": colleges[collegeName]["supplements"]
  }
  students[studentName]["collegeList"][collegeName] = newCollege;
  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
}

exports.getCounselor = async function (studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let counselor = students[studentName]["counselorEmail"];
  return counselor;
}

exports.updateSupplement = async function (studentName, collegeName, supplementID, supplementContent){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  students[studentName]["collegeList"][collegeName]["supplements"][supplementID]["content"] = supplementContent;

  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));

  return students[studentName]["collegeList"][collegeName]["supplements"][supplementID];
}

exports.setRoomID = function (studentName, roomID){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  students[studentName]["roomID"] = roomID;
  fs.writeFileSync(__dirname+'/../data/students.json', JSON.stringify(students));
}

exports.getRoomID = async function (studentName){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  let roomID = students[studentName]["roomID"];

  return roomID;
}
