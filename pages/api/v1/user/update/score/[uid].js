import connectDB from "../../../../../../db/connectDB";
import User from "../../../../../../models/User";

connectDB();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { uid } = req.query;
    try {
      const { score } = req.body;
      if (!score) throw Error("Score is required!");
      const { high_score } = await User.findById(uid);
      if (score <= high_score)
        throw Error("Score is lower than the previous high score");
      const user = await User.findByIdAndUpdate(
        uid,
        { high_score: score },
        { new: true }
      );
      return res.status(200).json({ error: false, data: user });
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
