/**
 * GET /Product
 * List all Product.
 */
var _ = require('lodash');
var async = require('async');
var secrets = require('../config/secrets');
var Product = require('../models/Product');
var mongoose = require('mongoose');

exports.getProduct = function(req, res) {
  Product.find(function(err, docs) {
    res.render('product', { products: docs, title: 'Product' });
  });
};

exports.checkAuth = function(req, res) {
   // if(req.user.email == 'reviewers1337@gmail.com') return res.redirect('/');
    
  Product.find(function(err, docs) {
    res.render('product', { products: docs, title: 'Product' });
  });
};

exports.createProduct = function(req, res, next) {
  req.assert('ref', 'Reference is not valid').notEmpty();
    
  var tosend = { 
    "name": req.body.name,
    "link": req.body.description,
    "sku": req.body.sku

  };
    
  Product.create(tosend, function (err, post) {
    if (err) return next(err);
      req.flash("Thanks for the feedback "+ post.id);
      res.redirect(req.session.returnTo || '/');
  });
};

exports.updateProduct = function(req, res) {
  var id = req.body.id;
  Product.update(id, req.body, function (err, post) {
    if (err) return next(err);
      res.json(post);
  });
}

exports.deleteProduct= function(req, res) {
    var id = req.body.id;
    Product.delete(id);
}