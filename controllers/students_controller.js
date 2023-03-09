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


router.get('/students', loggedIn, async function(request, response) {
  let studentName = request.user._json.email;
  console.log("HI " + studentName);

  let list = await Student.getCollegeList(studentName);
  try{
    console.log("yes " + list[0]["collegeName"]);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeList", {
      user: request.user,
      colleges: list
    });
  }
  catch (err) {
         console.error(err);
      }

});

router.get('/students/new', loggedIn, function(request, response) {
  let studentName = request.user;
  let colleges = College.getAllColleges();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/newCollegeList", {
      user: request.user,
      data: colleges
    });
});

router.post('/students', loggedIn, function(request, response) {
    let collegeName = request.body.collegeName;
    let studentName = request.user._json.email;
    let applicationPlan = request.body.applicationPlan;

    // let collegeList = Student.getCollegeList(studentName);

    if(collegeName && applicationPlan){
      let collegeList = Student.addCollege(collgeName);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/student/collegeList", {
        user: request.user,
      });
    }else{
      response.redirect('/error?code=400');
    }
});


router.get('/students/:collegeName', loggedIn, async function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplements = await Student.getSupplements(studentName, collegeName);

  try{
    console.log("nice " + supplements);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeDetails", {
      user: request.user,
      supplements: supplements,
      college: collegeName
    });
  }
  catch (err) {
         console.error(err);
      }
});

//fix this and one below
router.get('/students/:collegeName/:supplementID/edit', loggedIn, function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplementID = request.params.supplementID;
  let content = Student.getSupplement(studentName, collegeName, supplementID);

  if(content){
    Student.updateSupplement(supplementID, content);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect("/students/" + collegeName + "/" + supplementID,{
      user: request.user,

    });
  } else{
    response.redirect('/error?code=400');
  }
});

router.get('/students/:collegeName/:supplementID', loggedIn, function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplementID = request.params.supplementID;
  let content = request.body.supplementContent;

    if(content){
      Student.updateSupplement(supplementID, content);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/students/" + collegeName+ "/" + supplementID,{
        user: request.user,

      });
    } else{
      response.redirect('/error?code=400');
    }
});



module.exports = router;
