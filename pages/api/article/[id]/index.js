import { DeleteArticle, PutArticle } from "./route";

export default function Handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return DeleteArticle(req, res);
    case "PUT":
      return PutArticle(req, res);

    default:
      return res.status(405).end(); // Method Not Allowed
  }
}
