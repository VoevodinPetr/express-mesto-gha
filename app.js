const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');

const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use(routes);
app.use(errors());
app.use(handelError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
