import express from "express";
import answersRoutes from "./answers.routes";
import formRoutes from "./form.routes";

const routes = express.Router();

routes.use("/answers", answersRoutes);
routes.use("/form", formRoutes);

export default routes;
