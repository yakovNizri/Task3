import Joi from "joi";
import { ValidationError } from "./exceptions";

class MeetingModel {
    id?: number;
    groupId: string;
    meetingStartDate: Date;
    meetingEndDate: Date;
    description: string;
    meetingRoom: string;

    constructor(meetings: MeetingModel) {
        this.id = meetings.id;
        this.groupId = meetings.groupId;
        this.meetingStartDate = meetings.meetingStartDate;
        this.meetingEndDate = meetings.meetingEndDate;
        this.description = meetings.description;
        this.meetingRoom = meetings.meetingRoom;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive(),
        groupId: Joi.number().required().positive(),
        meetingStartDate: Joi.date().required(),
        meetingEndDate: Joi.date().required(),
        description: Joi.string().required().min(3).max(50),
        meetingRoom: Joi.string().required().min(3).max(30)
    }).custom((value, helpers) => {
        if (value.meetingEndDate < value.meetingStartDate) {
            return helpers.error('date.range.invalid');
        }
        return value;
    }).messages({
        'date.range.invalid': '"meetingEndDate" must be greater than "meetingStartDate"'
    });

    validate() {
        const res = MeetingModel.validationSchema.validate(this);
        if (res.error)
            throw new ValidationError(res.error.details[0].message);
    }
}

export default MeetingModel