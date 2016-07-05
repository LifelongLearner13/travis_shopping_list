var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./configs');

mongoose.connect(config[env].url);