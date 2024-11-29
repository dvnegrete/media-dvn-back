const mongoose = require("mongoose");
const { dbUser, dbPassword, dbCluster } = require("./../config");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/multimedia`,
      {
        maxPoolSize: 10,
        minPoolSize: 0,
        socketTimeoutMS: 25000,
        serverSelectionTimeoutMS: 30000,
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error starting BD, see LOGS");
  }
};

module.exports = { dbConnection };
