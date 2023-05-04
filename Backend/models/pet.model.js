const mongoose = require('mongoose');
const path = require('path');

var petSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    specie: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    picture: {type: String, required: false},
}, {collection: 'pets'});

petSchema.pre('save', function (next) {
    const pet = this;
    const basse64StartString = "data:image/";
    if (pet.picture && pet.isModified('picture') && !pet.picture.startsWith(basse64StartString)) {
        const base64Image = 'data:image/jpg;base64,' + pet.picture;
        pet.picture = base64Image;
    }

    return next();
});

mongoose.model('pet', petSchema);