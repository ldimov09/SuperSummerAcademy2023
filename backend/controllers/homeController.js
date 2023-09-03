const homeController = require('express').Router();

homeController.get('/', function (req, res) {
    res.render('home', { 
        title: 'Home page',
        user: req.user, 
    })
});

module.exports = homeController;