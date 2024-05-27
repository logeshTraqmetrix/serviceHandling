import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'



const ProductForm = () => {
  const [prodName,setprodName]=useState('');
  const [price,setprodprice]=useState('');

  //create the record object when click submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ProductName: prodName,
      Price: price
    };

  try {
    console.log(productData);
    const response = await axios.post('/server/service_handling_function/addproduct',{data:productData});
    console.log("Response of Product : ",response.data);
    //clearing the field values
    setprodName('');
    setprodprice('');
    
  } catch (error) {
    console.error("The post product api error",error);
    
  }
}

  return (
    <div className='container'>
        <h1 className='mb-3 mt-3'>ProductForm</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Product Name</Form.Label>
               <Form.Control type="text" placeholder="Enter Product Name" value={prodName} onChange={(e)=>setprodName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Price</Form.Label>
               <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e)=>setprodprice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
               <Button className='btn btn-success' onClick={handleSubmit} >Submit</Button>
            </Form.Group>
        
        </Form>
        
    </div>
  )
}

export default ProductForm