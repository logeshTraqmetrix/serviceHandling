// import { hot } from 'react-hot-loader/root';
// import WebSocket from 'ws';

// const reloadSocket = new WebSocket('ws://localhost:3000/client-reload');

// reloadSocket.onopen = () => {
//   console.log('Connection established with the server');
//   reloadSocket.send('connected');
// };

// reloadSocket.onmessage = (message) => {
//   if (message.data === 'reload') {
//     reloadSocket.close();
//     window.location.reload();
//   }
// };

// reloadSocket.onclose = () => {
//   console.log('connection closed');
// };

// reloadSocket.onerror = (err) => {
//   console.error('Reload error: ', err);
// };

// export const LiveReload = hot(({ children }) => children);




// import { hot } from 'react-hot-loader/root';

// const reloadSocket = new WebSocket('ws://localhost:3000/client-reload');

// reloadSocket.onopen = () => {
//   console.log('Connection established with the server');
//   reloadSocket.send('connected');
// };

// reloadSocket.onmessage = (message) => {
//   if (message.data === 'reload') {
//     reloadSocket.close();
//     window.location.reload();
//   }
// };

// reloadSocket.onclose = () => {
//   console.log('connection closed');
// };

// reloadSocket.onerror = (err) => {
//   console.error('Reload error: ', err);
// };

// export const LiveReload = hot(({ children }) => children);





// import { hot } from 'react-hot-loader/root';

// const reloadSocket = new WebSocket('ws://localhost:3000/client-reload');

// reloadSocket.onopen = () => {
//   console.log('Connection established with the server');
//   reloadSocket.send('connected');
// };

// reloadSocket.onmessage = (message) => {
//   console.log('Message received from server:', message.data); // Added logging to check received messages
//   if (message.data === 'reload') {
//     reloadSocket.close();
//     window.location.reload();
//   }
// };

// reloadSocket.onclose = () => {
//   console.log('connection closed');
// };

// reloadSocket.onerror = (err) => {
//   console.error('Reload error: ', err);
// };

// export const LiveReload = hot(({ children }) => children);
