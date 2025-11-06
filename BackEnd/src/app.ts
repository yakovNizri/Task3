import express from "express";
import { logMiddleware } from "./middlewares/logMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import { appConfig } from "./utils/config";
import { teamDevRouter } from "./controllers/teamDevController";
import { meetingRouter } from "./controllers/meetingController";

const server = express();

server.use(cors({origin: [
    "http://localhost:5173"    
]}))

server.use(express.json());

server.use(logMiddleware);

server.use(teamDevRouter);
server.use(meetingRouter);

server.use(errorHandler);

server.listen(appConfig.port, () => console.log(`Express server started.\nhttp://localhost:${appConfig.port}`));