import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 

const TechnicianFrom = () => {
  return (
    <div className='container'>
      <h1>Technician Form</h1>
      <Form>
         <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Technician Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Technician Name" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter phone Number" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>WhatsApp Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Technician WhatsaApp Number" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" />
         </Form.Group>
         <Button variant="primary"  >Submit</Button>{' '}
         
      </Form>
    </div>
  )
}

export default TechnicianFrom