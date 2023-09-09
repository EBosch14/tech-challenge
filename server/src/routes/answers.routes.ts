import express from "express";
import { getAnswers, getAnswer } from "../controllers/answers.controllers";

const answersRoutes = express.Router();

answersRoutes.get("/", getAnswers);
answersRoutes.get("/:id", getAnswer);

export default answersRoutes;
