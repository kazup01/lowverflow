var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Question = models.Question;
var Answer = models.Answer;

/* GET home page. */
router.get('/', function(req, res, next) {
	Question.findAll()
		.then(function(Question){
			res.render('index', {
				title: 'lowverflow',
				Question: Question
			});
		})
});

module.exports = router;
