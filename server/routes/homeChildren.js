import path from 'path';
let __dirname = path.resolve();

import express from 'express';
var homeChildrenRoute = express.Router();

homeChildrenRoute.get('/wf', function(req, res, next) {    
    res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
});

homeChildrenRoute.get('/db', function(req, res, next) {    
    res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
});

homeChildrenRoute.get('', function(req, res, next) {    
    res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
});

export default homeChildrenRoute;

