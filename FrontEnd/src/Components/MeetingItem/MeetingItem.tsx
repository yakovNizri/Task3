import Card from 'react-bootstrap/Card';
import "./MeetingItem.css"

function MeetingItem({ meeting, selectOption }: any) {

    return (
        <>
            {meeting.length === 0 ? (
                <h6 id="msgNoGroupDisplay">
                    No group selected to display meetings
                </h6>
            ) : (
                <div id="containerCardItem">
                    {meeting.map((meet: any) => (
                        <Card key={meet.id} className="card">
                            <Card.Body>
                                <Card.Title>{selectOption.find((s: any) => s.id === meet.groupId)?.groupName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {meet.meetingRoom}
                                </Card.Subtitle>
                                <Card.Text>
                                    {meet.description}
                                </Card.Text>
                                <Card.Text>
                                    <b>Start:</b> {meet.meetingStartDate}<br />
                                    <b>End:</b> {meet.meetingEndDate}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}

export default MeetingItem;
