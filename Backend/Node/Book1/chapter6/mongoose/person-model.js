const { Schema, model } = require('mongoose');

// 1. 스키마 객체 생성
const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

// 2. 모델 객체 생성
module.exports = model('Person', personSchema);
