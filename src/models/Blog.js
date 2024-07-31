const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.lifewire.com/thmb/SnBOLy_eG1lT1-1p9xLf0zX_VZc=/2158x1390/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-905508166-5c05947246e0fb00015b7c4b.jpg",
    },
    category: {
      type: String,
      requied: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      requied: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Product = mongoose.model("Blog", blogSchema);
module.exports = Product;
