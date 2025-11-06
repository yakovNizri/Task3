import { runQuery } from "../dal/dal";
import MeetingModel from "../models/MeetingModel";

export async function getMeetingByGroupId(groupId: number): Promise<MeetingModel[]> {
    const q = `SELECT * FROM meeting WHERE groupId = ?`

    const res = await runQuery(q, [groupId]) as MeetingModel[];

    const meetings = [];

    res.forEach(row => {
        meetings.push({
            id: row.id,
            groupId: row.groupId,
            meetingStartDate: row.meetingStartDate,
            meetingEndDate: row.meetingEndDate,
            description: row.description,
            meetingRoom: row.meetingRoom
        });
    });

    return meetings;
}

export async function createMeeting(meeting: MeetingModel): Promise<string> {
    meeting.validate();
    const q1 = `SELECT COUNT(*) AS countMeeting FROM meeting 
                WHERE groupId = ? AND meetingStartDate < ? AND meetingEndDate > ?;`

    const countMeetingById = await runQuery(q1, [meeting.groupId, meeting.meetingEndDate, meeting.meetingStartDate]) as { countMeeting: number }[];

    if (countMeetingById[0].countMeeting === 0) {
        const q2 = `INSERT INTO meeting (groupId, meetingStartDate, meetingEndDate, description, meetingRoom)
        VALUES(?, ?, ?, ?, ?)`;

        await runQuery(q2, [meeting.groupId, meeting.meetingStartDate, meeting.meetingEndDate, meeting.description, meeting.meetingRoom])
        return 'The meeting was a success';
    }
    return 'There was a collision';

}