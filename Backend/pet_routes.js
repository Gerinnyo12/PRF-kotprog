const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const petModel = mongoose.model('pet');

router.route("/pets")
    .get(async (req, res, _) => {
        const pets = await petModel.find({});
        if (!pets) {
            return res.status(400).send("Nem sikerult a lekerdezes");
        }

        return res.status(200).send(pets);
    });

router.route("/pets")
    .post(async (req, res, _) => {
        if (!req.body.name || !req.body.specie || !req.body.age || !req.body.height) {
            return res.status(400).send("Meg kell adni az allat adatait");
        }

        if (await petModel.findOne({ name: req.body.name })) {
            return res.status(400).send("Mar letezik kisallat ezzel a nevvel");
        }

        const pet = new petModel({
            name: req.body.name,
            specie: req.body.specie,
            age: req.body.age,
            height: req.body.height,
            picture: req.body.picture,
        });
        await pet.save();

        return res.status(200).send(pet);
    });

router.route('/pets/:petName')
    .get(async (req, res, _) => {
        if (!req.params.petName) {
            return res.status(400).send("Meg kell adni az allat nevet");
        }

        const pet = await petModel.findOne({ name: req.params.petName });
        if (!pet) {
            return res.status(400).send("Nem letezik kisallat ezzel a nevvel");
        }

        return res.status(200).send(pet);
    })
    .put(async (req, res, _) => {
        if (!req.params.petName) {
            return res.status(400).send("Meg kell adni az allat nevet");
        }

        if (!req.body.specie || !req.body.age || !req.body.height) {
            return res.status(400).send("Minden adatot meg kell adni a frissiteshez");
        }

        const pet = await petModel.findOne({ name: req.params.petName });
        if (!pet) {
            return res.status(400).send("Nem letezik kisallat ezzel a nevvel");
        }

        const filter = { name: req.params.petName };
        const updatedPet = {
            name: req.params.petName,
            specie: req.body.specie,
            age: req.body.age,
            height: req.body.height,
            picture: req.body.picture,
        };
        await petModel.updateOne(filter, {
            $set: updatedPet
        });

        return res.status(200).send(updatedPet);
    })
    .delete(async (req, res, _) => {
        if (!req.params.petName) {
            return res.status(400).send("Meg kell adni az allat nevet");
        }

        const pet = await petModel.findOne({ name: req.params.petName });
        if (!pet) {
            return res.status(400).send("Nem letezik kisallat ezzel a nevvel");
        }

        await petModel.deleteOne({ name: req.params.petName });
        return res.status(200).send();
    });

module.exports = router;