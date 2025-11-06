import { runQuery } from "../dal/dal"
import TeamDevModel from "../models/TeamDevModel";

export async function getAllTeamsDev(): Promise<TeamDevModel[]> {
    const q = "SELECT * FROM teamDev;"

    const res = await runQuery(q) as TeamDevModel[];

    const teams = [];

    res.forEach(row => {
        teams.push({
            id: row.id,
            groupName: row.groupName
        });
    });

    return res;
}