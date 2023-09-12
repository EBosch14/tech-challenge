import { RequestHandler } from "express";
import {
  findAllAnswers,
  findAnswerById,
  createNewAnswer,
} from "../services/answers.service";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { IItemAnswer } from "../interfaces/Form.interface";

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
  items?: [IItemAnswer];
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

interface IUpdateAnswer {
  items?: mongoose.Types.DocumentArray<{ label: string; value?: string }>;
}

export const pathAnswer: RequestHandler<
  { id: mongoose.ObjectId },
  unknown,
  IUpdateAnswer,
  unknown
> = async (req, res, next) => {
  // const idAnswer = req.params.id;
  // const { items } = req.body;
  try {
    // if (!mongoose.isValidObjectId(idAnswer))
    //   throw createHttpError(400, "Invalid answer id");
    // if (!items || !items.length) throw createHttpError(400, "No items data");
    // const answer = await findAnswerById(idAnswer);
    // if (!answer) throw createHttpError(404, "Answer not found");
    // if (answer instanceof mongoose.Document) {
    //   answer.items = items;
    //   const updatedAnswer = await answer.save();
    //   return res.status(200).json(updatedAnswer);
    // } else throw createHttpError(500, "Error to update answer.");
  } catch (error) {
    next(error);
  }
};
