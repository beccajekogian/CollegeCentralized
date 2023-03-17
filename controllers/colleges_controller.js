const express = require('express'),
  router = express.Router();
  const uuidv4 = require("uuid/v4");

  const Student = require('../models/student_model');
  const College = require('../models/college_model');
  const Counselor = require('../models/counselor_model');

router.get('/colleges', function(request, response) {
    let colleges = College.getAllColleges();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("colleges", {
      data: colleges
    });
});

router.get('/colleges/:collegeName', function(request, response) {

    let collegeName = request.query.collegeName;

    let college = College.getCollege(collegeName);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("colleges/collegeDetails", {
      data: college
    });
});


router.get('/colleges/new', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("colleges/collegeCreate");
});

router.post('/colleges', function(request, response) {
    let collegeName = request.body.collegeName;
    let applicationTypes = request.body.collegeName;
    let edDueDate = request.body.edDueDate;
    let regDueDate = request.body.regDueDate;


    if(collegeName){
      College.createCollege(collgeName);
      response.redirect("/colleges/"+collegeName);
    }else{
      response.redirect('/error?code=400');
    }
});

//create supplement
router.get('/colleges/:collegeName/new', function(request, response) {
      let collegeName = request.params.collegeName;

      let college = College.getCollege(collegeName);

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("/colleges/createSupplement", {
        college: college
      });

  //  response.render("/colleges/"+collegeName+"/createSupplement"); // fix this
});

router.post('/colleges/:collegeName', function(request, response) {
    let collegeName = request.params.collegeName;
    let supplementID = uuidv4();
    let prompt = request.body.prompt;
    let wordMin =  request.body.wordMin;
    let wordMax =  request.body.wordMax;

    if(collegeName && supplementID && prompt && wordMin && wordMax){
      College.createSupplement(collegeName, supplementID, prompt, wordMin, wordMax);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/colleges/"+collegeName);
    }else{
      response.redirect('/error?code=400');
    }
});


module.exports = router;
