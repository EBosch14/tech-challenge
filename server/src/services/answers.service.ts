import { Types } from "mongoose";
import AnswerModel, { TAnswers } from "../models/answer.model";
import { IItemAnswer } from "../interfaces/Form.interface";

export const findAllAnswers = async () => {
  return await AnswerModel.find().exec();
};

export const findAnswerById = async (
  id: Types.ObjectId
): Promise<TAnswers | null> => {
  return await AnswerModel.findById(id).exec();
};

export const createNewAnswer = async (
  items: [IItemAnswer] | undefined
): Promise<TAnswers> => {
  const newAnswer = new AnswerModel({
    items,
  });
  return await newAnswer.save();
};
