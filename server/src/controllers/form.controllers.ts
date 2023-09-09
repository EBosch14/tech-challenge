import fs from "fs/promises";
import path from "path";
import { RequestHandler } from "express";
import { IFormJSON } from "../interfaces/Form-json.interface";
const jsonFilePath = path.join(__dirname, "../mocks/form.json");

export const getForm: RequestHandler = async (_req, res, next) => {
  try {
    const formData = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(formData) as IFormJSON;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
