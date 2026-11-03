import express, { Application, Request, Response, NextFunction } from "express";
// configs
import corsConfig from "./configs/cors.config";
import helmetConfig from "./configs/helmet.config";
import ratelimitConfig from "./configs/ratelimit.config";
import errorHandling from "./utils/errorHandling.util";
import compressionConfig from "./configs/compression.config";
import MongoDataBaseConnection from "./configs/db.config";
// routes
import IndexRoutes from "./routes/index.routes";

const app: Application = express();

MongoDataBaseConnection();
// configs using middlewares
app.use(ratelimitConfig);
app.use(compressionConfig);
app.use(express.json());
app.use(helmetConfig);
app.use(corsConfig);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use(IndexRoutes);

// error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandling.handlingAppError(err, res);
});

export default app;
