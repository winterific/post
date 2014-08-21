var express = require('express'),
	swig = require('swig'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	multer  = require('multer'),
	app = express();

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ 
	dest: __dirname + '/uploads/',
	rename: function (fieldname, filename) {
		return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
	}
}));

app.route('/')
.get(function (req, res, next) {
	res.render('index');
})
.post(function (req, res, next) {

	// TODO: First do something with the uploaded files if I want.

	res.render('index', { form: req.body, files: req.files });

	// Clear out the temp files for this post.
	// for (var i in req.files) {
	// 	fs.unlink(req.files[i].path, function (err) {
	// 		if (err) throw err;
	// 	});
	// }

});

var host = '0.0.0.0';
var port = process.env.PORT || 8000;

app.listen(port, host, function () {
	console.log("Listening on port: " + port);
});
