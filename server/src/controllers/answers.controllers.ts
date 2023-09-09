import { RequestHandler } from "express";
import {
  findAllAnswers,
  findAnswerById,
  createNewAnswer,
} from "../services/answers.service";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAnswers: RequestHandler = async (_req, res, next) => {
  try {
    const answers = await findAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
};

export const getAnswer: RequestHandler = async (req, res, next) => {
  const idAnswer = req.params.id;
  console.log(idAnswer);
  try {
    if (!mongoose.isValidObjectId(idAnswer))
      throw createHttpError(400, "Invalid answer id");

    const answer = await findAnswerById(idAnswer);
    if (!answer) throw createHttpError(404, "Answer not found");

    res.status(200).json(answer);
  } catch (error) {
    next(error);
  }
};

interface ICreateAnswerBody {
  items?: [{ label: string; value?: string }];
}

export const postAnswers: RequestHandler<
  unknown,
  unknown,
  ICreateAnswerBody,
  unknown
> = async (req, res, next) => {
  const { items } = req.body;

  try {
    if (!items || !items.length)
      throw createHttpError(400, "Answers must be have a items");

    if (!items.every((item) => "label" in item && "value" in item))
      throw createHttpError(
        400,
        "Elements must have the properties: 'label' and 'value'."
      );
    if (!items.every((item) => item.label !== ""))
      throw createHttpError(400, "Prop 'label' cannot be empty");

    const createdAnswer = await createNewAnswer(items);
    res.status(201).json(createdAnswer);
  } catch (error) {
    next(error);
  }
};
