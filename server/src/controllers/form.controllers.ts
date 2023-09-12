import fs from "fs/promises";
import path from "path";
import { RequestHandler } from "express";
import { IForm } from "../interfaces/Form.interface";
const jsonFilePath = path.join(__dirname, "../mocks/form.json");

export const getForm: RequestHandler = async (_req, res, next) => {
  try {
    const formData = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(formData) as IForm;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
