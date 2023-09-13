import fs from "fs/promises";
import path from "path";
import { RequestHandler } from "express";
import { IForm } from "../interfaces/Form.interface";
import { createForm, findRandomForm } from "../services/form.service";
const jsonFilePath = path.join(__dirname, "../mocks/form.json");

export const getForms: RequestHandler = async (_req, res, next) => {
  try {
    const formData = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(formData) as IForm;
    res.status(200).json(data);
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

export const postForm: RequestHandler = async (req, res, next) => {
  const { items } = req.body;
  try {
    const newForm = await createForm(items);
    res.status(201).json(newForm);
  } catch (error) {
    next(error);
  }
};
