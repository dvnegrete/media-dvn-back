const mongoose = require("mongoose");
const { dbUser, dbPassword, dbCluster, dbPort } = require('./../config');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbCluster}:${dbPort}`);
    } catch (error) {
        console.error(error);
        throw new Error('Error starting BD, see LOGS');
    }
}

module.exports = { dbConnection }