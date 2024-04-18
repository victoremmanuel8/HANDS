const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const app = express();
require('./auth');

app.use(express.json());
app.use (express.static(path.join(__dirname, '../client')));

function isLoggendIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get ('/', (req, res) => {
    res.sendFile ('index.html');
});

app.use(session({
    secret: 'hands',
    resave: false,
    saveUninitialized: true,
     cookie: { secure: false },
 }));

app.use (passport.initialize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/index',
        failureRedirect: '/auth/login'
}));

app.get('/auth/login', (res, req) => {
    res.send('Something went wrong!');
});

app.get('/auth/index', isLoggendIn, (res, req) => {
    let nome = req.user.displayNome;
    res.send(`Hello ${nome}`);
});
