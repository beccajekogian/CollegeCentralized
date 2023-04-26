var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('example.db');


const fs = require('fs');


exports.trackLogin = async function(userEmail){
  db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3

  db.run("INSERT INTO log (id, user_id, eventType, description, timeVisited) VALUES (?,?,?,?,?)",
    1, userEmail, 'Login', 'wow', CURRENT_TIMESTAMP,
    function(err) {
      if (err) { throw err;}
    }
  );

}


exports.getAllLogs = async function(){

  db.serialize(() => {

    db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3

    db.all('SELECT * FROM log', function(err, rows){
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
    db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3
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
    db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3
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
