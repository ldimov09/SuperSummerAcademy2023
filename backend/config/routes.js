const homeContorller = require('../controllers/homeController.js')

module.exports = (app) => {
    app.use('/', homeContorller);
};