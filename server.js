const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Post = require('./models/posts');
const { success, fail, options } = require('./response');

dotenv.config({path: "./config.env"});
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => {console.log('連線成功')})
  .catch(err => {console.log(err)})

const requestListener  = async (req, res) => {
  const { url, method } = req;
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  if(url === '/posts' && method === 'GET') {
    const data = await Post.find();
    success(res, data);
  } else if(url === '/posts' && method === 'POST') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newPosts = await Post.create(data);
        success(res, newPosts);
      } catch(error) {
        fail(res, 400, '格式錯誤 or 欄位未填寫正確')
      }
    })
  } else if(url === '/posts' && method === 'DELETE') {
    await Post.deleteMany({});
    success(res, []);
  } else if(url.startsWith('/posts/') && method === 'DELETE') {
    const posts = await Post.find();
    const id = url.split('/').pop();
    const index = posts.findIndex(element => element._id == id);
    if(index !== -1) {
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      success(res, posts);
    } else {
      fail(res, 400, 'id 不匹配');
    }
  } else if(url.startsWith('/posts/') && method === 'PATCH') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const posts = await Post.find();
        const id = url.split('/').pop();
        const index = posts.findIndex(element => element._id == id);
        if(index !== -1) {
          await Post.findByIdAndUpdate(id, data);
          const posts = await Post.findById(id);
          success(res,posts);
        } else {
          fail(res, 400, 'id 不匹配');
        }
      } catch(error) {
        fail(res, 400, '格式錯誤 or 欄位未填寫正確')
      }
    })
  } else if(method === 'OPTIONS') {
    options(res);
  } else {
    fail(res, 404, '無此路由');
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
