# LinkedDataProject
**by Alina Danci **

## Introduction
My aim is:
To create an API that will have easy functionality. Design a set of URLs which will be useful for querying the datasets.
Users I imagine using the API: 
People that are interested in Global warming.
Science teachers and students.

##  Datasets used
I have chosen my Datasets from the CSO website.
My first dataset is on the emissions on the air by year, and the second dataset is on the temperature/climate.
I used these datasets because they relate to each other and they are broken down nicely.
These datasets contain statistics on climate and emissions on air.
-Update on the Datasets- the temperature dataset was change a couple of times in order to get it to work for my API. 

## Functionality 
The API should be able to query the two datasets.
The API should come with URLs which will make it easier on the user to find data.
The API should order the county and display the Emissions and the tempeature in that County.
-when you will go on '/' this will show you the posts that i am pulling in from the Emission Dtabase.
-When you go to '/accessTemperature' it will bring you on to the Temperature Database.
http://i.imgur.com/S5im1jA.jpg
![alt tag](hhttp://i.imgur.com/S5im1jA.jpg)

## Update 1
This week was a but of a struggle with trying to convert my cvs data to json.
I still have a little problem with the Temperature json file, but i will try my best to make it work.
I had to change the data a little to work with my API. 
I Also started to write the API but since there were some errors I decided to take it out for this commit.

## Update 2
Added the climateChange.js.
This file contains my first attempt at writing the api.-Here i added my first steps in creating the API. Here the API contained just the tables and a console line that read and pulled in information from the two databases.This was done by using Inner Joins.I have also spent more time on getting the temperature data to work better, its very hard to change due to the amount of items in it. The Api is not fully functioning at this stage.

## Update 3/4
Changed my dataset again due to the size of the data i couldnt se where i was going wrong therefore i decided to make the dataset only for one year and link the two datasets by the county.
I have now added new functionality, the client  can now go on the browser and they can pull information from the Emissions database and from the Temperature database.I am in the process of adding insert, update and delete statements.

## Update 5
In this update I decided to add just a delete statment since my databases are large and wouldnt make scense to add the insert and update. There was something with the prompt that wasnt working for me so i decided to comment out the code so that the API will compile and work till that stage. -This delete statement would allow the client to choose which database they want to delete from and it would allow the client to delete a county selected,-all the data from that county would be deleted. 


