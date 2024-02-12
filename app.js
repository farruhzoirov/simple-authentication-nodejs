const express = require('express');
const app = express();
const config = require('./config.js')
const bodyParser = require('body-parser');

const cors  = require('cors')
const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());


app.use('/login', routes.checkUser);
app.use('/sign-up', routes.createUser);
app.use('/portfolio', routes.renderData)


const PORT = process.env.PORT || 5000;
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});