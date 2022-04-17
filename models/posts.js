const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  name: {type: String, required: [true, '姓名未填寫']},
  tags: {type: Array, required: [true, '標籤未填寫']},
  type: {type: String, enum: ['group','person'], required: [true, '類型未填寫']},
  image: {type: String, default: null},
  createdAt: {type: Date, default: Date.now, select: false},
  content: {type: String, required: [true, 'Content 未填寫']},
  likes: {type: Number, default: 0},
  comments:{type: Number, default: 0},
}, {versionKey: false});
const Post = mongoose.model('posts', postsSchema);

module.exports = Post;
