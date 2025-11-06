import Card from 'react-bootstrap/Card';

function MeetingItem({ meeting }: any) {

    return (
        <>
            {meeting.length === 0 ? (
                <h6 style={{ color: "grey", margin: "20px" }}>
                    No group selected to display meetings
                </h6>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-around",flexWrap: "wrap",gap: "30px"}}>
                    {meeting.map((meet: any) => (
                        <Card key={meet.id} style={{ width: '18rem', marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>{meet.groupId}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {meet.meetingRoom}
                                </Card.Subtitle>
                                <Card.Text>
                                    {meet.description}
                                </Card.Text>
                                <Card.Text>
                                    Start: {meet.meetingStartDate}<br />
                                    End: {meet.meetingEndDate}
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
