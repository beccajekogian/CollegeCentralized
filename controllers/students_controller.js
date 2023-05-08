const express = require('express'),
  router = express.Router();
const axios = require('axios');
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
  let permission = await Student.getPermissions(request.user._json.email)
  try {
    let studentName = request.user._json.email;
  let permission = await Student.getPermissions(request.user._json.email)

  let theTime;
  try {
     const resp = await axios.get('http://worldtimeapi.org/api/timezone/America/New_York');
     let time = resp["data"]["datetime"];
      theTime = time;
   }
  catch (err) {
      console.error(err);
      time = "";
   }
  let list = await Student.getCollegeList(studentName);
  try{
    //console.log("yes " + list[0]["collegeName"]);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeList", {
      user: request.user,
      colleges: list,
      time: theTime,
      permission: permission
    });
  }
  catch (err) {
         console.error(err);
      }
    }
    catch (err) {
           console.error(err);
        }
});

router.get('/students/new', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
  let studentName = request.user;
  let colleges = await College.getAllColleges();
  let permission = await Student.getPermissions(request.user._json.email)

  try {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/newCollegeList", {
      user: request.user,
      data: colleges,
      permission: permission
  });
  }
  catch (err) {
       console.error(err);
  }
}
catch (err) {
     console.error(err);
}
});

router.post('/students', loggedIn, async function(request, response) {
    let collegeName = request.body.collegeName;
    let studentName = request.user._json.email;
    let applicationType = request.body.applicationType;
    let permission = await Student.getPermissions(request.user._json.email)
    try {
    if(collegeName){
      await Student.addCollege(studentName, collegeName, applicationType);

      try {
        let newCollegeList = await Student.getCollegeList(studentName);
        try{
          //response.status(200);
          //response.setHeader('Content-Type', 'text/html')
          response.redirect("/students");
        }catch (err) {
               console.error(err);
            }

        } catch (err) {
           console.error(err);
        }
    } else{
      response.redirect('/error?code=400');
    }
  } catch (err) {
     console.error(err);
  }
});


router.get('/students/:collegeName', loggedIn, async function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplements = await Student.getSupplements(studentName, collegeName);
  let permission = await Student.getPermissions(request.user._json.email)
  try {
  try{
    console.log("nice " + supplements);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/collegeDetails", {
      user: request.user,
      supplements: supplements,
      college: collegeName,
      permission: permission
    });
  }
  catch (err) {
         console.error(err);
      }

    } catch (err) {
       console.error(err);
    }
});

//fix this and one below
router.get('/students/:collegeName/:supplementID/edit', loggedIn, async function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplementID = request.params.supplementID;
  let supplement = await Student.getSupplement(studentName, collegeName, supplementID);
  let permission = await Student.getPermissions(request.user._json.email)
  try {
  //console.log("hello " + supplement);

  try{
    console.log("holy  " + supplement);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/supplementDetails", {
      user: request.user,
      supplement: supplement,
      college: collegeName,
      permission: permission
    });
  }
  catch (err) {
         console.error(err);
  }
}
catch (err) {
       console.error(err);
}

});

router.post('/students/:collegeName/:supplementID', loggedIn, async function(request, response) {
  let studentName = request.user._json.email;
  let collegeName = request.params.collegeName;
  let supplementID = request.params.supplementID;
  let content = request.body.content;
  let permission = await Student.getPermissions(request.user._json.email)
  try {

  //  if(content){
      let supplement = await Student.updateSupplement(studentName, collegeName, supplementID, content);
      try {
        response.redirect("/students/" + collegeName + "/" + supplementID + "/edit");
      }
      catch (err) {
             console.error(err);
      }
    }
    catch (err) {
           console.error(err);
    }

    // } else{
    //   response.redirect('/error?code=400');
    // }
});


module.exports = router;
