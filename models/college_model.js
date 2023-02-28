const uuid = require('uuid');
const fs = require('fs');


exports.getAllColleges =  function() {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges;
}

exports.getGame =  function(collegeName) {
  let allColleges = JSON.parse(fs.readFileSync(__dirname+'/../data/colleges.json'));
  return allColleges[collgeName];
}
// 
// exports.addCollege =  function(opponent, playerThrow) {
//   let opponentThrowChoices=["Paper", "Rock", "Scissors"];
//   let opponentThrow = opponentThrowChoices[Math.floor(Math.random() * 3)];
//
//   if(playerThrow===opponentThrow){
//     outcome= "tie";
//   }else if(playerThrow==="Paper"){
//     if(opponentThrow=="Scissors") outcome= "opponent";
//     else outcome= "player";
//   }else if(playerThrow==="Scissors"){
//     if(opponentThrow=="Rock") outcome= "opponent";
//     else outcome= "player";
//   }else{
//     if(opponentThrow=="Paper") outcome= "opponent";
//     else outcome="player";
//   }
//   let allGames = JSON.parse(fs.readFileSync(__dirname+'/../data/games.json'));
//
//   let results={};
//   results["opponentName"]=opponent;
//   results["opponentThrow"]=opponentThrow;
//   results["playerThrow"]=playerThrow;
//   results["outcome"] = outcome;
//   results["date"] = new Date();
//
//   let newID = uuid.v1();
//   allGames[newID] = results;
//   results["gameID"] = newID;
//
//   fs.writeFileSync(__dirname+'/../data/games.json', JSON.stringify(allGames));
//
//   return results;
// }
