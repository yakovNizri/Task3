import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { getMeetingByGroupId, getTeamsDev } from '../../Services/Api';
import MeetingItem from '../MeetingItem/MeetingItem';
import ModalCreateMeeting from '../ModalCreateMeeting/ModalCreateMeeting';
import "./Home.css"

function Home() {
    const [selectOption, setSelectOption] = useState<any>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>("-1");
    const [meeting, setMeeting] = useState<any>([]);
    const [modalShow, setModalShow] = React.useState(false);


    useEffect(() => {
        getTeamsDev().then((res) => {
            setSelectOption(res);
        });
    }, []);

    const handleSelect = async (e: any) => {
        setSelectedId(e.target.value);
        await getMeetingByGroupId(Number(e.target.value)).then((res) => {
            setMeeting(res);
        });
    }

    return <>
        <Navbar expand="lg" className="bg-body-tertiary" id="navber">
            <Container>
                <Navbar.Brand>Meetings</Navbar.Brand>
            </Container>
            <Button variant="primary" id="butCreateMeeting" onClick={() => setModalShow(true)} >create meeting</Button>
        </Navbar>


        <ModalCreateMeeting selectOption={selectOption} show={modalShow} onHide={() => setModalShow(false)} />

        <Form.Select aria-label="Default select example" value={selectedId} id="selectTeam"
            onChange={(e) => handleSelect(e)}>
            <option disabled value="-1">Select a development group</option>

            {selectOption?.map((team: any) => {
                return <option key={team.id} value={team.id}>{team.groupName}</option>
            })}
        </Form.Select>

        <br />

        <MeetingItem meeting={meeting} selectOption={selectOption}/>
    </>
}

export default Home