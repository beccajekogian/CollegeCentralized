const express = require('express'),
  router = express.Router();
  const { v4: uuidv4 } = require('uuid');
  uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
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


router.get('/colleges', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
    let colleges = await College.getAllColleges();
    try {
      console.log(colleges);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("college/colleges", {
        colleges: colleges,
        user: request.user,
        permission: permission
      });
    } catch (err) {
           console.error(err);
    }
  } catch (err) {
           console.error(err);
    }

});

router.get('/colleges/college/:collegeName', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
    let collegeName = request.params.collegeName;

    console.log("i love how this works "+ collegeName);

    let college = await College.getCollege(collegeName);
    let permission = await Student.getPermissions(request.user._json.email)

    try{
      console.log("amazing " + college);

      let supplements = await College.getSupplements(collegeName);
      try{
        console.log("hey there " + supplements);
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("college/collegeDetails", {
          data: college,
          user: request.user,
          supplements: supplements,
          permission:permission
        });
      } catch (err) {
             console.error(err);
      }

    } catch (err) {
           console.error(err);
    }
  } catch (err) {
         console.error(err);
  }

});


router.get('/colleges/new', loggedIn, async function(request, response) {

  let permission = await Student.getPermissions(request.user._json.email)
  try {
    console.log("you are good");
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("college/createCollege",{
      user: request.user,
      permission: permission
    });
  }
  catch (err) {
         console.error(err);
  }
});

router.post('/colleges', function(request, response) {
    let collegeName = request.body.collegeName;

    if(collegeName){
      College.createCollege(collegeName);
      response.redirect("/colleges");
    }else{
      response.redirect('/error?code=400');
    }
});

//create supplement
router.get('/colleges/supplement/new', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
      let colleges = await College.getAllColleges();

      try{
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("college/createSupplement", {
          data: colleges,
          user: request.user,
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


  //  response.render("/colleges/"+collegeName+"/createSupplement"); // fix this
});

router.post('/colleges/supplement/new', loggedIn, async function(request, response) {
    let collegeName = request.body.collegeName;
    let supplementID = uuidv4();
    let prompt = request.body.prompt;
    let wordMin =  request.body.wordMin;
    let wordMax =  request.body.wordMax;
    let permission = await Student.getPermissions(request.user._json.email)
    try {

    if(collegeName && supplementID && prompt && wordMin && wordMax){
      College.createSupplement(collegeName, supplementID, prompt, wordMin, wordMax);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/colleges/college/"+collegeName);
    }else{
      response.redirect('/error?code=400');
    }
  }
  catch (err) {
         console.error(err);
  }
});


module.exports = router;
