import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal';
import { CloseCircleOutlined, InteractionTwoTone } from '@ant-design/icons';
import { Upload } from 'antd';


const InvoiceForm = () => {

   const [fields, setFields] = useState([{ id: Date.now() }]);

   const addField = () => {
      setFields([...fields, { id: Date.now() }]);
   };

   const removeField = (id) => {
      setFields(fields.filter(field => field.id !== id));
   };

   const [showModal, setShowModal] = useState(false);
   const [fields1, setFields1] = useState([{ id: 1 }]);

   const addField1 = () => {
      const newId = fields.length + 1;
      setFields1([...fields1, { id: newId }]);
   };

   const removeField1 = (id) => {
      setFields1(fields1.filter(field => field.id !== id));
   };

   const handleCloseModal = () => setShowModal(false);
   const handleShowModal = () => setShowModal(true);


   const [fileList, setFileList] = useState([]);
   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };
   // const onPreview = async (file) => {
   //    let src = file.url;
   //    if (!src) {
   //       src = await new Promise((resolve) => {
   //          const reader = new FileReader();
   //          reader.readAsDataURL(file.originFileObj);
   //          reader.onload = () => resolve(reader.result);
   //       });
   //    }
   //    const image = new Image();
   //    image.src = src;
   //    const imgWindow = window.open(src);
   //    imgWindow?.document.write(image.outerHTML);
   // };

   const customRequest = async ({ file, onSuccess }) => {
      // Simulate upload process
      setTimeout(() => {
        const updatedFile = { ...file, status: 'done' };
        onSuccess(updatedFile); // Notify Ant Design that the upload is successful
      }, 1000);
    };

   return (
      <div className='container'>
         <h1>Invoice Form</h1>
         <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Invoive Number</Form.Label>
               <Form.Control type="text" placeholder="Enter Invoive Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Date</Form.Label>
               <Form.Control type="date" placeholder="Enter Date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNumber">
               <Form.Label>Customer Name</Form.Label>
               <Form.Control type="text" placeholder="Enter Customer Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Ticket Number</Form.Label>
               <Form.Control type="text" placeholder="Enter Ticket Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
               <Form.Label>Product</Form.Label>
               <Form.Control type="text" placeholder="Enter Product" />
            </Form.Group>



            <div>
               <h4>Spares SubForm</h4>
               <div className="table-responsive">
                  <Table bordered>
                     <thead>
                        <tr>

                           <th>Material Name</th>
                           <th>Quantity</th>
                           <th>Price</th>
                           <th><InteractionTwoTone /></th>
                        </tr>
                     </thead>
                     <tbody>
                        {fields.map((field, index) => (
                           <tr key={field.id}>

                              <td>
                                 <FormControl type="text" className="form-control" />
                              </td>
                              <td>
                                 <FormControl type="number" className="form-control" />
                              </td>
                              <td>
                                 <FormControl type="number" className="form-control" />
                              </td>
                              <td>
                                 {fields.length > 1 && (
                                    <a danger onClick={() => removeField(field.id)} style={{ color: 'red' }}>
                                       <CloseCircleOutlined />
                                    </a>
                                 )}
                              </td>

                           </tr>
                        ))}
                     </tbody>
                  </Table>
                  <Button variant="primary" onClick={addField}>+ Add New</Button>
               </div>
            </div>

            <Button variant="warning" className="mt-3" onClick={handleShowModal}>Open Modal</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
               <Modal.Header closeButton>
                  <Modal.Title>Dynamic Form</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  {fields1.map((field, index) => (
                     <Form.Group className="mb-3" controlId={`formGroup${field.id}`} key={field.id}>
                        <Form.Label>Material Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Material Name" />
                        <Form.Label>Recived Date</Form.Label>
                        <Form.Control type="date" />
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter Quantity" />
                        <Form.Label>Condition</Form.Label>
                        <Form.Control as="select">
                           <option>Bad</option>
                           <option>Average</option>
                           <option>Good</option>
                        </Form.Control>
                        <Form.Label>Ticket ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter ID" />
                        <Form.Label>Dameged Image</Form.Label>

                        {/* <Upload
                              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                              listType="picture-card"
                              fileList={fileList}
                              onChange={onChange}
                              onPreview={onPreview}
                           >
                              {fileList.length < 5 && '+ Upload'}
                           </Upload> */}

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

                        {index === fields1.length - 1 && (
                           <Button variant="primary" className='mt-3' onClick={addField1}>Add Field</Button>
                        )}
                        {index !== fields1.length - 1 && (
                           <Button variant="danger" className='mt-3' onClick={() => removeField1(field.id)}>Remove Field</Button>
                        )}
                     </Form.Group>
                  ))}
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  {/* You can add a submit button here if needed */}
               </Modal.Footer>
            </Modal>

            <Form.Group className="mb-3" controlId="formGroup">

               <Button type="submit" className="float-end" >Submit</Button>{' '}
            </Form.Group>


         </Form>


      </div>
   )
}

export default InvoiceForm