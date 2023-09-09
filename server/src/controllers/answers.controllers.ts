import { Request, Response } from "express";
import { findAllAnswers } from "../services/find-all-answers.service";

export const getAnswers = async (_req: Request, res: Response) => {
  try {
    const answers = await findAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};
