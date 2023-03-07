const express = require('express'),
  router = express.Router();

const Student = require('../models/student_model');
const College = require('../models/college_model');
const Counselor = require('../models/counselor_model');


function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}


router.get('/students/:studentName', loggedIn, function(request, response) {
  let studentName = request.user;
    let list = Student.getCollegeList(student);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeList", {
      user: request.user,
      data: list
    });
});

router.get('/students/:studentName/new', loggedIn, function(request, response) {
  let studentName = request.user;
  let colleges = College.getAllColleges();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/newCollegeList", {
      user: request.user,

      data: colleges
    });
});

router.post('/students/:studentName', loggedIn, function(request, response) {
    let collegeName = request.body.collegeName;
    let studentName = request.user;

    let collegeList = Student.getCollegeList(studentName);

    if(collegeName){
      Student.addCollege(collgeName);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/student/"+studentName+"/collegeList"{
        user: request.user,
      });
    }else{
      response.redirect('/error?code=400');
    }
});

router.get('/students/:studentName/:collegeName/:supplementID/edit', loggedIn, function(request, response) {
  let studentName = request.user;
  let counselorName = request.query.counselorName;
  let studentName = request.query.studentName;
  let collegeName = request.query.collegeName;
  let supplementID = request.query.supplementID;
  let content = request.body.supplementContent;

    if(content){
      Student.updateSupplement(supplementID, content);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/students/"+studentName+ "/" +collegeName+ "/" + supplementID{
        user: request.user,

      });
    } else{
      response.redirect('/error?code=400');
    }
});

module.exports = router;
