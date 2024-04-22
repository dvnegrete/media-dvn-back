const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { dbConnection } = require('./database/config');

const app = express();

//CORS
app.use(cors());

app.use( express.json() );

//BD
dbConnection();

//Routes
app.use('/api/users', require('./routes/user.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/themes', require('./routes/theme.route'));
app.use('/api/posts', require('./routes/post.route'));

app.listen(port, () => console.log("Server online"))