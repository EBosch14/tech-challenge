import express from "express";
import {
  getRandomForm,
  getForms,
  postForm,
} from "../controllers/form.controllers";

const formRoutes = express.Router();

formRoutes.get("/", getForms);
formRoutes.post("/", postForm);
formRoutes.get("/random", getRandomForm);

export default formRoutes;
