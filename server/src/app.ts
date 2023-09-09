import express from "express";
import morgan from "morgan";
import routes from "./routes";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(createHttpError(404, "Endpoint not found"));
  }
);

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    console.error(error);
    let errorMessage = "Something went wrong";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.statusCode;
      errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
  }
);

export default app;
