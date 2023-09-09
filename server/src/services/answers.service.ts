import AnswerModel, { TAnswers } from "../models/answer.model";

export const findAllAnswers = async () => {
  return await AnswerModel.find().exec();
};

export const findAnswerById = async (id: string): Promise<TAnswers | null> => {
  return await AnswerModel.findById(id).exec();
};

export const createNewAnswer = async (
  items: [{ label: string; value?: string }]
): Promise<TAnswers> => {
  const newAnswer = new AnswerModel({
    items,
  });
  return await newAnswer.save();
};
