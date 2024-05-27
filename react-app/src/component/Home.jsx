import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home




// import React from 'react';
// import { Tabs } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import HomeContent from './HomeContent'; // Create a separate component for the home content
// import InvoiceForm from './InvoiceForm';
// import TechnicianFrom from './TechnicianForm';
// import CustomerForm from './CustomerForm';
// import ProductForm from './ProductForm';
// import SparesForm from './SparesForm';
// import ViewTicket from './ViewTicket';
// import LoginDetails from './LoginDetails';
// import UserView from './UserView';
// import TicketForm from './TicketForm';

// const Home = ({ userType, user }) => {
//   const navigate = useNavigate();
//   const onChange = (key) => {
//     navigate(key);
//   };

//   const adminRoutes = [
//     { path: '/app/', label: 'Home', component: <HomeContent /> },
//     { path: '/app/invoiceform', label: 'InvoiceForm', component: <InvoiceForm /> },
//     { path: '/app/ticketform', label: 'TicketForm', component: <TicketForm /> },
//     { path: '/app/technicianform', label: 'TechnicianFrom', component: <TechnicianFrom /> },
//     { path: '/app/customerform', label: 'CustomerForm', component: <CustomerForm /> },
//     { path: '/app/productform', label: 'ProductForm', component: <ProductForm /> },
//     { path: '/app/sparesform', label: 'SparesForm', component: <SparesForm /> },
//     { path: '/app/viewticket', label: 'Ticket Data', component: <ViewTicket /> },
//     { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
//   ];

//   const userRoutes = [
//     { path: '/app/', label: 'Home', component: <HomeContent /> },
//     { path: '/app/invoiceform', component: <InvoiceForm /> },
//     { path: '/app/userview', label: 'UserView', component: <UserView user={user} /> },
//     { path: '/app/logindetails', label: 'Accounts', component: <LoginDetails /> },
//   ];

//   const routes = userType === 'App Administrator' ? adminRoutes : userRoutes;

//   return (
//     <Tabs onChange={onChange} type="card">
//       {routes.map((route) => (
//         <Tabs.TabPane tab={route.label} key={route.path}>
//           {route.component}
//         </Tabs.TabPane>
//       ))}
//     </Tabs>
//   );
// };

// export default Home;
