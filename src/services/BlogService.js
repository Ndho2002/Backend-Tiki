const Blog = require("../models/Blog");
const createBlog = (newBlog) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createBlog = await Blog.create(newBlog);
      if (createBlog) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createBlog,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getBlogs = (limit, page, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalBlog = await Blog.find().countDocuments();

      if (filter) {
        const label = filter[0];
        const searchTerm = filter[1].toLowerCase();

        const regexSearchTerm = new RegExp(searchTerm, "i");
        const allBlogFilter = await Blog.find({
          [label]: { $regex: regexSearchTerm },
        })
          .limit(limit)
          .skip(page * limit);

        resolve({
          status: "OK",
          message: "Lấy thành công",
          data: allBlogFilter,
          total: totalBlog,
          pageCurrent: page++,
          totalPages: Math.ceil(totalBlog / limit),
        });
      } else {
        const getBlogs = await Blog.find().limit(limit).sort({ createdAt: -1 });
        if (getBlogs) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: getBlogs,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateBlog = (idBlog, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateBlog = await Blog.findByIdAndUpdate(idBlog, dataUpdate, {
        new: true,
      });
      if (updateBlog) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateBlog,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deteleBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });

      if (checkBlog === null) {
        resolve({
          status: "ERROR",
          message: "Khong ton tai",
        });
      }

      await Blog.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa bài viết thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getByBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBlog = await Blog.findByIdAndUpdate(
        { _id: id },
        { $inc: { numberViews: 1 } },
        { new: true }
      );

      if (!getBlog) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy sản phẩm",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy bài viết thành công",
        data: getBlog,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const linkBlog = (id, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBlog = await Blog.findById({ _id: id });

      const alreadyDisliked = getBlog?.dislikes?.find(
        (el) => el.toString() === idUser
      );
      if (alreadyDisliked) {
        //da dislike
        const res = await Blog.findByIdAndUpdate(
          id,
          {
            $pull: { dislikes: idUser },
          },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      }
      const isLiked = getBlog?.likes?.find((el) => el.toString() === idUser);

      if (isLiked) {
        const res = await Blog.findByIdAndUpdate(
          id,
          { $pull: { likes: idUser } },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      } else {
        const res = await Blog.findByIdAndUpdate(
          id,
          { $push: { likes: idUser } },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const dislinkBlog = (id, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBlog = await Blog.findById({ _id: id });

      const alreadyDisliked = getBlog?.likes?.find(
        (el) => el.toString() === idUser
      );
      if (alreadyDisliked) {
        //da dislike
        const res = await Blog.findByIdAndUpdate(
          id,
          {
            $pull: { likes: idUser },
          },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      }
      const isLiked = getBlog?.dislikes?.find((el) => el.toString() === idUser);

      if (isLiked) {
        const res = await Blog.findByIdAndUpdate(
          id,
          { $pull: { dislikes: idUser } },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      } else {
        const res = await Blog.findByIdAndUpdate(
          id,
          { $push: { dislikes: idUser } },
          { new: true }
        );
        resolve({
          status: "OK",
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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
