import axios from "axios";

const apiUrl = "http://localhost:3030";

export async function getTeamsDev(): Promise<any[]> {
    const res = await axios.get(`${apiUrl}/teamsDev`);

    return res.data;
}

export async function getMeetingByGroupId(groupId: number): Promise<any[]> {
    const res = await axios.get(`${apiUrl}/meetings?groupId=${groupId}`);

    return res.data;
}

export async function createMeeting({ groupId, meetingRoom, description, meetingStartDate, meetingEndDate }: any): Promise<string> {
    const gid = Number(groupId);
    const res = await axios.post(`${apiUrl}/createMeeting`, { groupId: gid, meetingRoom: meetingRoom, description: description, meetingStartDate: meetingStartDate, meetingEndDate: meetingEndDate });

    return res.data;
}