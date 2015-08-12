var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Question = models.Question;
var Answer = models.Answer;
var Tag = models.Tag;
var Category = models.Category;
var gravatar = require('gravatar');

/** TOP */
router.get('/', function(req, res, next){
	var questions = Question.findAll({
		include: {
			model: Answer
		}
	});
	var tags = Tag.findAll();
	var categories = Category.findAll();

	Promise.all([questions, tags, categories])
		.then(function (result) {
			var questions = result[0];
			var tags = result[1];
			var categories = result[2];

			res.render('index', {
				Question: questions,
				Tag: tags,
				Category: categories,
				title: 'lawverflow'
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
		});
});

router.post('/question/create', function(req, res, next){
	Question
		.create({
			subject: req.body.subject,
			content: req.body.content,
			UserId: req.session.userId
		})
		.then(function(question){
			return new Promise(function (resolve, reject) {
				Category.findOne({
					where: {category: req.body.categoryName}
				})
				.then(function (category) {
					console.log(category)
					if (category == null) {
						return question.createCategory({category: req.body.categoryName})
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
				Tag.findOne({where: {tag: req.body.tagName}
				})
				.then(function (tag) {
					if(tag == null) {
						return question.createTag({tag: req.body.tagName})
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
				{ model: Answer },
				{ model: User },
				{ model: Tag },
				{ model: Category }
			]
		})
		.then(function (question){
			question.User.name,
			res.render('question/show',{
				title: 'Question',
				Question: question
			})
		})
})

/** EDIT TO QUESTION */
router.get('/question/edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			if(req.session.userId !== question.UserId){
				res.redirect('/question/' + req.params.id)
			}
			res.render('question/edit', {
				title: 'Edit To Question',
				Question: question
			})
		})
})

router.post('/question/edit/:id', function(req, res){
	Question.findById(req.params.id)
		.then(function(question){
			if(req.session.userId !== question.UserId) {
				res.status(401).send('NOT AUTHORIZED')
			}
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
			return question.createAnswer({
						answer: req.body.answer,
						UserId: req.session.userId
					})
		})
		.then(function () {
			res.redirect('/question/' + req.params.id)
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
			res.redirect('/users')
		}).catch(function(err){
			res.redirect('/register')
		});


});

/** ----------------------------- */

/** LOGIN */
router.get('/login', function (req, res) {
	if (req.session.userId == null) {
		res.render('auth/login',{
			title: 'login'
		})	
	} else {
		res.redirect('/')
	}
})

router.post('/login', function (req, res) {
	User
		.findOne({
			where: {
				email: req.body.email
			}
		}).then(function (user) {
			if(user.comparePassword(req.body.password)){
				req.session.userId = user.id
				res.redirect('/')
			
				return
			}
			res.redirect('/login');
		});
});

/** LOGOUT */
router.get('/logout', function(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	});
});

/** ----------------------------- */

/** USER */
//show all
router.get('/users', function(req, res){
	User.findAll()
		.then(function(user){
			res.render('user/index', {
				title: 'All Users',
				avatar: gravatar.url(user.email),
				User: user
			});
		});
});

//show person
router.get('/users/:id', function(req, res){
	User.findById(req.params.id)
		.then(function(user){
			res.render('user/show', {
				title: 'Show Users',
				avatar: gravatar.url(user.email),
				User: user
			});
		});
});

//change email
router.get('/users/:id/edit', function(req, res){
	User.findById(req.params.id)
		.then(function(user){
			if(req.session.userId == null && req.session.userId != User.id){
				res.redirect('/users/' + req.params.id)
			}
			res.render('user/profile_change', {
				title: 'Email change',
				avatar: gravatar.url(user.email),
				User: user
			});
		});
});

router.post('/users/:id/edit', function(req, res){
	User.findById(req.params.id)
		.then(function(user){
			if(req.session.userId == null && req.session.userId != User.id){
				req.status(401).send('NOT AUTHORIZED')
			}
			user.update(req.body)
				.then(function(){
					res.redirect('/users');
				})
		})
		.catch(function (err) {
			if (err.name = 'SequelizeUniqueConstraintError') {
				return res.redirect('back')
			}
			return res.redirect('users')
		})
});

/** ----------------------------- */

/** TAG */
router.get('/tag/index', function(req, res){
	Tag.findAll()
		.then(function(tag){
			res.render('tag/index', {
				title: 'All Tags',
				Tag: tag
			});
		});
});

router.get('/tag/:id', function(req, res){
	Tag.findById(req.params.id)
		.then(function(tag){
			res.render('tag/show', {
				title: 'Tag show',
				Tag: tag
			});
		});
});

router.get('/tag/create', function(req, res){
	Tag.findAll()
		.then(function(tag){
			res.render('tag/create', {
				title: 'Post To Tag',
				Tag: tag
			});
		});
});

router.post('/tag/create', function(req, res){
	Tag.create({
		tag: req.body.tag
	})
		.then(function(tag){
			res.redirect('/tag/create');
		});
});


/** ----------------------------- */

/** CATEGORY */
router.get('/category/index', function(req, res){
	Category.findAll()
		.then(function(category){
			res.render('category/index', {
				title: 'All Categories',
				Category: category
			});
		});
});

router.get('/category/:id', function(req, res){
	Category.findById(req.params.id)
		.then(function(category){
			res.render('category/show', {
				title: 'Category show',
				Category: category
			});
		});
});

router.get('/category/create', function(req, res){
	Category.findAll()
		.then(function(category){
			res.render('category/create', {
				title: 'Post To Category',
				Category: category
			});
		});
});

router.post('/category/create', function(req, res){
	Category.create({
		category: req.body.category
	})
		.then(function(category){
			res.redirect('/category/create');
		});
});

/** ----------------------------- */




module.exports = router;