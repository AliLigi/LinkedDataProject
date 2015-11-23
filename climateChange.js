//Things required to make the API work.
//======================================================================
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var prompt = require('prompt');
//var bodyparser = require('body-parser');
//======================================================================

//Reading the .json files.
//======================================================================
var Emissions = JSON.parse(fs.readFileSync('Emissions.json','utf8'))
var temperature = JSON.parse(fs.readFileSync('temperature.json','utf8'))
//======================================================================

//Creating the database.
//======================================================================
var db = new sqlite3.Database(':memory:');
db.serialize(function() {
//======================================================================
	
// Creating the table for my first database.
//Inserting the information from the dataset into the table.
//======================================================================================================================================
    db.run('CREATE TABLE Emissions (Countys,Sector,SulphurDioxide,NitrogenOxide,Ammonia,NonMethaneVolatileOrganicCompound,CarbonMonoxide,LowEmissions,HighEmissions )');
  
    var stmt = db.prepare('INSERT INTO Emissions (Countys,Sector,SulphurDioxide,NitrogenOxide,Ammonia,NonMethaneVolatileOrganicCompound,CarbonMonoxide,LowEmissions,HighEmissions) VALUES (?,?,?,?,?,?,?,?,?)');
  for (var i = 0; i < Emissions.length; i++) {
      stmt.run(Emissions[i].Countys
               , Emissions[i].Sector
               , Emissions[i].SulphurDioxide
               , Emissions[i].NitrogenOxide
               , Emissions[i].Ammonia
               , Emissions[i].NonMethaneVolatileOrganicCompound
               , Emissions[i].CarbonMonoxide
               , Emissions[i].LowEmissions
               , Emissions[i].HighEmissions
              );
  }
 //======================================================================================================================================   
// Creating the table for my second database.
//Inserting the information from the dataset into the table.
//==============================================================================================================================================
      db.run('CREATE TABLE temperature (Countys,AverageMaximumTemp,AverageMinimumTemp,MeanTemperature,HighestTemp,LowestTemp )');
  
    var stmt = db.prepare('INSERT INTO temperature (Countys,AverageMaximumTemp,AverageMinimumTemp,MeanTemperature,HighestTemp,LowestTemp) VALUES (?,?,?,?,?,?)');
  for (var i = 0; i < temperature.length; i++) {
      stmt.run(temperature[i].Countys
               , temperature[i].AverageMaximumTemp
               , temperature[i].AverageMinimumTemp
               , temperature[i].MeanTemperature
               , temperature[i].HighestTemp
               , temperature[i].LowestTemp
              );
  }
  stmt.finalize();
//====================================================================================================================================
//Since the update and the insert dont make scense in this api I decided to only add a Delete statement


prompt.start();
menu();
function menu(){
console.log("Welcome to this Climate Change API.Press->1 to  Delete");  
	prompt.get(['choice'], function(err, result){
    if (result.choice == 1) {
      newDelete();    //  For deleting the Emissions Table
    }
});
}
function newDelete(){
  console.log("Delete from the Emissions table ->Press 1. Delete from Temperature table ->Press 2.");
  prompt.get(['choice'], function(err, result){
    if (result.choice == 1) {
      delEmissions();    //  For deleting the Emissions Table
    }
    else if (result.choice == 2) {
      delTemperature();     // For deleting the Temperature Table
    }
  });
}
function delEmissions(){
  console.log("Which Countys you want to delete from the Emissions table?");
  prompt.get(['Countys'], function(err, result){
    if (err) { return onErr(err); }
    db.serialize(function(){
      db.each('DELETE FROM Emissions WHERE Countys LIKE "' + result.Countys + '"',  function(err, row){    // delete all data from Emissions.
      })
    })
    menu();
  });
}

function delTemperature(){
  console.log("Which Countys you want to delete from the temperature table?");
  prompt.get(['County'], function(err, result){
    if (err) { return onErr(err); }
    db.serialize(function(){
      db.each('DELETE FROM temperature WHERE Countys LIKE "' + result.Countys + '"',  function(err, row){     // delete all data from temperature.
      })
    })
  });
  menu();
}
function onErr(err){
  console.log(err);
  menu();
}

   
//Here i am creating inner joins to join the data from the two datasets.
// My statement is long bevause there is alot of data to be seen from the datasets.
//Tests table and console.

 db.each("SELECT Emissions.*, temperature.* FROM Emissions INNER JOIN temperature ON Emissions.Countys = temperature.Countys", function(err, row) {
      console.log("In " + row.Countys + " due to the SulphurDioxide level: " + row.SulphurDioxide + " , NitrogenOxide level: " + row.NitrogenOxide + " , the Ammonia level: " +row.Ammonia + " , theNonMethaneVolatileOrganicCompound level: " +row.NonMethaneVolatileOrganicCompound + " , the CarbonMonoxide level: " + row.CarbonMonoxide + " , the LowEmissions level: " +row.LowEmissions + " and the HighEmisions level: " + row.HighEmissions + " the AverageMaximumTemp is: " + row.AverageMaximumTemp + " , the AverageMinimumTemp is: " + row.AverageMinimumTemp + " , the MeanTemperature  is:" + row.MeanTemperature + " , the HighestTemp is: " + row.HighestTemp + " and the LowestTemp is: " + row.LowestTemp );
  });

});
//===============================================================================================================================================
//  Trying to push my data on to the browser at this stage
// This basically selects the data from the First database and pushes it on the browser 
//===============================================================================================================================================
var posts = [];
db.serialize(function() {
    db.each("SELECT * FROM Emissions", function(err, row) {
        posts.push({Countys: row.Countys, Sector: row.Sector, SulphurDioxide: row.SulphurDioxide, NitrogenOxide: row.NitrogenOxide, Ammonia: row.Ammonia, NonMethaneVolatileOrganicCompound: row.NonMethaneVolatileOrganicCompound, CarbonMonoxide: row.CarbonMonoxide, LowEmissions: row.LowEmissions, HighEmissions: row.HighEmissions})
    }, function() {
    })
})
//====================================================================================================================================

//db.close();
var app = express();
//====================================================================================================================================

//push to browser 
app.get('/', function(req, res) {
  res.send(posts);
});

app.get('/accessTemperature', function(req, res){
	res.send(temperature);
});


//====================================================================================================================================
var server = app.listen(8000);