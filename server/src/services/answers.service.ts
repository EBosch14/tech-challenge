import { isValidObjectId } from "mongoose";
import AnswerModel, { TAnswers } from "../models/answer.model";

export const findAllAnswers = async () => {
  return await AnswerModel.find().exec();
};

export const findAnswerById = async (id: string): Promise<TAnswers | null> => {
  if (!isValidObjectId(id)) return null;
  return await AnswerModel.findById(id).exec();
};
