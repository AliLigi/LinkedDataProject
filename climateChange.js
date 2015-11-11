var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var Emissions = JSON.parse(fs.readFileSync('Emissions.json','utf8'))
var temperature = JSON.parse(fs.readFileSync('temperature.json','utf8'))

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run('CREATE TABLE Emissions (Year,Sector,SulphurDioxide,NitrogenOxide,Ammonia,NonMethaneVolatileOrganicCompound,CarbonMonoxide,LowEmissions,HighEmissions )');
  
    var stmt = db.prepare('INSERT INTO Emissions (Year,Sector,SulphurDioxide,NitrogenOxide,Ammonia,NonMethaneVolatileOrganicCompound,CarbonMonoxide,LowEmissions,HighEmissions) VALUES (?,?,?,?,?,?,?,?,?)');
  for (var i = 0; i < Emissions.length; i++) {
      stmt.run(Emissions[i].Year
               , Emissions[i].Sector
               , Emissions[i]["SulphurDioxide"] 
               , Emissions[i]["NitrogenOxide"]
               , Emissions[i].Ammonia
               , Emissions[i]["NonMethaneVolatileOrganicCompound"]
               , Emissions[i]["CarbonMonoxide"]
               , Emissions[i]["LowEmissions"]
               , Emissions[i]["HighEmissions"]
              );
  }
      db.run('CREATE TABLE temperature (Year,Countys,AverageMaximumTemp,AverageMinimumTemp,MeanTemperature,HighestTemp,LowestTemp )');
  
    var stmt = db.prepare('INSERT INTO temperature (Year,Countys,AverageMaximumTemp,AverageMinimumTemp,MeanTemperature,HighestTemp,LowestTemp) VALUES (?,?,?,?,?,?,?)');
  for (var i = 0; i < temperature.length; i++) {
      stmt.run(temperature[i].Year
               , temperature[i].Countys
               , temperature[i]["AverageMaximumTemp"]
               , temperature[i]["AverageMinimumTemp"] 
               , temperature[i]["MeanTemperature"]
               , temperature[i]["HighestTemp"]
               , temperature[i]["LowestTemp"]
              );
  }
  stmt.finalize();
    

 db.each("SELECT * FROM Emissions.*, temperature.* FROM Emissions INNER JOIN temperature ON Emissions.Year = temperature.Year", function(err, row) {
      console.log(row.Year + ": " + row.Sector +row.Countys);
  });

});

db.close();

var app = express();
app.get('/', function(req, res) {
  res.send("This is the Emissions API.");
});
var app = express();
app.get('/', function(req, res) {
  res.send("This is the temperature API.");
});

var server = app.listen(8000);