/**
 * GET /tracker
 * List all tracker.
 */
var _ = require('lodash');
var async = require('async');
var secrets = require('../config/secrets');
var Tracker = require('../models/Tracker');
var mongoose = require('mongoose');

exports.getTracker = function(req, res) {
  Tracker.find(function(err, docs) {
    res.render('tracker', { trackers: docs });
  });
};

exports.checkAuth = function(req, res) {
   // if(req.user.email == 'reviewers1337@gmail.com') return res.redirect('/');
    
  Tracker.find(function(err, docs) {
    res.render('tracker', { trackers: docs });
  });
};

exports.createTracker = function(req, res, next) {
  req.assert('ref', 'Reference is not valid').notEmpty();
    
  var tosend = { 
      "ref": req.body.ref,
      "problems": req.body.problems,
      "arrived": req.body.arrived,
      "email": req.user.email 
  };
    
  Tracker.create(tosend, function (err, post) {
    if (err) return next(err);
      req.flash("Thanks for the feedback "+ post.id);
      res.redirect(req.session.returnTo || '/');
  });
};

exports.updateTracker = function(req, res) {
  var id = req.body.id;
  Tracker.update(id, req.body, function (err, post) {
    if (err) return next(err);
      res.json(post);
  });
}

exports.deleteTracker= function(req, res) {
    var id = req.body.id;
    Tracker.delete(id);
}