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

// app.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))

app.use (passport.initialize());

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (res, req) => {
    res.send('Something went wrong!');
});

app.get('/auth/protected', isLoggendIn, (res, req) => {
    let name = req.user.displayName;
    res.send(`Hello ${nome}`);
});

app.listen (5000, () => {
    console.log ('LIstening on port 5000');
})