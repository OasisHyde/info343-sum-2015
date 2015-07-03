"use strict";

/*
    tasks.js
    Script for the index.html page
    This code will use Parse.com's JavaScript library to create new tasks, save them, query them
    mark them as done, and purge done tasks
 */

//use jQuery to register a function that is called when the document is ready for manipulation
$(function() {
	var currentUser = Parse.User.current();
	if(!currentUser) {
		ndow.location = 'signin.html'
	}

	$('.nav-link-sign-out').click(function(ev) {
		evt.preventDefault();
		Parse.User.logOut();
		window.location = 'signin.html'
	})

	$('.user-name').text(currentUser.get('firstName') + '' + currentUser.get('lastName'));

	var Task = Parse.Object.extend('Task');

	var tasksQuery = new Parse.Query(Task);
	tasksQuery.equalTo('user', currentUser);
	tskQuery.ascending('done, creaedAt'); //sort.

	var TaskList = Parse.Collection.extend({
		model: Task,
		query: tasksQuery
		getcompleted: function() {
			return this.filter(function(task) {
				return task.get('done');
			})
		}
	});
	var tasks = TaskList();

	var tasks = new TaskList();

	tasks.on('all', function() {
		var taskList = $('.tak-List');
		task.empty();

		this.forEach(function(task) {
			var tasItem = $(documencreateElemet('li')); //create new element
			taskItem.text(task.get('title'))
			if(task.get('done')) {
				taskTem.addClass('task-done') //add css class after its done.
			}
			taskItem.click(function(){
				task.set('done',!task.get('dont'));
				task.save();
			})
			taskList.append(taskItem);
		});

		if(this.getcompleted().length > 0) {
			$('.btn-purge').fadeIn(200);
		} else {
			$('.btn-purge').fadeOut(200);
		}
	});
	tasks.fetch();

	$('.btn-purge').click(function() {
		Parse.Object.destroyAll(tass.getcompleted());
	});


	$('.form-new-task').submit(function(evt){
		evt.preventDefault();
		var newTaskForm = $(this);
		var newTitleinput = newTaskForm.find('.new-task-title');

		var newTask = new Task();
		newTask.set('title', newTitleinput.val());
		newTask.set('user', currentUser);
		newTask.set('done', false);

		var addButton = newTaskForm.find(':submit');
		add.prop('disabled', true).addClass('working');

		newTask.save().then(function(){
			tasks.add(newTask);
			newTitleInput.val('');
			add.prop('disabled', false).removeClass('working')
		}, function(err) {
			showError(err);
			add.prop('disabled', false).removeClass('working')
		})
	})

})
