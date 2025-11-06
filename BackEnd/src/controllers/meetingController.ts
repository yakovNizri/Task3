import { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../models/statusCode";
import { createMeeting, getMeetingByGroupId } from "../services/meetingServices";
import MeetingModel from "../models/MeetingModel";

export const meetingRouter = Router();

meetingRouter.get("/meetings", async (req: Request, res: Response, next: NextFunction) => {
    const gId = req.query.groupId ? Number(req.query.groupId) : undefined;
    const meetings = await getMeetingByGroupId(gId);

    res.status(StatusCode.Ok).json(meetings);
});

meetingRouter.post("/createMeeting", async (req: Request, res: Response, next: NextFunction) => {
    const meeting = new MeetingModel(req.body);
    const resulte = await createMeeting(meeting);

    res.status(StatusCode.Ok).json(resulte);
});