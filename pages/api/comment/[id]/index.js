import connectMongoDB from "@/lib/mongodb";
import ArticleModel from "@/models/modelArticle";

connectMongoDB();

export default async function POST(req, res) {
  const { id } = req.query;
  const { user, text } = req.body;

  try {
    const article = await ArticleModel.findById(id);
    article.comment.push({ user, text });
    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}
