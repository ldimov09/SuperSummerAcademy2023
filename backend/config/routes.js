const homeContorller = require('../controllers/homeController.js')
const authController = require('../controllers/authController.js')

module.exports = (app) => {
    app.use('/', homeContorller);
    app.use('/auth', authController);


};