import { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../models/statusCode";
import { getAllTeamsDev } from "../services/teamDevServices";

export const teamDevRouter = Router();

teamDevRouter.get("/teamsDev", async (req: Request, res: Response, next: NextFunction) => {
    const teams = await getAllTeamsDev();

    res.status(StatusCode.Ok).json(teams);
});