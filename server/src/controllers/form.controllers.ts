import { RequestHandler } from "express";
import { IForm } from "../interfaces/Form.interface";
import {
  createForm,
  findAllForms,
  findRandomForm,
} from "../services/form.service";

export const getForms: RequestHandler = async (_req, res, next) => {
  try {
    const allForms = await findAllForms();
    res.status(200).json(allForms);
  } catch (error) {
    next(error);
  }
};

export const getRandomForm: RequestHandler = async (req, res, next) => {
  try {
    const foundedForm = await findRandomForm();
    res.status(200).json(foundedForm);
  } catch (error) {
    next(error);
  }
};

interface ICreateFormBody {
  items: IForm;
}

export const postForm: RequestHandler<
  unknown,
  unknown,
  ICreateFormBody,
  unknown
> = async (req, res, next) => {
  const { items } = req.body;
  try {
    const newForm = await createForm(items);
    res.status(201).json(newForm);
  } catch (error) {
    next(error);
  }
};
