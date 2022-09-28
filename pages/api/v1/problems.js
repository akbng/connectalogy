import { getListOfProblems } from "../../../logic";

export default function handler(req, res) {
  const { level, limit } = req.query;
  const problems = getListOfProblems(level, limit);
  res.status(200).json({ error: false, data: problems });
}
