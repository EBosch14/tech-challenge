/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

export const errorMessage = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  let errorMessage = "Something went wrong";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
};
