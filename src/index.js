const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/', require('./routes'));

app.listen(port, () => console.log("Server online"))