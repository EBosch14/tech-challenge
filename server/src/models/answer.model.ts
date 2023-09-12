import { InputsType } from "../interfaces/Form.interface";
import mongoose from "mongoose";

const answerItemSchema = new mongoose.Schema({
  type: { type: String, enum: InputsType, required: true },
  options: {
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    default: undefined,
  },
  name: { type: String, required: true },
  label: { type: String, required: true },
  response: { type: mongoose.Schema.Types.Mixed, required: false, default: "" },
});

answerItemSchema.pre("save", function (next) {
  if (typeof this.response !== "string" && typeof this.response !== "number") {
    next(new Error("Response must be a string or number"));
  } else {
    next();
  }
});

const answerSchema = new mongoose.Schema(
  {
    items: {
      type: [answerItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export type TAnswers = mongoose.InferSchemaType<typeof answerSchema>;
export default mongoose.model<TAnswers>("Answers", answerSchema);
