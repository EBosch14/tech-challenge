import express from "express";
import {
  getAnswers,
  getAnswer,
  postAnswers,
} from "../controllers/answers.controllers";

const answersRoutes = express.Router();

answersRoutes.post("/", postAnswers);
answersRoutes.get("/", getAnswers);
answersRoutes.get("/:id", getAnswer);

export default answersRoutes;
