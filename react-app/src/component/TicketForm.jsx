import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Upload } from 'antd';

const TicketForm = () => {
   const [warranty, setWarranty] = useState(''); // State to manage the selected warranty option
   const [showAdditionalFields, setShowAdditionalFields] = useState(false); // State to manage whether to show additional fields or not

   const handleWarrantyChange = (e) => {
      const selectedWarranty = e.target.value;
      setWarranty(selectedWarranty);
      // If user selects "Yes", show the additional fields, otherwise hide them
      setShowAdditionalFields(selectedWarranty === 'Yes');
   };

   const [fileList, setFileList] = useState([]);
   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   const customRequest = async ({ file, onSuccess }) => {
      // Simulate upload process
      setTimeout(() => {
         const updatedFile = { ...file, status: 'done' };
         onSuccess(updatedFile); // Notify Ant Design that the upload is successful
      }, 1000);
   };


   return (
      <div className='container'>
         <h1>TicketForm</h1>
         <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Ticket ID</Form.Label>
               <Form.Control type="text" placeholder="Enter Ticket ID" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Ticket Date</Form.Label>
               <Form.Control type="date" />
            </Form.Group>

            <Form.Label>Warranty</Form.Label>
            <Form.Control as="select" value={warranty} onChange={handleWarrantyChange}>
               <option value="">Select</option>
               <option value="Yes">Yes</option>
               <option value="No">No</option>
            </Form.Control>

            {showAdditionalFields && ( // Render additional fields only if showAdditionalFields is true
               <div>
                  <Form.Label>Warranty Image</Form.Label>
                  <Upload
                     action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                     listType="picture-card"
                     fileList={fileList}
                     onChange={onChange}
                     customRequest={customRequest}
                     style={{ border: '2px solid green' }} // Apply inline style here
                  >
                     {fileList.length < 5 && '+ Upload'}
                  </Upload>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                     <Form.Label>Warranty Number</Form.Label>
                     <Form.Control type="text" placeholder="Enter Customer Warranty Number" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupAddress">
                     <Form.Label>Date Of Purchase</Form.Label>
                     <Form.Control type="date" />
                  </Form.Group>
               </div>
            )}

            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Product</Form.Label>
               <Form.Control type="text" placeholder="Enter Product" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Customer Name</Form.Label>
               <Form.Control type="text" placeholder="Enter Customer Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Address</Form.Label>
               <Form.Control type="text" placeholder="Enter Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Status</Form.Label>
               <Form.Control as="select" >
                  <option value='Open'>Open</option>
                  <option value="Technician Assigned">Technician Assigned</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Closed">Closed</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Serial Number</Form.Label>
               <Form.Control type="text" placeholder="Enter Serial Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Technician Name</Form.Label>
               <Form.Control as="select" >
                  <option value="Technician 1">Technician 1</option>
                  <option value="Technician 2">Technician 2</option>
               </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Technician Email</Form.Label>
               <Form.Control type="email" placeholder="Enter Technician Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Schedule Date</Form.Label>
               <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Attended Date</Form.Label>
               <Form.Control type="date" />
            </Form.Group>
            <Form.Label>Before Service Image</Form.Label>
            <Upload
               action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
               listType="picture-card"
               fileList={fileList}
               onChange={onChange}
               customRequest={customRequest}
               style={{ border: '2px solid green' }} // Apply inline style here
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
               style={{ border: '2px solid green' }} // Apply inline style here
            >
               {fileList.length < 5 && '+ Upload'}
            </Upload>

            <Button variant="primary" className='mt-3 mb-3' >Submit</Button>{' '}

         </Form>
      </div>
   )
}

export default TicketForm