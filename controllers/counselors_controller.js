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
    let counselorEmail = request.user._json.email;
    //if (!counselorName.includes("2")){
      let students = await Counselor.getStudents(counselorEmail);
      console.log("love"+ students);
      try{
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("counselor/studentsList", {
          user: request.user,
          students: students
        });
      }catch (err) {
             console.error(err);
          }
    //}

});

router.get('/counselors/:studentName', loggedIn, async function(request, response) {
    let counselorName = request.user._json.email;
    let studentName = request.params.studentName;

    let collgeList = await Student.getCollegeList(studentName);
    try{

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("counselor/studentDetails", {
      user: request.user,
      colleges: collgeList
    });
  }catch (err) {
         console.error(err);
      }
});

router.get('/counselors/:studentName/:collegeName', loggedIn, async function(request, response) {
  let counselorName = "rebecca.jekogian23@trinityschoolnyc.org";

  let studentName = request.params.studentName;
  let collegeName = request.params.collegeName;

  console.log(collegeName);
  let supplements = await College.getSupplements(collegeName);
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

router.get('/counselors/:studentName/:collegeName/:supplementID/edit', loggedIn, async function(request, response) {
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
