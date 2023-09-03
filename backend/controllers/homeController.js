const homeController = require('express').Router();

homeController.get('/', function (req, res) {
    res.send(JSON.stringify({Hello: "World"}));
});

module.exports = homeController;