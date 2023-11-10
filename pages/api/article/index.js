import { GetAll, Created } from "./route";

export default function Article(req, res) {
  switch (req.method) {
    case "GET":
      return GetAll(req, res);
    case "POST":
      return Created(req, res);

    default:
      return res.status(405).end(); // Method Not Allowed
  }
}
