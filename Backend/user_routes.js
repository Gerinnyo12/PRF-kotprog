const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');

router.route('/login').post((req, res, next) => {
    if (req.body.username && req.body.password) {
        passport.authenticate('local', function (error, user) {
            if (error) {
                return res.status(400).send(error);
            }

            req.logIn(user, function (error) {
                if (error) {
                    return res.status(400).send(error);
                }

                return res.status(200).send('Sikeres autentikacio es login');
            })
        })(req, res);
    } else {
        return res.status(400).send('Hibas keres, username es password szukseges!');
    }
});

router.route('/logout')
    .post((req, res, next) => {
        if (req.isAuthenticated()) {
            req.logOut(function (err) {
                if (err) {
                    return res.status(500).send('Hiba a kijelentkezes soran');
                } 
            });
            return res.status(200).send('Sikeres kijelentkezes');
        } else {
            return res.status(403).send('Nem volt bejelentkezve');
        }
    });

router.route('/register')
    .post(async (req, res, _) => {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).send("Minden adatot meg kell adni a regsiztraciohoz");
        }

        if (await userModel.findOne({ username: req.body.username })) {
            return res.status(400).send(`Mar letezik felhasznalo a ${req.body.username} felhasznalonevvel`);
        }

        const user = new userModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            isAdmin: false,
        });
        await user.save();

        return res.status(200).send("Sikeres regisztracio");
    });

router.route('/users/:username')
    .get(async (req, res, _) => {
        if (!req.params.username) {
            return res.status(400).send("Meg kell adni a felhasznalonevet");
        }

        const user = await userModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(400).send("Nem letezik felhasznalo ezzel a felhasznalonevvel");
        }

        return res.status(200).send(user);
    })
    .put(async (req, res, _) => {
        if (!req.params.username || !req.body.email) {
            return res.status(400).send("Minden adatot meg kell adni a frissiteshez");
        }

        const user = await userModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(400).send("Nem letezik felhasznalo ezzel a felhasznalonevvel");
        }

        const filter = { username: req.params.username };
        const updatedUser = {
            username: req.params.username,
            password: req.body.password,
            email: req.body.email,
        };
        await userModel.updateOne(filter, {
            $set: updatedUser
        });

        return res.status(200).send(updatedUser);
    })
    .delete(async (req, res, _) => {
        if (!req.params.username) {
            return res.status(400).send("Meg kell adni a felhasznalonevet");
        }

        const user = await userModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(400).send("Nem letezik felhasznalo ezzel a felhasznalonevvel");
        }

        await userModel.deleteOne({ username: req.params.username });
        return res.status(200).send();
    });

module.exports = router;