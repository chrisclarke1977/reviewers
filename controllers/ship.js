/**
 * GET /Ship
 * List all Ship.
 */
var _ = require('lodash');
var async = require('async');
var secrets = require('../config/secrets');
var Ship = require('../models/Ship');
var mongoose = require('mongoose');

exports.getShip = function(req, res) {
  Ship.find(function(err, docs) {
    res.render('ship', { ships: docs, title: 'Ship' });
  });
};

exports.checkAuth = function(req, res) {
   // if(req.user.email == 'reviewers1337@gmail.com') return res.redirect('/');
    
  Ship.find(function(err, docs) {
    res.render('ship', { ships: docs, title: 'Ship' });
  });
};

exports.createShip = function(req, res, next) {
  req.assert('ref', 'Reference is not valid').notEmpty();
    
  var tosend = { 
      "ref": req.body.ref,
      "problems": req.body.problems,
      "arrived": req.body.arrived,
      "email": req.user.email 
  };
    
  Ship.create(tosend, function (err, post) {
    if (err) return next(err);
      req.flash("Thanks for the feedback "+ post.id);
      res.redirect(req.session.returnTo || '/');
  });
};

exports.updateShip = function(req, res) {
  var id = req.body.id;
  Ship.update(id, req.body, function (err, post) {
    if (err) return next(err);
      res.json(post);
  });
}

exports.deleteShip= function(req, res) {
    var id = req.body.id;
    Ship.delete(id);
}