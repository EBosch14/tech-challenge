import AnswerModel from "../models/answer.model";

export const findAllAnswers = async () => {
  return await AnswerModel.find().exec();
};
