const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = 8001;
const { connectMongoDB } = require('./connect');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", 'ejs');
app.use(express.static("public"))

connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("mongodb connected"));
app.use('/url', urlRoute);
 function shortIdBot(){
  app.get('/:shortId', async (req, resp) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now
        }
      }
    },
    { new: true }
  );
  if (entry) {
    resp.redirect(entry.redirectURL);
  } else {
    resp.status(404).send('URL not found');
  }
});}

app.get('/', (req, resp) => {
  resp.render('login');
});

shortIdBot();
module.exports = shortIdBot;

app.listen(PORT, () => {
  console.log(`Server is started at port :${PORT}`);
});