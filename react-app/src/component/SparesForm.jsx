import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const SparesForm = () => {
  const [materialName, setMaterial] = useState('');
  const [availQty, setAvailQty] = useState();
  const [usedQty, setUsedQty] = useState();
  const [inwardQty, setInwardQty] = useState();
  const [price, setprice] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spareData = {
      MaterialName: materialName,
      AvailableQty: parseFloat(availQty),
      UserQtySoFar: parseFloat(usedQty),
      InwardQty: parseFloat(inwardQty),
      Price: parseFloat(price),
    };

    try {
      console.log(spareData)
      const response = await axios.post('/server/service_handling_function/addspares',{data:spareData});
      console.log("Spares Response : ",response.data)
      //Clearing field values
      setMaterial('');
      setAvailQty('');
      setUsedQty('');
      setInwardQty('');
      setprice('');
    } catch (error) {
      console.log("Error while posting the spares : ", error)
      
    }
  };
  return (
    <div className="container">
      <h1 className="mt-5">SparesForm</h1>
      <Form.Group>
        <Form.Label>Material Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Material Name" value={materialName} onChange={(e)=>setMaterial(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Available Qty</Form.Label>
        <Form.Control type="number" placeholder="Enter Available Qty" value={availQty} onChange={(e)=>setAvailQty(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Used Qty So Far</Form.Label>
        <Form.Control type="number" placeholder="Enter Used Qty So Far" value={usedQty} onChange={(e)=>setUsedQty(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Inward Qty</Form.Label>
        <Form.Control type="number" placeholder="Enter Inward Qty" value={inwardQty} onChange={(e)=>setInwardQty(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e)=>setprice(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Button className="btn btn-success mt-3" onClick={handleSubmit}>Submit</Button>
      </Form.Group>
    </div>
  );
};

export default SparesForm;