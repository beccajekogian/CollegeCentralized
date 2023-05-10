const express = require('express'),
  router = express.Router();
const axios = require('axios');
const Student = require('../models/student_model');
const College = require('../models/college_model');
const Counselor = require('../models/counselor_model');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const io = require( "socket.io" )();
const socketapi = {
    io: io
};

//const ExpressPeerServer = require(“peer”);

// const { ExpressPeerServer } = require(“peer”);
// const peerServer = ExpressPeerServer(server, {
// debug: true,
// });
// app.use(“/peerjs”, peerServer);



function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

io.on('connection', function(socket){
  userID = request.user._json.email;
  socket.on('join-room', function(roomID, userID){
    console.log("roomid: " + roomID)
      socket.join(roomID);
      socket.to(roomID).broadcast.emit('user-connected', userID);
    });
});

router.get('/students/videoChat', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
    let studentName = request.user._json.email;
    let counselorName = await Student.getCounselor(studentName)
    let roomID = uuidv4();
    console.log("hello " + roomID);
    Student.setRoomID(studentName, roomID);
    try {
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("student/rooms", {
        user: request.user,
        counselor: counselorName,
        studentName: studentName,
        permission: permission,
        roomID: roomID
    });
  }
    catch (err) {
         console.error(err);
      }
    } catch (err) {
           console.error(err);
      }

});


router.get('/students/videoChat/room', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  // let roomID = request.params.roomID;
  //let studentName = request.user._json.email;

  let roomID = await Student.getRoomID(studentName);

  try {
    let counselorName = await Student.getCounselor(studentName)
    let roomID = uuidv4();
    console.log("hello " + roomID);
    Student.setRoomID(studentName, roomID);
    try {
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("student/room", {
        user: request.user,
        counselor: counselorName,
        studentName: studentName,
        permission: permission,
        roomID: roomID
    });
  }
    catch (err) {
         console.error(err);
      }
    } catch (err) {
           console.error(err);
      }

});


router.get('/students', loggedIn, async function(request, response) {
  let permission = await Student.getPermissions(request.user._json.email)
  try {
    let studentName = request.user._json.email;

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
  } catch (err) {
         console.error(err);
      }
    } catch (err) {
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
    console.log("collegeName " + collegeName);

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
  console.log("collegeName " + collegeName);

  let supplements = await Student.getSupplements(studentName, collegeName);
  try {
  let permission = await Student.getPermissions(request.user._json.email)

  try{
    //console.log("nice " + supplements);
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
  console.log("collegeName " + collegeName);
  let supplementID = request.params.supplementID;
  let supplement = await Student.getSupplement(studentName, collegeName, supplementID);
  try {
  let permission = await Student.getPermissions(request.user._json.email)

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
  console.log("collegeName " + collegeName);

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
