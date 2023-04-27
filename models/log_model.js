var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/../data/logs.db');


const fs = require('fs');


exports.trackLogin = async function(userEmail){

  db.run("INSERT INTO log (id, user_id, eventType, description, timeVisited) VALUES (?,?,?,?,?)",
    1, userEmail, 'Login', 'wow', new Date(),

    function(err) {
      if (err) { throw err;}
    }
  );

}


exports.getAllLogins = async function(){
  db.serialize(() => {
    db.all("SELECT * FROM log WHERE eventType =?", "login", function(err){
      if(err){
        console.log(err);
      } else {
        return rows;
      }
    });
  });
  db.close();
}

exports.getUserLogs = async function(user_id){
  db.serialize(() => {
    db.all("SELECT * FROM log WHERE user_id =?", user_id, function(err){
      if(err){
        console.log(err);
      } else {
        return rows;
      }
    });
  });
  db.close();
}

exports.getDateLogs = async function(date){
  db.serialize(() => {
    db.all("SELECT * FROM log WHERE timeVisited =?", date, function(err){
      if(err){
        console.log(err);
      } else {
        return rows;
      }
    });
  });
  db.close();
}
