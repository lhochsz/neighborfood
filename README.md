# NeighborFood
A web app using MongoDB, Express and NodeJS that can be used to help reduce food waste and connect neighbors.

## Overview
Missing an ingredient to complete the perfect recipe?  A neighbor might have it.
Have some extra leftovers? A neighbor might want it.
NeighborFood helps to reduce food waste and connect neighbors along the way.
Post your extra food items on NeighborFood and browse what others have throughout the Atlanta community.

* Live site: [NeighborFood] (https://neighbor-food.herokuapp.com/)
* Github: [NeighborFood GitHub] (https://github.com/lhochsz/neighborfood)

For Project 2 for the Web Development Immersive at General Assembly Atlanta, I created a web app for users to enter in their leftovers and extra food items.  The items post to a neighborhood board seen by all users.  The users can contact eachother via email to set up a meeting location to exchange food.

The app includes two models - one for the fridge items and one for the users.  Each is referenced in the other model so that users are connected to their fridge items and the fridge items are connected to the user.
Routes connect everything.  They connect the models to the various views of the app.  There are multiple views, for both the pages involving the fridge items and for the user.

The major hurdle I faced was getting the photos to upload.  I went down a promising path with a middleware called Multer, but realized n development that Multer only allows for uploaded files to be saved to a disk, rather than uploaded back onto the website.
I plan to further explore using Amazon Web Services to get the in-app photo uploading working rather than directing the user to a site like Imgur.

## Technologies Used
* Languages - HTML, CSS, JavaScript, jQuery
* MEN Stack: MongoDB/Mongoose, Express, Node.js
* Design - Twitter Bootstrap, Google Fonts
* Sublime Text 3
* Heroku
* mLab
* Imgur (encouraged for this version with URL image loading)
* Middleware: Method-Override, Flash, Body Parser
* Passport
* Project Planning & User Stories: [Trello] (https://trello.com/b/NTBEA1NQ/neighborfood)
* Images from [here] (http://www.unsplash.com)

## Features
* User can add food items to their MyFridge tab
* User can add multiple pieces of information, including an amount, a photo, a meeting location, ingredients
* Users can update their items to reflect changes in the amount, neighborhood, photo, ingredients, and meeting location
* Users can delete their items once a neight claims it via email and picks it up
* All user fridge items post to Neighborhood board of all users' items
* User can sort/search Neighborhood food items by neighborhood or by keyword of the name of the food item
* Users can see the date/time when the food item was last updated so they know if the post is out of date
* User's first name and email autopopulates as contact info for each of the food items on the Neighborhood page
* User can update their name in their profile
* Responsive to Mobile and Computer screens

## Future Development
* User comments on Neighborhood tab
* In-app photo upload - current version includes photo upload through a URL only
* Pagination on Neighborhood tab
* Neighborhood tab organized by food-type categories
* User Wishlist for wanted items that posts to a separate section on the Neighborhood tab
* Sign-in through Facebook, Twitter and GitHub
* Google Maps API Integration for mapping of available items around Atlanta
* Create a list of neighborhood "friends" who the user frequently trades with
* User update their email and password in their profile
* Password checking

## Wireframes
![Homepage](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/index.JPG "Homepage")
![MyFridge](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/myfridge.JPG "MyFridge")
![New Fridge Item](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/new.JPG "New Fridge Item")
![Edit Fridge Item](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/edit.JPG "Edit Fridge Item")
![Show](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/show.JPG "Show Item")
![Neighborhood](https://github.com/lhochsz/neighborfood/blob/master/public/images/wireframes/neighborhood.JPG "Neighborhood")

