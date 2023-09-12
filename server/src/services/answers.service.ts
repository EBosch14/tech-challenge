import { Types } from "mongoose";
import AnswerModel from "../models/answer.model";
import { IItemAnswer } from "../interfaces/Form.interface";

export const findAllAnswers = async () => {
  return await AnswerModel.find().exec();
};

export const findAnswerById = async (id: Types.ObjectId) => {
  const foundedAnswer = await AnswerModel.findById(id);
  return foundedAnswer;
};

export const createNewAnswer = async (items: [IItemAnswer] | undefined) => {
  const newAnswer = new AnswerModel({
    items,
  });
  return await newAnswer.save();
};

interface IItemsUpdate {
  _id: string;
  response: string | number;
}

export const updateAnswer = async (
  id: Types.ObjectId,
  items: IItemsUpdate[]
) => {
  const foundedAnswer = await findAnswerById(id);
  if (!foundedAnswer) throw new Error("Answer not found!");
  items?.forEach((itemUpdate) => {
    const item = foundedAnswer.items.find((item) => item.id === itemUpdate._id);
    if (!item) throw new Error("Item not found!");
    if (item.options) {
      const foundValue = item.options.find(
        (option) => option.value === itemUpdate.response
      );
      if (!foundValue) throw new Error("Response not allowed!");
      item.response = itemUpdate.response;
    } else if (!item.options) {
      item.response = itemUpdate.response;
    }
  });
  return await foundedAnswer.save();
};
