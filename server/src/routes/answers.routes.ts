import express from "express";
import { getAnswers } from "../controllers/answers.controllers";

const answersRoutes = express.Router();

answersRoutes.get("/", getAnswers);

export default answersRoutes;
