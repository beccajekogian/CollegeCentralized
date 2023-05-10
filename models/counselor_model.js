const fs = require('fs');

exports.getStudents = async function(counselorEmail){
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));

  for (student in students){
    let studentProfile = students[student];
    let studentName = students[student]["studentName"];
    if (students[student]["counselorEmail"] == counselorEmail){
      counselors[counselorEmail]["studentsList"][studentName] = studentProfile;
    }
  }
  return counselors[counselorEmail]["studentsList"];
}


exports.updateToDOList = async function (counselorName, studentName, collegeName, supplementID){
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  let supplement = students[studentName]["collegeList"][collegeName][supplementID];

  let newItem = {
    "studnetName": studentName,
    "collegeName": collegeName,
    "suplementID": supplementID,
    "suplementDetails": supplement,

    // "prompt": supplement.prompt,
    // "content": supplement.content,
    // "wordMin": supplement.wordMin,
    // "wordMax": supplement.wordMax,
    // "wordCount": supplement.wordCount,
    "dateReceived": new Date()
  }

  counselors[counselorName][toDoList][supplementID] = newItem;
  fs.writeFileSync(__dirname+'/../data/counselors.json', JSON.stringify(counselors));
}

exports.updateSupplement =  async function (supplementID, newContent){
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
  let students = JSON.parse(fs.readFileSync(__dirname+'/../data/students.json'));

  //only updating the essay on the counselor side. they have to send to the student and they can accept changes to make the changes
  counselors[counselorName]["toDoList"][supplementID]["content"] = newContent;
  fs.writeFileSync(__dirname+'/../data/counselors.json', JSON.stringify(counselors));
}

// exports.isPlayer = function(playerID){
//   let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
//   if(players[playerID] && players[playerID]["privileges"].indexOf("player")>=0) return true;
//   else return false;
// }

// exports.makeAdmin = function(counselorName){
//   let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
//   if(counselors[counselorName]) players[playerID]["privileges"].push("admin");
//   fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
// }

//only counselors can be admin
exports.isAdmin = function(name){
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
  if(counselors[name].privileges == 'admin') return true;
  if(counselors[name]) return true;
  else return false;
}

exports.makeAdmin = function(name){
  let counselors = JSON.parse(fs.readFileSync(__dirname+'/../data/counselors.json'));
  counselors[name].privileges = 'admin';
  fs.writeFileSync(__dirname+'/../data/counselors.json', JSON.stringify(counselors));
}


// exports.getPlayer = function(playerID){
//   let players = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
//
//   players[playerID].win_percent = (players[playerID].win/parseFloat(players[playerID].win+players[playerID].lose+players[playerID].tie) * 100).toFixed(2);
//   if(players[playerID].win_percent=="NaN") players[playerID].win_percent=0;
//
//   return players[playerID];
// }

//
// exports.createPlayer =  function (playerID, playerDisplayName){
//   let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
//   if(!allPlayers[playerID]){
//     let newPlayer={
//       "displayName": playerDisplayName,
//       "win": 0,
//       "lose": 0,
//       "tie": 0,
//       "privileges": ["player"],
//       "games": [],
//       "dateJoined": new Date()
//     }
//     allPlayers[playerID] = newPlayer;
//     fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
//   }
// }

//
// exports.removePlayer = function(playerID){
//   let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
//   if(allPlayers[playerID]) delete allPlayers[playerID];
//   fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
// }
//
// exports.addGame = function(playerID, results){
//   let allPlayers = JSON.parse(fs.readFileSync(__dirname+'/../data/players.json'));
//   if(allPlayers[playerID]){
//     if(results["outcome"]=="tie") allPlayers[playerID]["tie"]++;
//     else if(results["outcome"]=="player") allPlayers[playerID]["win"]++;
//     else allPlayers[playerID]["lose"]++;
//     allPlayers[playerID]["games"].push(results["gameID"]);
//   }
//   fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allPlayers));
// }
