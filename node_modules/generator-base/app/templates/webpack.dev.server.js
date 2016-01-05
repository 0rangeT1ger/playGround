var Server = require('./helper/server');
var path = require('path');
var config = require('./webpack.dev.config.js');

var options = {
  contentBase: path.join(__dirname, './app'),
  hot: true
};

Server(config, options, 'localhost', 3000);