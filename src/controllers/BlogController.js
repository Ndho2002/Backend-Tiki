const BlogService = require("../services/BlogService");
const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await BlogService.createBlog(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const { limit, filter, page } = req.query;

    const response = await BlogService.getBlogs(
      Number(limit) || 8,
      Number(page) || 0,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogService.updateBlog(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deteleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogService.deteleBlog(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getByBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await BlogService.getByBlog(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const linkBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;
    const response = await BlogService.linkBlog(id, idUser);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const dislinkBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;
    const response = await BlogService.dislinkBlog(id, idUser);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deteleBlog,
  getByBlog,
  linkBlog,
  dislinkBlog,
};
