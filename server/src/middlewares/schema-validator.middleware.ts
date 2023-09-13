/* eslint-disable indent */
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        schema.parse({ body: req.body, query: req.query, params: req.params })
      );
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const msgError = error.errors.map((err) => err.message);
        console.log("hola");
        next(createHttpError(412, { msgError }));
      }
      next(error);
    }
  };
