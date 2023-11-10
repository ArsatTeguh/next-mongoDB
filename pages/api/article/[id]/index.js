import connectMongoDB from "@/lib/mongodb";
import ArticleModel from "@/models/modelArticle";

connectMongoDB();
export default async function DELETE(req, res) {
  const { id } = req.query;
  try {
    await ArticleModel.findByIdAndDelete(id);
    if (!ArticleModel) {
      return res.status(404).json({ error: "Article not found" });
    }
    return res.status(200).json({ message: "success delete article" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
