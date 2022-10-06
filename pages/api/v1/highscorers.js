import connectDB from "../../../db/connectDB";
import User from "../../../models/User";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { limit } = req.query;
      const scores = await User.find()
        .sort("-high_score")
        .limit(limit || 50)
        .select("-email");
      return res.status(200).json({
        error: false,
        data: scores,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        reason: error.reason || error.message,
      });
    }
  }
  res.status(405).json({
    error: true,
    reason: `${req.method} is not allowed on this route`,
  });
}
