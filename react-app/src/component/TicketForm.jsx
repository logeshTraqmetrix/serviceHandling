import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Upload } from 'antd';
import axios from 'axios';

const TicketForm = () => {
   const [formValues, setFormValues] = useState({
      ticketId: '',
      ticketDate: '',
      warranty: '',
      warrantyNumber: '',
      dateOfPurchase: '',
      product: '',
      customerName: '',
      address: '',
      status: '',
      serialNumber: '',
      technicianName: '',
      technicianEmail: '',
      scheduledDate: '',
      attendedDate: ''
   });
   const [fileList, setFileList] = useState([]);
   const [showAdditionalFields, setShowAdditionalFields] = useState(false);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value
      });
   };

   const handleWarrantyChange = (e) => {
      const selectedWarranty = e.target.value;
      setFormValues({
         ...formValues,
         warranty: selectedWarranty
      });
      setShowAdditionalFields(selectedWarranty === 'Yes');
   };

   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   const customRequest = async ({ file, onSuccess }) => {
      setTimeout(() => {
         const updatedFile = { ...file, status: 'done' };
         onSuccess(updatedFile);
      }, 1000);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
         
      // try {
      //    const url = "/server/service_handling_function/ticketform";
      //    const response = await axios.post(url, {data:formValues} );
      //    console.log(response.data);
      // } catch (error) {
      //    console.error('Error:', error);
      // }

      try {
         const response = await axios.post('/server/service_handling_function/ticketform', {
            data:formValues
         });
         console.log(response.data);
       } catch (error) {
         if (error.response) {
           // Server responded with a status other than 2xx
           console.error('Error response:', error.response.data);
         } else if (error.request) {
           // No response was received
           console.error('Error request:', error.request);
         } else {
           // Something happened in setting up the request
           console.error('Error message:', error.message);
         }
       }
   };

   return (
      <div className='container'>
         <h1>TicketForm</h1>
         <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupTicketId">
               <Form.Label>Ticket ID</Form.Label>
               <Form.Control type="text" name="ticketId" placeholder="Enter Ticket ID" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupTicketDate">
               <Form.Label>Ticket Date</Form.Label>
               <Form.Control type="date" name="ticketDate" onChange={handleInputChange} />
            </Form.Group>
            <Form.Label>Warranty</Form.Label>
            <Form.Control as="select" name="warranty" value={formValues.warranty} onChange={handleWarrantyChange}>
               <option value="">Select</option>
               <option value="Yes">Yes</option>
               <option value="No">No</option>
            </Form.Control>

            {showAdditionalFields && (
               <div>
                  <Form.Label>Warranty Image</Form.Label>
                  <Upload
                     action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                     listType="picture-card"
                     fileList={fileList}
                     onChange={onChange}
                     customRequest={customRequest}
                     style={{ border: '2px solid green' }}
                  >
                     {fileList.length < 5 && '+ Upload'}
                  </Upload>
                  <Form.Group className="mb-3" controlId="formGroupWarrantyNumber">
                     <Form.Label>Warranty Number</Form.Label>
                     <Form.Control type="text" name="warrantyNumber" placeholder="Enter Customer Warranty Number" onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupDateOfPurchase">
                     <Form.Label>Date Of Purchase</Form.Label>
                     <Form.Control type="date" name="dateOfPurchase" onChange={handleInputChange} />
                  </Form.Group>
               </div>
            )}

            {/* Other form fields */}
            <Form.Group className="mb-3" controlId="formGroupProduct">
               <Form.Label>Product</Form.Label>
               <Form.Control type="text" name="product" placeholder="Enter Product" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCustomerName">
               <Form.Label>Customer Name</Form.Label>
               <Form.Control type="text" name="customerName" placeholder="Enter Customer Name" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
               <Form.Label>Address</Form.Label>
               <Form.Control type="text" name="address" placeholder="Enter Address" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupStatus">
               <Form.Label>Status</Form.Label>
               <Form.Control as="select" name="status" value={formValues.status} onChange={handleInputChange}>
                  <option value="Open">Open</option>
                  <option value="Technician Assigned">Technician Assigned</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Closed">Closed</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSerialNumber">
               <Form.Label>Serial Number</Form.Label>
               <Form.Control type="text" name="serialNumber" placeholder="Enter Serial Number" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupTechnicianName">
               <Form.Label>Technician Name</Form.Label>
               <Form.Control as="select" name="technicianName" onChange={handleInputChange}>
                  <option value="Technician 1">Technician 1</option>
                  <option value="Technician 2">Technician 2</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupTechnicianEmail">
               <Form.Label>Technician Email</Form.Label>
               <Form.Control type="email" name="technicianEmail" placeholder="Enter Technician Email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupScheduleDate">
               <Form.Label>Scheduled Date</Form.Label>
               <Form.Control type="date" name="scheduledDate" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAttendedDate">
               <Form.Label>Attended Date</Form.Label>
               <Form.Control type="date" name="attendedDate" onChange={handleInputChange} />
            </Form.Group>

            <Form.Label>Before Service Image</Form.Label>
            <Upload
               action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
               listType="picture-card"
               fileList={fileList}
               onChange={onChange}
               customRequest={customRequest}
               style={{ border: '2px solid green' }}
            >
               {fileList.length < 5 && '+ Upload'}
            </Upload>

            <Form.Label>After Service Image</Form.Label>
            <Upload
               action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
               listType="picture-card"
               fileList={fileList}
               onChange={onChange}
               customRequest={customRequest}
               style={{ border: '2px solid green' }}
            >
               {fileList.length < 5 && '+ Upload'}
            </Upload>

            <Button variant="primary" className='mt-3 mb-3' type="submit">Submit</Button>
         </Form>
      </div>
   )
}

export default TicketForm;
