const Post = require('../models/posts');
const { success, fail } = require('../service/response');

const posts = {
  async getPosts(req, res) {
    const data = await Post.find();
    success(res, data);
  },
  async createdPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      if(data.content) {
        const newPosts = await Post.create(data);
        success(res, newPosts);
      } else {
        fail(res, '未填寫貼文內容')
      }      
    } catch(error) {
      fail(res, '格式錯誤 or 欄位未填寫正確')
    }
  },
  async deletePosts(req, res) {
    await Post.deleteMany({});
    success(res, []);
  },
  async deletePost(req, res) {
    const { url } = req;
    const posts = await Post.find();
    const id = url.split('/').pop();
    const index = posts.findIndex(element => element._id == id);
    if(index !== -1) {
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      success(res, posts);
    } else {
      fail(res, 'id 不匹配 or 未填寫貼文內容');
    }
  },
  async changePost({ body, req, res }) {
    const { url } = req;
    try {
      const data = JSON.parse(body);
      const posts = await Post.find();
      const id = url.split('/').pop();
      const index = posts.findIndex(element => element._id == id);
      if(index !== -1 && data.content) {
        await Post.findByIdAndUpdate(id, data);
        const posts = await Post.findById(id);
        success(res,posts);
      } else {
        fail(res, 'id 不匹配');
      }
    } catch(error) {
      fail(res, '格式錯誤 or 欄位未填寫正確')
    }
  }
}

module.exports = posts;
