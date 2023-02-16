import express from 'express';
//var express = require('express');
var processRoute = express.Router();

processRoute.get('', function(req, res, next) {    
    //res.render('index', { title: 'Express' });
    res.send('Admin server ..... page is running........');
});

processRoute.get('/', function(req, res, next) {    
    //res.render('index', { title: 'Express' });
    res.send('Admin server ...... page is running........');
});

/* GET home page. */
processRoute.get('*', function(req, res, next) {    
  //res.render('index', { title: 'Express' });
  res.send('Admin server home/home page is running........');
});

export default processRoute;
//module.exports = homeRoute;  // this pattern is applicable for require([MODULE NAME]) but not import type formate

