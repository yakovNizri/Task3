import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function ModalCreateMeeting(props: any) {
    const [formData, setFormData] = useState({
        groupName: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const groups = props.selectOption ? props.selectOption : [];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // כאן אפשר לשלוח לשרת או לעדכן state גלובלי
    };

    return <>
        <Modal {...props} size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create meeting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Group name</Form.Label>
                        <Form.Select
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange}
                        >
                            <option disabled value="">Select group</option>
                            {groups?.map((m:any) => (
                                <option key={m.id} value={m.id}>
                                    {m.groupName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add meeting
                    </Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default ModalCreateMeeting