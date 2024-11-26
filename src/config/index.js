require('dotenv').config();

const config = {
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbCluster: process.env.DB_CLUSTER,
    dbPort: process.env.DB_PORT,
    AZURE_STRING: process.env.AZURE_STRING,
};

module.exports = config;