import mongoose from "mongoose";

export const PermitSchema = new mongoose.Schema({
  to: {
    type: String,
    required: [true],
    // required: [true, "Please provide a unique email"],
  },
  from: {
    type: String,
    // unique: false,
  },
  // From: {
  //   type: String,
  //   // required: [true, "Please provide a unique email"],
  // },

  // request: {
  //   type: Boolean,
  // },
  // peruqid: {
  //   type: String,
  // },
});

export default mongoose.model.Permits || mongoose.model("Permit", PermitSchema);
