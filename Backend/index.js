const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
require('dotenv').config()

const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 3000;

const connectionString = process.env.connectionString;
mongoose.connect(connectionString);
mongoose.connection.on('connected', async () => {
    console.log('Db csatlakoztatva');
    const usersbootstrapper = require('./bootstrappers/user.bootstrapper');
    const petsBootstrapper = require('./bootstrappers/pets.bootstrapper');
    await usersbootstrapper();
    await petsBootstrapper();
});
mongoose.connection.on('error', (error) => {
    console.log('Hiba tortent a db-hez csatlakozas soran', error);
});

require('./models/user.model');
require('./models/pet.model');

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    }, 
    credentials: true
}));

const userModel = mongoose.model('user');
passport.use('local', new localStrategy(async function (username, password, done) {
    const user = await userModel.findOne({ username: username });
    if (!user) return done('Hiba a lekeres soran, vagy nincs ilyen user', null);

    user.comparePasswords(password, function (err, match) {
        if (err) return done(err, false);
        if (!match) return done('Hibas jelszo', false);

        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    if (!user) return done('Nincs megadva beleptetheto felhasznalo', null);

    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    if (!user) return done('Nincs user akit kileptethetnenk', null);

    return done(null, user);
});

app.use(passport.initialize());
app.use(expressSession({ secret: 'superstrongandsafesecret123', resave: true, saveUninitialized: true }));
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', require('./user_routes'));
app.use('/', require('./pet_routes'));

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});