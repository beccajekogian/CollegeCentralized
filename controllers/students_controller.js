const express = require('express'),
  router = express.Router();

  const Student = require('../models/student_model');
  const College = require('../models/college_model');
  const Counselor = require('../models/counselor_model');

router.get('/students/:studentName/collegeList', function(request, response) {
  let studentName = request.query.studentName;
    let list = Student.getCollegeList(student);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/colegeList", {
      data: list
    });
});

router.get('/games/:id', function(request, response) {
    let opponentName = request.query.opponent;
    let playerThrow = request.query.throw;

    if(Opponent.isOpponent(opponentName)){
      let results = Game.playGame(opponentName, playerThrow);
      Opponent.updateOpponent(opponentName, results["outcome"]);
      results["photo"] = Opponent.getOpponent(opponentName)["photo"];
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("game/results", {
        data: results
      });
    }else{
      response.redirect('/error?code=404');
    }
});

router.get('/games', function(request, response) {
  let gamesArray = Game.getSortedGames();

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("game/recentGames",{
    games: gamesArray
  });
});

module.exports = router;
