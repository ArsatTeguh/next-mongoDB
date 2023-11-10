import connectMongoDB from "@/lib/mongodb";
import ArticleModel from "@/models/modelArticle";

connectMongoDB();

export async function GetAll(_req, res) {
  try {
    const articles = await ArticleModel.find();
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500);
  }
}

export async function Created(req, res) {
  const { title, content, author } = req.body;
  try {
    const newArticle = new ArticleModel({ title, content, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    return res.status(500);
  }
}
