import express from "express";
import {
  getAnswers,
  getAnswer,
  postAnswers,
  pathAnswer,
} from "../controllers/answers.controllers";
import { schemaValidator } from "../middlewares/schema-validator.middleware";
import AnswersSchemaZod from "../schemas/create-answers.schema";
import UpdateAsnwerSchema from "../schemas/update-answers.schema";

const answersRoutes = express.Router();

answersRoutes.post("/", schemaValidator(AnswersSchemaZod), postAnswers);
answersRoutes.get("/", getAnswers);
answersRoutes.get("/:id", getAnswer);
answersRoutes.patch("/:id", schemaValidator(UpdateAsnwerSchema), pathAnswer);

export default answersRoutes;
