import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
      <nav>
         <ul>
            <li>
               <Link to="/app/">Home</Link>
            </li>
            <li>
               <Link to="/app/invoiceform">InvoiceForm</Link>
            </li>
            <li>
               <Link to="/app/ticketform">TicketForm</Link>
            </li>
            <li>
               <Link to="/app/technicianform">TechnicianFrom</Link>
            </li>
            <li>
               <Link to="/app/customerform">CustomerForm</Link>
            </li>
            <li>
               <Link to="/app/productform">ProductForm</Link>
            </li>
            <li>
               <Link to="/app/sparesform">SparesForm</Link>
            </li>
         </ul>
      </nav> 
  ); 
}

export default Navbar