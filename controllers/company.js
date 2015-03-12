/**
 * GET /Company
 * List all Company.
 */
var _ = require('lodash');
var async = require('async');
var secrets = require('../config/secrets');
var Company = require('../models/Company');
var mongoose = require('mongoose');

exports.getCompany = function(req, res) {
  Company.find(function(err, docs) {
    res.render('company', { companys: docs, title: 'Company' });
  });
};

exports.checkAuth = function(req, res) {
   // if(req.user.email == 'reviewers1337@gmail.com') return res.redirect('/');
    
  Company.find(function(err, docs) {
    res.render('company', { companys: docs, title: 'Company' });
  });
};

exports.createCompany = function(req, res, next) {
  req.assert('name', 'Name cannot be empty').notEmpty();
    
  var tosend = { 
    "name": req.body.name,
    "website": req.body.website,
    "email": req.body.email,
    "description": req.body.description,
    "phone": req.body.phone,
    "address": req.body.address,
    "logo": req.body.logo
  };
    
  Company.create(tosend, function (err, post) {
    if (err) return next(err);
      req.flash("Thanks for the feedback "+ post.id);
      res.redirect(req.session.returnTo || '/');
  });
};

exports.updateCompany = function(req, res) {
  var id = req.body.id;
  Company.update(id, req.body, function (err, post) {
    if (err) return next(err);
      res.json(post);
  });
}

exports.deleteCompany= function(req, res) {
    var id = req.body.id;
    Company.delete(id);
}