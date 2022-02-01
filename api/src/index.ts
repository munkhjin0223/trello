import { connect } from './db/connection';
import UserModel from './db/models/Users';

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.get('/user', async (_req, res) => {
  const doc = new UserModel({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await doc.save();

  res.send(JSON.stringify(doc));
});

app.get('/users', async (_req, res) => {
  const users = await UserModel.find();

  res.send(JSON.stringify(users));
});

app.listen(port, async () => {
  await connect();

  console.log(`Example app listening on port ${port}`);
});
