var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Question = models.Question;
var Answer = models.Answer;

/** TOP */
router.get('/', function(req, res, next){
	Question.findAll()
		.then(function(Question){
			res.render('index',{
				title: 'lowverflow',
				Question: Question
			});
		});
});

/** CREATE TO QUESTION */
router.get('/question_post', function(req, res, next){
	Question.findAll()
		.then(function(Question){
			res.render('question_post',{
				title: 'Post To Question',
				Question: Question
			});
		});
});

router.post('/question_post', function(req, res, next){
	Question.create({
		subject: req.body.subject,
		content: req.body.content
	})
		.then(function(Question){
			res.redirect('/')
		})
})

/** EDIT TO QUESTION */
router.get('/question_edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(Question){
			res.render('question_edit', {
				title: 'Edit To Question',
				Question: Question
			})
		})
})

router.post('/question_edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(Question){
			Question.update(req.body)
				.then(function(){
					res.redirect('/')
				})
		})
})

/** DELETE TO QUESTION */
router.get('/question_delete/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(Question){
			Question.destroy()
				.then(function(){
					res.redirect('/')
				})
		})
})

module.exports = router;
