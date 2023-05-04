const express = require('express'),
  router = express.Router();
  const { v4: uuidv4 } = require('uuid');
  uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  const Student = require('../models/student_model');
  const College = require('../models/college_model');
  const Counselor = require('../models/counselor_model');
  //const Admin = require('../models/admin_model');
  const Admin = require('../models/log_model');

  function loggedIn(request, response, next) {
    if (request.user) {
      next();
    } else {
      response.redirect('/login');
    }
  }

router.get('/trackInfo', loggedIn, async function(request, response) {
  let adminName = request.user._json.email;

  if (Counselor.isAdmin(adminName) === true){
    console.log(adminName + "has acsess");
    let logins = await Admin.getAllLogins();
    console.log("hey "+ logins);

    try{
      console.log("there "+ logins);
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("admin/loginDetails", {
        user: request.user,
        logins: logins,
        permission: Student.getPermissions(request.user._json.email)
    });
  } catch (err) {
         console.error(err);
      }
  } else{
    console.error(err);
  }

});



module.exports = router;
