require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PersonModel = require('./person-model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, async () => {
  console.log('Server started');

  const DB_ID = process.env.DB_ID;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const mongodbUri = `mongodb+srv://${DB_ID}:${DB_PASSWORD}@node.5fusz1w.mongodb.net/test?retryWrites=true&w=majority`;

  // 1. 몽고디비에 커넥션 맺기
  await mongoose.connect(mongodbUri).then(console.log('Connected to MongoDB'));
});

// 2. 모든 person 데이터 출력
app.get('/person', async (req, res) => {
  const person = await PersonModel.find({});
  res.send(person);
});

// 3. 특정 이메일로 person 찾기
app.get('/person/:email', async (req, res) => {
  const email = req.params.email;
  const person = await PersonModel.findOne({ email });
  res.send(person);
});

// 4. person 데이터 추가
app.post('/person', async (req, res) => {
  const personData = req.body;
  const person = new PersonModel(personData);
  await person.save();
  res.send(person);
});

// 5. person 데이터 수정
app.put('/person/:email', async (req, res) => {
  const email = req.params.email;
  const updatedData = req.body;
  const person = PersonModel.findOneAndUpdate(
    { email },
    { $set: updatedData },
    { new: true }
  );
  res.send(person);
});

// 6. person 데이터 삭제
app.delete('/person/:email', async (req, res) => {
  const email = req.params.email;
  await PersonModel.deleteOne({ email });
  res.send({ success: true });
});
