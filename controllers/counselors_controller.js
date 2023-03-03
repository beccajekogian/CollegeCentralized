const express = require('express'),
  router = express.Router();

  const Student = require('../models/student_model');
  const College = require('../models/college_model');
  const Counselor = require('../models/counselor_model');

//this  should be the counselor that  is logged in
router.get('/counselors/:counselorName', function(request, response) {
    let counselorName = request.query.counselorName;
    let students = Counselor.getStudents(counselorName);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentsList", {
      data: students
    });
});

router.get('/counselors/:counselorName/:studentName', function(request, response) {
    let counselorName = request.query.counselorName;
    let studentName = request.query.studentName;

    let collgeList = Students.getCollegeList(studentName);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentDetails", {
      data: collgeList
    });
});

router.get('/counselors/:counselorName/:studentName/collegeList/:collegeName', function(request, response) {
    let counselorName = request.query.counselorName;
    let studentName = request.query.studentName;
    let collegeName = request.query.collegeName;

    let supplements = Colleges.getSupplements(collegeName);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/collegeDetails", {
      data: supplements
    });
});

router.get('/counselors/:counselorName/:studentName/collegeList/:collegeName/:supplementID/edit', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("colleges/supplementDetails");
});

router.post('/counselors/:counselorName/:studentName/collegeList/:collegeName/:supplementID', function(request, response) {
  let counselorName = request.query.counselorName;
  let studentName = request.query.studentName;
  let collegeName = request.query.collegeName;
  let supplementID = request.query.supplementID;

    let content = request.body.supplementContent;

    if(content){
      Counselor.updateSupplement(supplementID, content);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/counselors/"+counselorName+ "/" +studentName+ "/collegeList/" +collegeName+ "/" + supplementID);
    } else{
      response.redirect('/error?code=400');
    }
});

module.exports = router;
