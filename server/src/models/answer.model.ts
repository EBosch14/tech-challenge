import { InferSchemaType, Schema, model } from "mongoose";

const answerItemSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: false },
  },
  { _id: false }
);

const answerSchema = new Schema(
  {
    items: {
      type: [answerItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export type TAnswers = InferSchemaType<typeof answerSchema>;
console.log();
export default model<TAnswers>("Answers", answerSchema);
