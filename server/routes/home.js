import express from 'express';
var homeRoute = express.Router();
import homeChildrenRoute from '../routes/homeChildren.js';

homeRoute.use('', homeChildrenRoute);

export default homeRoute;
//module.exports = homeRoute;  // this pattern is applicable for require([MODULE NAME]) but not import type formate

