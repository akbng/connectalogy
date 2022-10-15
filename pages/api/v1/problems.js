import { getListOfProblems } from "../../../logic";

export default function handler(req, res) {
  const { level, limit, mode } = req.query;
  const problems = getListOfProblems(level, limit, mode);
  res.status(200).json({ error: false, data: problems });
}
