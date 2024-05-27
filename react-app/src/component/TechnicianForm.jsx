// import React from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button'; 

// const TechnicianFrom = () => {
//   return (
//     <div className='container'>
//       <h1>Technician Form</h1>
//       <Form>
//          <Form.Group className="mb-3" controlId="formGroupEmail">
//             <Form.Label>Technician Name</Form.Label>
//             <Form.Control type="text" placeholder="Enter Technician Name" />
//          </Form.Group>
//          <Form.Group className="mb-3" controlId="formGroupEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" placeholder="Enter Email" />
//          </Form.Group>
//          <Form.Group className="mb-3" controlId="formGroupNumber">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control type="number" placeholder="Enter phone Number" />
//          </Form.Group>
//          <Form.Group className="mb-3" controlId="formGroupEmail">
//             <Form.Label>WhatsApp Number</Form.Label>
//             <Form.Control type="number" placeholder="Enter Technician WhatsaApp Number" />
//          </Form.Group>
//          <Form.Group className="mb-3" controlId="formGroupAddress">
//             <Form.Label>Address</Form.Label>
//             <Form.Control type="text" placeholder="Enter Address" />
//          </Form.Group>
//          <Button variant="primary"  >Submit</Button>{' '}
         
//       </Form>
//     </div>
//   )
// }

// export default TechnicianFrom



import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import axios from 'axios';

const TechnicianFrom = () => {
   const [technecianName,setTechnician] = useState('');
   const [Emailadd,setEmail] = useState('');
   const [phone,setPhone] = useState();
   const [whatsapp,setWhatsapp] = useState();
   const [address,setAddress] = useState('');

const handleSubmit = async (e)=>{

   e.preventDefault();

   const techniData = {
      technicianName:technecianName,
      email:Emailadd,
      phone:phone,
      whatsappNumber:whatsapp,
      Address:address
   }

   try {
      console.log(techniData)
      const Response = await axios.post('/server/service_handling_function/posttechnician',{data:techniData});
      console.log(Response.data)
      //clearing field values
      setAddress('');
      setEmail('');
      setPhone('');
      setTechnician('');
      setWhatsapp('');
      
   } catch (error) {
      console.log("Error while posting the techinician",error)
   }
}

  return (
    <div className='container'>
      <h1>Technician Form</h1>
      <Form>
         <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Technician Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Technician Name" value={technecianName} onChange={(e)=>setTechnician(e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupEmail" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={Emailadd} onChange={(e)=>setEmail(e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>WhatsApp Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Technician WhatsaApp Number" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
         </Form.Group>
         <Button variant="primary" onClick={handleSubmit} >Submit</Button>{' '}
         
      </Form>
    </div>
  )
}

export default TechnicianFrom