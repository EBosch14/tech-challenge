import express from "express";
import { getForm } from "../controllers/form.controllers";

const formRoutes = express.Router();

formRoutes.get("/", getForm);

export default formRoutes;
