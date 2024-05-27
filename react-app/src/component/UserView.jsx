
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';

const UserView = (props) => {
  const { user } = props;
  const [ticketData, setTicketData] = useState([{
    "CREATORID": "15205000000030011",
    "warrantyNumber": null,
    "product": "product 1",
    "address": "address 1",
    "serialNumber": "number1",
    "attendedDate": "2024-05-14",
    "technicianName": "technician 1",
    "scheduledDate": "2024-05-04",
    "customerName": "customer 1",
    "MODIFIEDTIME": "2024-05-22 11:04:42:550",
    "technicianEmail": "logesh.mg@traqmetrix.com",
    "dateOfPurchase": null,
    "warranty": " no",
    "CREATEDTIME": "2024-05-22 11:04:42:550",
    "ROWID": "15205000000104746",
    "ticketId": "12345678abc",
    "ticketDate": "2024-05-18",
    "status": "open"
  }]
  );
  const userEmail = user.email_id;

  const items = [
         {
           key: '1',
           label: (
             <Link to='/app/invoiceform'>Add Invoice</Link>
           ),
         }
       ];
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/server/service_handling_function/getuniquedata?email=${userEmail}`);
        console.log(res.data);
        setTicketData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userEmail]);

  return (
    <div className="container">
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
            {ticketData.map((data, index) => (
              <tr key={index}>
                <td>{data.ticketId}</td>
                <td>{data.ticketDate}</td>
                <td>{data.product}</td>
                <td>{data.technicianName}</td>
                <td>{data.customerName}</td>
                <td>
                  {/* <Link to="/app/invoiceform">Add Invoice</Link> */}
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                  >
                    <Button style={{ border: 'none' }}>
                      <DownCircleOutlined />
                    </Button>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserView;