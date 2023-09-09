import { Request, Response } from "express";
import { findAllAnswers, findAnswerById } from "../services/answers.service";

export const getAnswers = async (_req: Request, res: Response) => {
  try {
    const answers = await findAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

export const getAnswer = async (req: Request, res: Response) => {
  const idAnswer = req.params.id;
  console.log(idAnswer);
  try {
    const answer = await findAnswerById(idAnswer);
    if (!answer)
      return res
        .status(404)
        .json({ error: `id: '${idAnswer}' does not belong to anything` });
    res.status(200).json(answer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
};
