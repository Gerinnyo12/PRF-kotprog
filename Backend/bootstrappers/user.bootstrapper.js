const mongoose = require('mongoose');
const userModel = mongoose.model('user');

async function bootstrap() {
    const admin = await userModel.findOne({ username: 'admin' })
    if (!admin) {
        const adminUser = new userModel({
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.admin',
            isAdmin: true,
        });

        await adminUser.save();
        console.log("Nem volt admin, beszurtuk.")
    }

    const costumer = await userModel.findOne({ username: 'costumer' })
    if (!costumer) {
        const costumerUser = new userModel({
            username: 'costumer',
            password: 'costumer',
            email: 'costumer@costumer.costumer',
            isAdmin: false,
        });

        await costumerUser.save();
        console.log("Nem volt costumer, beszurtuk.")
    }
}

module.exports = bootstrap;