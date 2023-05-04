const mongoose = require('mongoose');
const petsModel = mongoose.model('pet');
const fs = require('fs')
const imagesDirectory = "./bootstrappers/petImages"

async function bootstrap() {
    var pet = await petsModel.findOne({ name: 'Betyar' })
    if (!pet) {
        const petModel = new petsModel({
            name: "Betyar",
            specie: "Kutya",
            age: 86,
            height: 50,
            picture: fs.readFileSync(`${imagesDirectory}/Betyar.jpg`, {encoding: 'base64'}),
        });

        await petModel.save();
        console.log("Nem volt Betyar, beszurtuk.")
    }

    pet = await petsModel.findOne({ name: 'Cicci' })
    if (!pet) {
        const petModel = new petsModel({
            name: "Cicci",
            specie: "Macska",
            age: 2,
            height: 280,
            picture: fs.readFileSync(`${imagesDirectory}/Cicu.jpg`, {encoding: 'base64'}),
        });

        await petModel.save();
        console.log("Nem volt Cicci, beszurtuk.")
    }

    pet = await petsModel.findOne({ name: 'Hari' })
    if (!pet) {
        const petModel = new petsModel({
            name: "Hari",
            specie: "Hörcsög",
            age:962,
            height: 3,
            picture: fs.readFileSync(`${imagesDirectory}/Hori.jpg`, {encoding: 'base64'}),
        });

        await petModel.save();
        console.log("Nem volt Hari, beszurtuk.")
    }

    pet = await petsModel.findOne({ name: 'Gidu' })
    if (!pet) {
        const petModel = new petsModel({
            name: "Gidu",
            specie: "Őz",
            age: 10,
            height: 80,
            picture: fs.readFileSync(`${imagesDirectory}/Ozi.jpg`, {encoding: 'base64'}),
        });

        await petModel.save();
        console.log("Nem volt Gidu, beszurtuk.")
    }
}

module.exports = bootstrap;