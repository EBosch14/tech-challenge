import { InferSchemaType, Schema, model } from "mongoose";

const answerSchema = new Schema(
  {
    items: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export type TAnswers = InferSchemaType<typeof answerSchema>;
console.log();
export default model<TAnswers>("Answers", answerSchema);
