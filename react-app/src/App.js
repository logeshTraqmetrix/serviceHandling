// import React, { useEffect, useState } from 'react';
// import { Tabs } from 'antd';
// import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
// import InvoiceForm from './component/InvoiceForm';
// import TicketForm from './component/TicketForm';
// import TechnicianForm from './component/TechnicianForm';
// import CustomerForm from './component/CustomerForm';
// import ProductForm from './component/ProductForm';
// import SparesForm from './component/SparesForm';
// import Home from './component/Home';
// import ViewTicket from './component/ViewTicket';
// import UserView from './component/UserView';
// import axios from 'axios';
// import LoginDetails from './component/LoginDetails';

// const App = () => {
//   const [userType, setUserType] = useState('');
//   const users = {
//     zuid: "10062169698",
//     zaaid: "10062169862",
//     org_id: "10062169862",
//     status: "ACTIVE",
//     is_confirmed: false,
//     email_id: "logesh.mg@traqmetrix.com",
//     first_name: "Amelia",
//     last_name: "Burrows",
//     created_time: "Jul 05, 2023 10:30 AM",
//     modified_time: "Jul 05, 2023 10:30 AM",
//     invited_time: "Jul 05, 2023 10:30 AM",
//     role_details: {
//       role_name: "App User",
//       role_id: "10103000000115014"
//     },
//     user_type: "App User",
//     user_id: "10103000000115057",
//     locale: "us|en_us|America/Los_Angeles",
//     time_zone: "America/Los_Angeles"
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // const res = await axios.get('/server/service_handling_function/getuser');
//         // setUsers(res.data);
//         // setLoginEmail(res.data.email_id);
//         // setUserType(res.data.role_details.role_name);
//         setUserType(users.role_details.role_name);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const adminRoutes = [
//     { path: '/app/', label: 'Home', component: <Home /> },
//     { path: '/app/invoiceform', label: 'InvoiceForm', component: <InvoiceForm />},
//     { path: '/app/ticketform', label: 'TicketForm', component: <TicketForm /> },
//     { path: '/app/technicianform', label: 'TechnicianForm', component: <TechnicianForm /> },
//     { path: '/app/customerform', label: 'CustomerForm', component: <CustomerForm /> },
//     { path: '/app/productform', label: 'ProductForm', component: <ProductForm /> },
//     { path: '/app/sparesform', label: 'SparesForm', component: <SparesForm /> },
//     { path: '/app/viewticket', label: 'Ticket Data', component: <ViewTicket /> },
//     { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
//   ];

//   const userRoutes = [
//     { path: '/app/', label: 'Home', component: <Home /> },
//     { path: '/app/userview', label: 'UserView', component: <UserView user={users} /> },
//     { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
//   ];

//   const TabContent = ({ children }) => {
//     const navigate = useNavigate();
//     const onChange = (key) => {
//       navigate(key);
//     };
//     const routes = userType === 'App Administrator' ? adminRoutes : userRoutes;

//     return (
//       <Tabs onChange={onChange} type="card">
//         {routes.map((route) => (
//           <Tabs.TabPane tab={route.label} key={route.path}>
//             {route.component}
//           </Tabs.TabPane>
//         ))}
//       </Tabs>
//     );
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/*" element={<TabContent />} />
//         {userType === 'App User' && <Route path="/app/invoiceform" element={<InvoiceForm />} />}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import InvoiceForm from './component/InvoiceForm';
import TicketForm from './component/TicketForm';
import TechnicianForm from './component/TechnicianForm';
import CustomerForm from './component/CustomerForm';
import ProductForm from './component/ProductForm';
import SparesForm from './component/SparesForm';
import Home from './component/Home';
import ViewTicket from './component/ViewTicket';
import UserView from './component/UserView';
import LoginDetails from './component/LoginDetails';
import axios from 'axios';

const App = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulating the fetch user data
        const res = await axios.get('/server/service_handling_function/getuser');
        setUserType(res.data.role_details.role_name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const adminRoutes = [
    { path: '/app/', label: 'Home', component: <Home /> },
    { path: '/app/invoiceform', label: 'InvoiceForm', component: <InvoiceForm /> },
    { path: '/app/ticketform', label: 'TicketForm', component: <TicketForm /> },
    { path: '/app/technicianform', label: 'TechnicianForm', component: <TechnicianForm /> },
    { path: '/app/customerform', label: 'CustomerForm', component: <CustomerForm /> },
    { path: '/app/productform', label: 'ProductForm', component: <ProductForm /> },
    { path: '/app/sparesform', label: 'SparesForm', component: <SparesForm /> },
    { path: '/app/viewticket', label: 'Ticket Data', component: <ViewTicket /> },
    { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
  ];

  const userRoutes = [
    { path: '/app/', label: 'Home', component: <Home /> },
    { path: '/app/userview', label: 'UserView', component: <UserView /> },
    { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
  ];

  const TabContent = () => {
    const navigate = useNavigate();

    const onChange = (key) => {
      navigate(key);
    };

    const routes = userType === 'App Administrator' ? adminRoutes : userRoutes;

    return (
      <Tabs onChange={onChange} type="card">
        {routes.map((route) => (
          <Tabs.TabPane tab={route.label} key={route.path}>
            {route.component}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  };

  return (
    <Router basename="/app">
      <Routes>
        {/* Default route for displaying TabContent */}
        <Route path="/*" element={<TabContent />} />

        {/* Routes specific to user type */}
        {userType === 'App Administrator' && (
          <Route path="/app/invoiceform" element={<InvoiceForm />} />
        )}
        {userType === 'App User' && (
          <Route path="/app/userview" element={<UserView />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;