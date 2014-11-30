var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),

    db = new Bourne('users.json'),
    router = express.Router();

router
  .use(bodyParser.json())
  .route('/allUsers')
    .get(function(req, res) {
      db.find({}, function(err, data) {
        res.json(data);
      });
    });

router
  .param('name', function(req, res, next) {
    req.dbQuery = ({ firstName: req.params.name });
    next();
  })
  .route('/allUsers/:name')
    .get(function(req, res) {
      db.findOne(req.dbQuery, function(err, data) {
        res.json(data);
      });
    })

module.exports = router;
