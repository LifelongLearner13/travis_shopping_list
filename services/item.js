var Item = require('../models/item');

exports.save = function(name, callback) {
  Item.create({name: name}, function(err, item) {
    if(err) {
      callback(err);
      return;
    }
    callback(null, item);
  });
};

exports.list = function(callback) {
  Item.find(function(err, items) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, items);
  });
};

exports.del = function(id, callback) {
  Item.findOneAndRemove({_id: id}, function(err, item) {
    if(err) {
      callback(err);
      return;
    }
    callback(null, item);
  });
};

exports.update = function(id, newName, callback) {
  Item.findOneAndUpdate({'_id': id}, {name: newName}, {new: true}, function(err, item) {
    if(err) {
      callback(err);
      return;
    }
    callback(null, item);
  });
};

exports.locate = function(id, callback) {
  Item.find({'_id': id}, function(err, items) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, items);
  });
};