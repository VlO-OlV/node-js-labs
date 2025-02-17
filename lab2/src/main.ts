import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config({
  path: __dirname + '/.env',
});

const port = process.env.PORT || 3000;

app.use(express.static('src/styles'));
app.use(express.static('src/images'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => console.log(`Running on port ${port}`));