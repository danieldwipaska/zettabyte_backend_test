const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const articleRoute = require('./routes/articles');
const commentRoute = require('./routes/comments');
const mongoose = require('mongoose');

//DECLARATION
const app = express();

//MIDDLEWARES
app.use(express.json());

//MONGODB CONNECT
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to DB!'))
  .catch((err) => {
    console.log(err);
  });

//ROUTES
app.use('/api/articles', articleRoute);
app.use('/api/comments', commentRoute);

//LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
