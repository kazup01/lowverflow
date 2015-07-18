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

/** POST TO QUESTION */
router.get('/question_post', function(req, res, next){
	Question.findAll()
		.then(function(Question){
			res.render('question_post',{
				title: 'Post To Question',
				Question: Question
			});
		});
});

router.post('/', function(req, res, next){
	Question.create({
		subject: req.body.subject,
		content: req.body.content
	})
		.then(function(Question){
			res.redirect('/')
		})
})

module.exports = router;