const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, lowecase: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
}, {collection: 'users'});

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function(error, salt) {
            if (error) {
                console.log('Hiba a salt generalasa soran')
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if (error) {
                    console.log('Hiba a hasheles soran');
                    return next(error);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, match) {
        callback(error, match);
    });
}

mongoose.model('user', userSchema);
