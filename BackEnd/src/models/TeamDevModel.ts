import Joi from "joi";
import { ValidationError } from "./exceptions";

class TeamDevModel {
    id?: number;
    groupName: string;    

    constructor(team : TeamDevModel){
        this.id = team.id;
        this.groupName = team.groupName;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive(),
        groupName: Joi.string().required().min(3).max(20)
    })

    validate() {
        const res = TeamDevModel.validationSchema.validate(this);
        if (res.error)
            throw new ValidationError(res.error.details[0].message);
    }
}

export default TeamDevModel