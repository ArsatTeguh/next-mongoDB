import connectMongoDB from "@/lib/mongodb";
import ArticleModel from "@/models/modelArticle";

connectMongoDB();

export async function DeleteArticle(req, res) {
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

export async function PutArticle(req, res) {
  const { id } = req.query;
  const { title, content, author } = req.body;
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
