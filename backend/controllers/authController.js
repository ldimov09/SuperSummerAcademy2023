const authController = require('express').Router();
const { register, login } = require('../services/userService.js');
const { parseError } = require('../util/parser.js');

authController.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register'
    })
});

authController.post('/register', async function (req, res) {
    try{
        if(req.body.username == '' || req.body.password == ''){
            throw new Error('All fields are required!');
        }
        if(req.body.password !== req.body.repass){
            throw new Error('Passwords don\'t match!');
        }
        const token = await register(req.body.username, req.body.password);
    
        res.cookie('token', token);
    
        res.redirect('/');
    }catch(error){

        const errors = parseError(error);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username,
            }
        })
    }
})


authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page',
    });
});


authController.post('/login', async (req, res) => {
    try{

        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');

    }catch(error){
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username,
            }
        })
    }
});

authController.get('/logout', function(req, res) {
    res.clearCookie('token');
    res.redirect('/')
});
module.exports = authController;