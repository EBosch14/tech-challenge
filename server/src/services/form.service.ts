import { IForm } from "src/interfaces/Form.interface";
import { FormModel } from "../models/answer.model";

export const findAllForms = async () => {
  return await FormModel.find().exec();
};

export const findRandomForm = async () => {
  const totalForms = await FormModel.countDocuments().exec();
  const randomIndex = Math.floor(Math.random() * totalForms);
  const form = await FormModel.findOne().skip(randomIndex).exec();
  return form;
};

export const createForm = async (items: IForm) => {
  const newForm = new FormModel({
    items,
  });
  return await newForm.save();
};
