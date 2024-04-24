const mongoose = require("mongoose");
const { dbUser, dbPassword, dbCluster, dbName } = require('./../config');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.wljfykg.mongodb.net/${dbName}`);
    } catch (error) {
        console.error(error);
        throw new Error('Error starting BD, see LOGS');
    }
}

module.exports = { dbConnection }