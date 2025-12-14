const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/protected.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/invoice.routes'));


module.exports = app;
