import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import { CloseCircleOutlined, InteractionTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import axios from "axios";

const InvoiceForm = () => {
  const [materialName, setMaterialName] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [condition, setCondition] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [scrapData, setScrapData] = useState([{}]);
  const [invoiceNumberRow, setInvoiceNumberRow] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [ticketNumber, setTicketNumber] = useState('')
  // const [product, setProduct] = useState('')


  const [fileList, setFileList] = useState([]);

  const onChange = (info) => {
    let newFileList = [...info.fileList];

    // Limiting to one file
    if (newFileList.length > 1) {
      newFileList = [newFileList[newFileList.length - 1]];
    }

    setFileList(newFileList);
  };

  const customRequest = async ({ file, onSuccess }) => {
    // Simulate upload process
    setTimeout(() => {
      const updatedFile = { ...file, status: "done" };
      onSuccess(updatedFile); // Notify Ant Design that the upload is successful
    }, 1000);
  };

  // const handleSubmit = () => {
  //   const newFormData = {
  //     materialName: materialName,
  //     receivedDate: receivedDate,
  //     quantity: quantity,
  //     condition: condition,
  //     ticketId: ticketId,
  //     // Add more fields as needed
  //   };

  //   setScrapData((prevScrapData) => [...prevScrapData, newFormData]);
  //   handleCloseModal();
  // };

  //   useEffect(() => {
  //     console.log(scrapData); // This will log the updated state every time it changes
  //   }, [scrapData]);

  // const [fields, setFields] = useState([
  //   { uniqueKey: Date.now(), invoiceNumberRowId: 0, materialName: "", quantity: "", price: "" },
  // ]);

  // const addField = () => {
  //   setFields([
  //     ...fields,
  //     { uniqueKey: Date.now(), invoiceNumberRowId: 0, materialName: "", quantity: "", price: "" },
  //   ]);
  // };

  // const removeField = (uniqueKey) => {
  //   setFields(fields.filter((field) => field.uniqueKey !== uniqueKey));
  // };

  // const handleChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newFields = fields.map((field, i) => {
  //     if (i === index) {
  //       return { ...field, [name]: value };
  //     }
  //     return field;
  //   });
  //   setFields(newFields);
  // };





  //   const handleDateChange = (e) => {
  //    const input = e.target.value;
  //    const [year, month, day] = input.split('-');
  //    const formattedDate = `${year}-${month}-${day}`;
  //    setInvoiceDate(formattedDate);
  //  };


  const handlePostData = async () => {
    const invoicePayload = {
      invoiceNumber,
      invoiceDate,
      customerName,
      ticketNumber,
      product
    };

    console.log(invoicePayload);


    try {
      const response = await axios.post('/server/service_handling_function/add-invoice', { data: invoicePayload })
      const rowId = response.data.ROWID
      console.log(parseInt(rowId))



      const sparePlayload = fields.map(obj => ({
        ...obj,
        invoiceNumberRowId: parseInt(rowId)
      }));

      try {
        const url = "/server/service_handling_function/add-spares-sub";
        console.log("Sending data to server:", fields); // Debugging log
        const response = await axios.post(url, { data: sparePlayload });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error(error);
    }

  }


  const [product, setProduct] = useState('');
  const [fields, setFields] = useState([{ uniqueKey: Date.now(), materialName: '', quantity: '', price: '' }]);

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const addField = () => {
    setFields([...fields, { uniqueKey: Date.now(), materialName: '', quantity: '', price: '' }]);
  };

  const removeField = (uniqueKey) => {
    setFields(fields.filter(field => field.uniqueKey !== uniqueKey));
  };



  const [scrapOption, setScrapOption] = useState('');
  const [scrapForms, setScrapForms] = useState([
    {
      uniqueKey: Date.now(),
      material: '',
      receivedDate: '',
      qty: 0,
      condition: '',
      ticket: '',
      uploadList: []
    }
  ]);

  const handleScrapFormChange = (index, e) => {
    const values = [...scrapForms];
    values[index][e.target.name] = e.target.value;
    setScrapForms(values);
  };

  const handleUploadChange = (index, { fileList }) => {
    const values = [...scrapForms];
    values[index].uploadList = fileList;
    setScrapForms(values);
  };

  const addScrapForm = () => {
    setScrapForms([
      ...scrapForms,
      {
        uniqueKey: Date.now(),
        material: '',
        receivedDate: '',
        qty: 0,
        condition: '',
        ticket: '',
        uploadList: []
      }
    ]);
  };

  const removeScrapForm = (uniqueKey) => {
    setScrapForms(scrapForms.filter(form => form.uniqueKey !== uniqueKey));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(scrapForms)

      scrapForms.map((obj)=>{
        // console.log(obj.uploadList[0])
   
      const uploadFile = async () => {
        try {
          console.log( obj.uploadList[0])
          const fileObj = new FormData();
          fileObj.append('data', obj.uploadList[0]);
    
          const response = await fetch('/server/service_handling_function/uploadfile', {
            method: 'POST',
            body: fileObj,
          });
    
          const data = await response.json();
    
          if (response.status === 200) {
            console.log(data.id)
          }
        } catch (e) {
          console.log(e);
          alert('Error. Please try again after sometime.');
        }
      };
      

      uploadFile()
      })
      // const response = await axios.post('/api/scrap', { scrapForms });
      // console.log('Response:', response.data);

      
    } catch (error) {
      console.error('There was an error!', error);
    }
  };



  return (
    <div className="container">
      <h1>Invoice Form</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Invoive Number</Form.Label>
          <Form.Control type="text" onChange={(e) => { setInvoiceNumber(e.target.value) }} placeholder="Enter Invoive Number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date"
            onChange={(e) => { (setInvoiceDate(e.target.value)) }}
            placeholder="Enter Date" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupNumber">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" onChange={(e) => { setCustomerName(e.target.value) }} placeholder="Enter Customer Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Ticket Number</Form.Label>
          <Form.Control type="text" onChange={(e) => { setTicketNumber(e.target.value) }} placeholder="Enter Ticket Number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Product</Form.Label>
          <Form.Control type="text" onChange={(e) => setProduct(e.target.value)} placeholder="Enter Ticket Number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAddress">
          <Form.Label>Enter Spares Subform</Form.Label>
          <Form.Control as="select" >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>

        {product === 'yes' && (
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
                    <tr key={field.uniqueKey}>
                      <td>
                        <FormControl
                          type="text"
                          className="form-control"
                          name="materialName"
                          value={field.materialName}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          className="form-control"
                          name="quantity"
                          value={field.quantity}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          className="form-control"
                          name="price"
                          value={field.price}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        {fields.length > 1 && (
                          <a
                            onClick={() => removeField(field.uniqueKey)}
                            style={{ color: "red" }}
                          >
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
        )}

        <Form.Group className="mb-3" controlId="formGroupAddress">
          <Form.Label>Enter Scrap Subform</Form.Label>
          <Form.Control as="select" onChange={(e) => setScrapOption(e.target.value)}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>

        {scrapOption === 'yes' && (
          <>
            <h4>Scrap Details</h4>
            {scrapForms.map((scrapForm, index) => (
              <div key={scrapForm.uniqueKey} style={{ marginBottom: '20px' }}>
                <Form.Group className="mb-3" controlId={`scrapDetails-${scrapForm.uniqueKey}`}>
                  <Form.Label>Material Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    value={scrapForm.material}
                    onChange={(e) => handleScrapFormChange(index, e)}
                    placeholder="Enter Material Name"
                  />
                  <Form.Label>Received Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="receivedDate"
                    value={scrapForm.receivedDate}
                    onChange={(e) => handleScrapFormChange(index, e)}
                  />
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="qty"
                    value={scrapForm.qty}
                    onChange={(e) => handleScrapFormChange(index, e)}
                    placeholder="Enter Quantity"
                  />
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    name="condition"
                    value={scrapForm.condition}
                    onChange={(e) => handleScrapFormChange(index, e)}
                  >
                    <option value="">Select Condition</option>
                    <option value="Bad">Bad</option>
                    <option value="Average">Average</option>
                    <option value="Good">Good</option>
                  </Form.Control>
                  <Form.Label>Ticket ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="ticket"
                    value={scrapForm.ticket}
                    onChange={(e) => handleScrapFormChange(index, e)}
                    placeholder="Enter Ticket ID"
                  />
                  <Form.Label>Damaged Image</Form.Label>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={scrapForm.uploadList}
                    onChange={(fileList) => handleUploadChange(index, fileList)}
                    customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                  >
                    {scrapForm.uploadList.length === 0 && "+ Upload"}
                  </Upload>
                </Form.Group>
                {scrapForms.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeScrapForm(scrapForm.uniqueKey)}
                  >
                    <CloseCircleOutlined /> Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="primary" onClick={addScrapForm}>
              <PlusCircleOutlined /> Add New
            </Button>
          </>
        )}
        <Button variant="success" className="float-end" onClick={handleSubmit}>
          Submit2
        </Button>

        <Button variant="success" className="float-end" onClick={handlePostData}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default InvoiceForm;