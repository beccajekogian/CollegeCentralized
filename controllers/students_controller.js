const express = require('express'),
  router = express.Router();

  const Student = require('../models/student_model');
  const College = require('../models/college_model');
  const Counselor = require('../models/counselor_model');

router.get('/students/:studentName/collegeList', function(request, response) {
  let studentName = request.query.studentName;
    let list = Student.getCollegeList(student);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeList", {
      data: list
    });
});

router.get('/students/:studentName/collegeList/new', function(request, response) {
  let studentName = request.query.studentName;
  let colleges = College.getAllColleges();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/newCollegeList", {
      data: colleges
    });
});

router.post('/students/:studentName/collegeList', function(request, response) {
    let collegeName = request.body.collegeName;
    let studentName = request.query.studentName;

    let collegeList = Student.getCollegeList(studentName);

    if(collegeName){
      Student.addCollege(collgeName);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/student/"+studentName+"/collegeList");
    }else{
      response.redirect('/error?code=400');
    }
});

router.get('/students/:studentName/:collegeName/:supplementID/edit', function(request, response) {
  let studentName = request.query.studentName;
  let counselorName = request.query.counselorName;
  let studentName = request.query.studentName;
  let collegeName = request.query.collegeName;
  let supplementID = request.query.supplementID;

  let content = request.body.supplementContent;

    if(content){
      Student.updateSupplement(supplementID, content);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/students/"+studentName+ "/" +collegeName+ "/" + supplementID);
    } else{
      response.redirect('/error?code=400');
    }
});

module.exports = router;