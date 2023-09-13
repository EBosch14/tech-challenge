import { RequestHandler } from "express";
import {
  findAllAnswers,
  findAnswerById,
  createNewAnswer,
  updateAnswer,
} from "../services/answers.service";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { IAnswer } from "../interfaces/Form.interface";
import { TUpdateAnswer } from "../schemas/update-answers.schema";

export const getAnswers: RequestHandler = async (_req, res, next) => {
  try {
    const answers = await findAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
};

export const getAnswer: RequestHandler<
  { id: mongoose.Types.ObjectId },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
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
  items?: IAnswer;
}

export const postAnswers: RequestHandler<
  unknown,
  unknown,
  ICreateAnswerBody,
  unknown
> = async (req, res, next) => {
  const { items } = req.body;

  try {
    const createdAnswer = await createNewAnswer(items);
    res.status(201).json(createdAnswer);
  } catch (error) {
    next(error);
  }
};

export const pathAnswer: RequestHandler<
  TUpdateAnswer["params"],
  unknown,
  TUpdateAnswer["body"],
  unknown
> = async (req, res, next) => {
  const idAnswer = req.params.id as unknown as mongoose.Types.ObjectId;
  const { items } = req.body;
  try {
    const updatedAnswer = await updateAnswer(idAnswer, items);
    res.status(200).json(updatedAnswer);
  } catch (error) {
    next(error);
  }
};
