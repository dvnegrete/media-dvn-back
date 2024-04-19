const express = require('express');

const { port } = require('./config');
const { dbConnection } = require('./database/config');

const app = express();

//CORS
//app.use(cors());

app.use( express.json() );

//BD
dbConnection();

//Routes
app.use('/api/user', require('./routes/user.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/theme', require('./routes/theme.route'));
app.use('/api/post', require('./routes/post.route'));

app.listen(port, () => console.log("Server online"))