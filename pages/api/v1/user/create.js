import connectDB from "../../../../db/connectDB";
import User from "../../../../models/User";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, image } = req.body;
      const duplicateUser = await User.exists({ email: email });
      if (duplicateUser)
        return res.status(200).json({ error: false, data: duplicateUser });
      const user = await User.create({ name, email, image });
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
