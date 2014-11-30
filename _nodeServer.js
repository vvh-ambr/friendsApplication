var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    users = require('./_accounts'),
    api = require('./_api'),
    app = express();

// Configure Express Itself
app
  .use(morgan('dev'))
  .set('view engine', 'jade')
  .set('views', path.join(__dirname + '/server/views'));


// Configure Routes
app
  .use(express.static('./public/'))
  .use(users)
  .use('/api', api)
  .get('*', function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render('entryView');
    }
  });


// Configure port & listening

var listn = function(port) {
  app.listen(port);
  console.log('|| listening on ' + port +' ||');
}(3000);
