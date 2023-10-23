const Blog = require('../models/Blog'); 


const createBlog = async (req, res) => {
  try {
    const { authorId,username,title, content, photo, tags, likes, category } = req.body;
    const blog = new Blog({
      authorId,
      username,
      title,
      content,
      photo,
      tags,
      likes,
      category,
    });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the blog', details: error });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.status(200).json(blog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the blog', details: error });
  }
};
const getBlogByauthorId = async (req, res) => {
  try {
    const myBlogs = await Blog.find({ authorId: req.params.authorId });
   

    if (myBlogs.length === 0) {
      res.status(404).json({ error: 'No blogs found for this author' });
    } else {
      res.status(200).json( {type: "success",myBlogs});
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the blogs', details: error });
  }
};


const updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.status(200).json(updatedBlog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the blog', details: error });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (!deletedBlog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.status(204).json(); // No content
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the blog', details: error });
  }
};

const getFeed = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page number, default to 1
  const perPage = 5; // Number of posts per page

  try {
    // Sort the posts by the number of likes in descending order
    const feed = await Blog.find({})
      .sort({ likes: -1 }) // Sort by likes in descending order
      .skip((page - 1) * perPage) // Skip posts for pagination
      .limit(perPage) // Limit the number of posts per page
      
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve the feed', details: error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogByauthorId,
  updateBlog,
  deleteBlog,
  getFeed,
};
