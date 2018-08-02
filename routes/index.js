require('dotenv').config();
var express = require('express');
var router = express.Router();
var axios = require('axios');
const http = require('http');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'drivvyn | Your Career Development Assistant', header: 'Achieve Your Greatness'});
});

// POST

// router.post('/', (req, res) => {
// 	const email = req.body.email;

// 	const options = {
// 		hostname: 'https://api.mailerlite.com/',
// 		path: '/api/v2/subscribers',
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'X-MailerLite-ApiKey': process.env.MAILERLITE_KEY
// 		}
// 	};

// 	const request = http.request(options, (response) => {
// 		console.log(`Status: ${response.statusCode}`);
// 		response.setEncoding('utf8');
// 		response.on('data', (chunk) => {
// 			console.log(`Body: ${chunk}`);
// 		});
// 		response.on('end', () => {
// 			console.log('No more data');
// 		});
// 	});

// 	req.on('error', (e) => {
//   		console.error(`problem with request: ${e.message}`);
// 	});

// 	req.write(email);
// 	req.end();	

// });

// router.post('/', function(req, res, next) {
// 	axios({
// 		method: 'post',
// 		url: 'https://api.mailerlite.com/api/v2/subscribers',
// 		headers: {'Content-Type': 'application/json', 'X-MailerLite-ApiKey': process.env.MAILERLITE_KEY},
// 		data: {
// 			'email': req.body.email
// 		}
// 	})
// 	.then(function(response) {
// 		console.log(response.data);
// 	})
// 	.then(() => {
// 		res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSfLtl4Wp88uQEmh6FNdLT9Mdpfg6FD7d2NtTzIOV_ARGu5hPA/viewform');
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	})
// })

router.post('/', [
	body('email', 'A valid email is required').isEmail().normalizeEmail(),
	sanitizeBody('email').trim().escape()
	], (req, res) => {
		const errors = validationResult(req);
		//var email = req.body.email;

		if(!errors.isEmpty()) {
			res.render('#about', { title: 'drivvyn | Your Career Development Assistant', header: 'Achieve Your Greatness', errors: errors.array()});
			console.log(errors);
			return;
		} else {
			axios({
				method: 'post',
				url: 'https://api.mailerlite.com/api/v2/subscribers',
				headers: {'Content-Type': 'application/json', 'X-MailerLite-ApiKey': process.env.MAILERLITE_KEY},
				data: {
					'email': req.body.email
				}
			})
			.then(function(response) {
				console.log(response.data);
			})
			.then(() => {
				res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSfLtl4Wp88uQEmh6FNdLT9Mdpfg6FD7d2NtTzIOV_ARGu5hPA/viewform');
			})
			.catch(function(error) {
				console.log(error);
			})
		}
	}
)

module.exports = router;
