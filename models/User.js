import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 80,
      trim: true,
      required: "User name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        "Please fill a valid email address",
      ],
    },
    image: {
      type: String,
      trim: true,
      match: [
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        "Please fill a valid url",
      ],
    },
    high_score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || new mongoose.model("User", userSchema);

export default User;
