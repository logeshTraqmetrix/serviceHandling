import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ViewTicket = () => {
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [technicianName, setTechnicianName] = useState('');
  const [technicianEmail, setTechnicianEmail] = useState('');

  

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get('/server/service_handling_function/getticket');
        setDatas(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicket();
  }, []);

  const handleShow = (ticket) => {
    setCurrentTicket(ticket);
    setTechnicianName(ticket.technicianName);
    setTechnicianEmail(ticket.technicianEmail);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    // Construct a JSON object with the updated row details
    let updatedRowData = {
      technicianName,
      technicianEmail,
      ROWID: currentTicket.ROWID // Ensure ROWID is used here
    };

    try {
      // Make the PUT request to update the row
      const res = await axios.put(`/server/service_handling_function/updateticket/${currentTicket.ROWID}`, updatedRowData);

      // Update the local state with the new data
      const updatedDatas = datas.map(data =>
        data.ROWID === currentTicket.ROWID
          ? { ...data, technicianName, technicianEmail }
          : data
      );
      setDatas(updatedDatas);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <h4>Ticket Table</h4>
      <div className="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Ticket Date</th>
              <th>Product</th>
              <th>Technician Name</th>
              <th>Customer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{data.ticketId}</td>
                <td>{data.ticketDate}</td>
                <td>{data.product}</td>
                <td>{data.technicianName}</td>
                <td>{data.customerName}</td>
                <td>
                  <Button onClick={() => handleShow(data)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTechnicianName">
              <Form.Label>Technician Name</Form.Label>
              <Form.Control
                type="text"
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTechnicianEmail">
              <Form.Label>Technician Email</Form.Label>
              <Form.Control
                type="email"
                value={technicianEmail}
                onChange={(e) => setTechnicianEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewTicket;
