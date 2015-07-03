"use strict";

/*
    signup.js
    Script for the signup.html page
    Handle the form submit and create a new Parse.User() for the new user account
 */

//use jQuery to register a function that is called when the document is ready for manipulation

$(function() {
	$('.form-signup').submit(function(evt){
 		evt.preventDefault(); //not let browser to submit the form
 		
 		var user = new parse.User();
 		user.set('username', $('#inputEmail').val()) //got the user name
 		user.set('password', $('#inputPassword').val())
 		user.set('firstName', $('#inputFName').val())
 		user.set('lastName', $('#inputLName').val())

 		user.signUp().then(function(){
 			window.location = 'index.html';
 		}, function(err) {
 			showError(err);
 		});
	});	
})