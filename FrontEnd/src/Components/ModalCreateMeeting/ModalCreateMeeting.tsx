import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { createMeeting } from '../../Services/Api';
import "./ModalCreateMeeting.css"

function ModalCreateMeeting({ selectOption, show, onHide, ...rest }: any) {
    const [formData, setFormData] = useState({
        groupId: -1,
        meetingRoom: "",
        description: "",
        meetingStartDate: "",
        meetingEndDate: "",
    });

    const [msgSubmit, setMsgSubmit] = useState("");
    const [classMsgSubmit, setClassMsgSubmit] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    const groups = selectOption || [];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.groupId || formData.groupId === -1)
            newErrors.groupId = "You must select a group";

        if (!formData.meetingRoom.trim())
            newErrors.meetingRoom = "Meeting room must be filled";

        if (!formData.description.trim())
            newErrors.description = "A description must be filled";

        if (!formData.meetingStartDate)
            newErrors.meetingStartDate = "A start date must be selected.";

        if (!formData.meetingEndDate)
            newErrors.meetingEndDate = "Must select an end date";

        if (formData.meetingStartDate && formData.meetingEndDate && formData.meetingStartDate >= formData.meetingEndDate)
            newErrors.meetingEndDate = "End date must be after start date";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validate()) {
            await createMeeting(formData).then((res) => {
                setFormData({
                    groupId: -1,
                    meetingRoom: "",
                    description: "",
                    meetingStartDate: "",
                    meetingEndDate: "",
                })
                setMsgSubmit(res);
                if(res === "There was a collision in meeting"){
                    setClassMsgSubmit("msgSubmitWarning");
                } else if(res === "The meeting was a success"){
                    setClassMsgSubmit("msgSubmitSeccess");
                } 
            }).catch((error) => {
                setMsgSubmit(error.response.data);
                setClassMsgSubmit("msgSubmitError");
            })
        }
    };

    return (
        <Modal show={show} onHide={onHide} {...rest} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create meeting</Modal.Title>
            </Modal.Header>
            <h6 id="msgSubmit" className={classMsgSubmit}>{msgSubmit}</h6>

            <Modal.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Group name *</Form.Label>
                        <Form.Select
                            name="groupId"
                            value={formData.groupId}
                            onChange={handleChange}
                            isInvalid={!!errors.groupId}
                        >
                            <option disabled value="-1">Select group</option>
                            {groups.map((team: any) => (
                                <option key={team.id} value={team.id}>
                                    {team.groupName}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.groupId}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Meeting room *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter meeting room"
                            name="meetingRoom"
                            value={formData.meetingRoom}
                            onChange={handleChange}
                            isInvalid={!!errors.meetingRoom}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meetingRoom}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start date *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="meetingStartDate"
                            value={formData.meetingStartDate}
                            onChange={handleChange}
                            isInvalid={!!errors.meetingStartDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meetingStartDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End date *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="meetingEndDate"
                            value={formData.meetingEndDate}
                            onChange={handleChange}
                            isInvalid={!!errors.meetingEndDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meetingEndDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit">
                            Create meeting
                        </Button>
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCreateMeeting;