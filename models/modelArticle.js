import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
});
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    comment: [commentSchema],
  },
  { collection: "article_db" }
);

const ArticleModel =
  mongoose.models.article_db || mongoose.model("article_db", articleSchema);

export default ArticleModel;
