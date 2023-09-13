import { InputsType } from "../interfaces/Form.interface";
import mongoose from "mongoose";

const optionSchema = {
  label: { type: String, required: true },
  value: { type: String, required: true },
};

const commonSchema = {
  type: { type: String, enum: InputsType, required: true },
  options: {
    type: [optionSchema],
    default: undefined,
  },
  name: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, required: false, default: false },
};

const answerItemSchema = new mongoose.Schema({
  ...commonSchema,
  response: { type: String, required: false, default: "" },
});

answerItemSchema.pre("save", function (next) {
  if (this.required && !this.response) {
    next(new Error("Response is required"));
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

const formSchema = new mongoose.Schema({
  items: {
    type: [commonSchema],
    required: true,
  },
});

export type TAnswers = mongoose.InferSchemaType<typeof answerSchema>;
export type TForm = mongoose.InferSchemaType<typeof formSchema>;
export const AnswerModel = mongoose.model<TAnswers>("Answers", answerSchema);
export const FormModel = mongoose.model<TForm>("Templates", formSchema);
