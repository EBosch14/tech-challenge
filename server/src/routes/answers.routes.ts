import express from "express";
import {
  getAnswers,
  getAnswer,
  postAnswers,
  pathAnswer,
} from "../controllers/answers.controllers";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import AnswersSchemaZod from "../schemas/answers.schema";

const answersRoutes = express.Router();

answersRoutes.post("/", schemaValidator(AnswersSchemaZod), postAnswers);
answersRoutes.get("/", getAnswers);
answersRoutes.get("/:id", getAnswer);
answersRoutes.patch("/:id", pathAnswer);

export default answersRoutes;
