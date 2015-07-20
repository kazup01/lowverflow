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
		.then(function(Question){
			res.render('index',{
				title: 'lowverflow',
				Question: Question
			});
		});
});

/** ----------------------------- */

/** CREATE TO QUESTION */
router.get('/question_post', function(req, res, next){
	Question.findAll()
		.then(function(Question){
			res.render('question/question_post',{
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
			res.render('question/question_edit', {
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

/** ----------------------------- */

/** REGISTER */
router.get('/register', function(req, res){
	User.findAll()
		.then(function(User){
			res.render('auth/register', {
				title: 'Register Form',
				User: User
			})
		})
})

router.post('/register', function(req, res){
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
		.then(function(User){
			res.redirect('/')
		})
})

/** ----------------------------- */

/** TAG */
router.get('/tag_post', function(req, res){
	Tag.findAll()
		.then(function(Tag){
			res.render('tag/tag_post', {
				title: 'Post To Tag',
				Tag: Tag
			})
		})
})

router.post('/tag_post', function(req, res){
	Tag.create({
		tag: req.body.tag
	})
		.then(function(Tag){
			res.redirect('/')
		})
})

/** ----------------------------- */

/** CATEGORY */
router.get('/category_post', function(req, res){
	Category.findAll()
		.then(function(Category){
			res.render('category/category_post', {
				title: 'Post To Category',
				Category: Category
			})
		})
})

router.post('/category_post', function(req, res){
	Category.create({
		category: req.body.category
	})
		.then(function(Category){
			res.redirect('/')
		})
})

module.exports = router;