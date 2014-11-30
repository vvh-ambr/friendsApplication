var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    crypto = require('crypto'),

    db = new Bourne('users.json'),
    router = express.Router();

function hash(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function nDate() {
  var d = new Date();
  return d.toUTCString();
}

router
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({ secret: 'asjfhasjfhjahfaiweuwaoeioai2o3123124.add' }))
  .get('/', function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
    db.findOne({id: req.session.userId}, function(err, data) {
      req.session.userId = data.id;
      res.redirect('/profile/' + data.firstName);
    })
    }
  })
  .get('/login', function(req, res) {
    res.sendfile('public/states/authorization.html');
  })
  .post('/login', function(req, res) {
    var user = {
      username: req.body.username,
      password: hash(req.body.password)
    };
    db.findOne(user, function(err, data) {
      if (data) {
        req.session.userId = data.id;
        res.redirect('/profile/' + data.firstName);
      } else {
        res.redirect('/login');
      }
    })
  })
  .post('/register', function(req, res) {
    var user = {
      username: req.body.username,
      password: hash(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      registrationDate: nDate()
    };
    db.find({ username: user.username }, function(err, data) {
      if (!data.length) {
        db.insert(user, function(err, data) {
          req.session.userId = data.id;
          res.redirect('/profile/' + data.firstName);
        });
      } else {
        res.redirect('/login');
      }
    })
  })
  .get('/logout', function(req, res) {
    req.session.userId = null;
    res.redirect('/');
  })
  .use(function(req, res, next) {
    if (req.session.userId) {
      db.findOne({ id: req.session.userId }, function(err, data) {
        req.user = data;
      });
    }
    next();
  });

module.exports = router;
