const express = require('express'),
  router = express.Router();

const Student = require('../models/student_model');
const College = require('../models/college_model');
const Counselor = require('../models/counselor_model');

//this  should be the counselor that  is logged in
//
//
/*
  This is a function that allows us to avoid putting an
  if (loggedIn)... else (login)
  in every route. Instead, we include it as middleware and use
  next() to indicate that the next function in the chain of functions
  should be executed if the user is logged in
*/
function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/counselors/:counselorName', loggedIn, function(request, response) {
    let counselorName = request.query.counselorName;
    let students = Counselor.getStudents(counselorName);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentsList", {
      user: request.user,
      data: students
    });
});

router.get('/counselors/:counselorName/:studentName', loggedIn, function(request, response) {
    let counselorName = request.query.counselorName;
    let studentName = request.query.studentName;

    let collgeList = Students.getCollegeList(studentName);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentDetails", {
      user: request.user,
      data: collgeList
    });
});

router.get('/counselors/:counselorName/:studentName/collegeList/:collegeName', loggedIn, function(request, response) {
    let counselorName = request.query.counselorName;
    let studentName = request.query.studentName;
    let collegeName = request.query.collegeName;

    let supplements = Colleges.getSupplements(collegeName);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/collegeDetails", {
      user: request.user,
      data: supplements

    });
});

router.get('/counselors/:counselorName/:studentName/collegeList/:collegeName/:supplementID/edit', loggedIn, function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("colleges/supplementDetails");
});

router.post('/counselors/:counselorName/:studentName/collegeList/:collegeName/:supplementID', loggedIn, function(request, response) {
  let counselorName = request.query.counselorName;
  let studentName = request.query.studentName;
  let collegeName = request.query.collegeName;
  let supplementID = request.query.supplementID;

    let content = request.body.supplementContent;

    if(content){
      Counselor.updateSupplement(supplementID, content);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/counselors/"+counselorName+ "/" +studentName+ "/collegeList/" +collegeName+ "/" + supplementID,{
        user: request.user,
      });
    } else{
      response.redirect('/error?code=400');
    }
});

module.exports = router;
