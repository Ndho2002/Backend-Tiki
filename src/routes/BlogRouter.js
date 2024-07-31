const express = require("express");
const BlogController = require("../controllers/BlogController");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleWare");

router.post("/create-blog", BlogController.createBlog);
router.get("/get-blogs", BlogController.getBlogs);
router.put("/update-blog/:id", BlogController.updateBlog);
router.delete("/detele-blog/:id", BlogController.deteleBlog);
router.get("/get-by-blog/:id", BlogController.getByBlog);
router.put("/like/:id", authUserMiddleWare, BlogController.linkBlog);
router.put("/dislike/:id", authUserMiddleWare, BlogController.dislinkBlog);

module.exports = router;
