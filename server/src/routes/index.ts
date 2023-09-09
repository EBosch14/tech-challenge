import express from "express";
import answersRoutes from "./answers.routes";

const routes = express.Router();

routes.use("/answers", answersRoutes);

export default routes;
