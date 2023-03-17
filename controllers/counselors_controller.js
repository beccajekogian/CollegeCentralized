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

router.get('/counselors', loggedIn, async function(request, response) {
    let counselorName = request.user._json.email;
    //if (!counselorName.includes("2")){
      let students = await Counselor.getStudents(counselorName);
      try{
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("counselor/studentsList", {
          user: counselorName,
          students: students
        });
      }catch (err) {
             console.error(err);
          }
    //}

});

router.get('/counselors/:studentName', loggedIn, function(request, response) {
    let counselorName = request.user._json.email;
    let studentName = request.params.studentName;

    let collgeList = await Students.getCollegeList(studentName);
    try{

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentDetails", {
      user: counselorName,
      colleges: collgeList
    });
  }catch (err) {
         console.error(err);
      }
});

router.get('/counselors/:counselorName/:studentName/:collegeName', loggedIn, function(request, response) {
  let counselorName = request.user._json.email;
  let studentName = request.params.studentName;
  let collegeName = request.params.collegeName;

  let supplements = await Colleges.getSupplements(collegeName);
  try{
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/collegeDetails", {
      user: request.user,
      data: supplements

    });
  }catch (err) {
         console.error(err);
      }
});

router.get('/counselors/:studentName/:collegeName/:supplementID/edit', loggedIn, function(request, response) {
  let counselorName = request.user._json.email;
  let studentName = request.params.studentName;
  let collegeName = request.params.collegeName;
  let supplementID = request.params.supplementID;
  let supplement = await Student.getSupplement(studentName, collegeName, supplementID);

  try{
    console.log("holy  " + supplement);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/supplementDetails", {
      student: studentName,
      supplement: supplement,
      college: collegeName
    });
  }
  catch (err) {
         console.error(err);
  }
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
