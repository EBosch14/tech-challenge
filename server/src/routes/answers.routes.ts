import express from "express";
import {
  getAnswers,
  getAnswer,
  postAnswers,
  pathAnswer,
} from "../controllers/answers.controllers";

const answersRoutes = express.Router();

answersRoutes.post("/", postAnswers);
answersRoutes.get("/", getAnswers);
answersRoutes.get("/:id", getAnswer);
answersRoutes.patch("/:id", pathAnswer);

export default answersRoutes;
