const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JST_SECRET = '>E+<}d=zpU:7w[=.d`:}tOF8}Fuz[CE$n@<s[=:sTO"$`M||VA)3B[P;}snhqD~!t';



async function register(username, password) {
    const existing = await User.findOne({username }).collation({locale: 'en', strength: 2});
    if(existing) {
        throw new Error('Username Taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword,
    });

    const token = createSession(user);

    return token;
}

async function createSession({_id, username }) {
    const payload = {
        _id,
        username,
    }

    const token = jwt.sign(payload, JST_SECRET);
    return token;
}

async function login(username, password) {

    const user = await User.findOne({username }).collation({locale: 'en', strength: 2});
    if(!user){
        throw new Error('Incorrect username or password!');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(!hasMatch){
        throw new Error('Incorrect username or password!');
    }

    return createSession(user);

} 
 
function verifyToken(token){
    return jwt.verify(token, JST_SECRET);
}

module.exports = {
    register : register,
    login : login,
    verifyToken : verifyToken,
}