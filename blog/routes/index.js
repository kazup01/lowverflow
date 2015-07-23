var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Question = models.Question;
var Answer = models.Answer;
var Tag = models.Tag;
var Category = models.Category;

/** TOP */
router.get('/', function(req, res, next){
	Question.findAll()
		.then(function(question){
			res.render('index',{
				title: 'lawverflow',
				Question: question
			});
		});
});

/** ----------------------------- */

/** CREATE TO QUESTION */
router.get('/question/create', function(req, res, next){
	Question.findAll()
		.then(function (question) {
			res.render('question/create',{
				title: 'Post To Question',
				Question: question
			});
		})
})

router.post('/question/create', function(req, res, next){
	Question
		.create({
			subject: req.body.subject,
			content: req.body.content
		})
		.then(function(question){
			return new Promise(function (resolve, reject) {
				Category.findOne({name: req.body.categoryName})
				.then(function (category) {
					if (category == null) {
						return question.createCategory({name: req.body.categoryName})
					}
					return question.addCategory(category)
				})
				.then(function () {
					resolve(question)
				})
			})
		})
		.then(function(question){
			return new Promise(function (resolve, reject) {
				Tag.findOne({name: req.body.tagName})
				.then(function (tag) {
					if(tag == null) {
						return question.createTag({name: req.body.tagName})
					}
					return question.addTag(tag)
				})
				.then(function () {
					resolve(question)
				})
			})
		})
		.then(function(question){
			res.redirect('/')
		})
})

/** SHOW PARTS */
router.get('/question/:id', function(req, res){
	Question
		.findById(req.params.id, {
			include: [
				{ model: Answer }
			]
		})
		.then(function (question){
			res.render('question/part',{
				title: 'Question',
				Question: question
			})
		})
})

/** EDIT TO QUESTION */
router.get('/question/edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			res.render('question/edit', {
				title: 'Edit To Question',
				Question: question
			})
		})
})

router.post('/question/edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			question.update(req.body)
				.then(function(){
					res.redirect('/')
				})
		})
})

/** DELETE TO QUESTION */
router.get('/question/delete/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			question.destroy()
				.then(function(){
					res.redirect('/')
				})
		})
})

/** ----------------------------- */

/** ANSWER */
router.get('/question/:id/answer', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			res.render('answer/create', {
				title: 'Answer',
				Question: question
			})
		})
})

router.post('/question/:id/answer', function (req, res) {
	Question.findById(req.params.id)
		.then(function(question){
			return question.createAnswer({answer: req.body.answer})
		})
		.then(function () {
			res.redirect('/question/create')
		})
})


/** ----------------------------- */

/** REGISTER */
router.get('/register', function(req, res){
	User.findAll()
		.then(function(user){
			res.render('auth/register', {
				title: 'Register Form',
				User: user
			})
		})
})

router.post('/register', function(req, res){
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
		.then(function(user){
			res.redirect('/')
		})
})

/** ----------------------------- */

/** TAG */
router.get('/tag/create', function(req, res){
	Tag.findAll()
		.then(function(tag){
			res.render('tag/create', {
				title: 'Post To Tag',
				Tag: tag
			})
		})
})

router.post('/tag/create', function(req, res){
	Tag.create({
		tag: req.body.tag
	})
		.then(function(tag){
			res.redirect('/tag/create')
		})
})


/** ----------------------------- */

/** CATEGORY */
router.get('/category/create', function(req, res){
	Category.findAll()
		.then(function(category){
			res.render('category/create', {
				title: 'Post To Category',
				Category: category
			})
		})
})

router.post('/category/create', function(req, res){
	Category.create({
		category: req.body.category
	})
		.then(function(category){
			res.redirect('/category/create')
		})
})

/** ----------------------------- */

/** TAGQUESTION */



module.exports = router;