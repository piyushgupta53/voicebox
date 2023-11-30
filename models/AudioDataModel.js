import mongoose, { Schema, model } from "mongoose";

const AudioDataSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Please enter text to convert"],
  },
  character: {
    type: String,
    required: [true, "Please choose a character"],
  },
  audioURL: {
    type: String,
  },
});

const AudioData = model.AudioData || model("AudioData", AudioDataSchema);

export default AudioData;
