
'use strict';
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const { Email } = require('zcatalyst-sdk-node/lib/email/email');


const fileUpload = require('express-fileupload');
const app = express();
app.use(express.json());
app.use(fileUpload());

const os = require('os');

const fs = require('fs');

const technicianTable = 'technicianTable';
const productTable = 'productDetails';
const sparesTable = 'sparesList';
const technicianTableId = '15205000000101805'; // Verify this ID from your Catalyst console
const prodTableId = '15205000000098088';
const spraesTableId = '15205000000098812';
const sparesSubform = 'sparesSubform'

// Define the getMyPagedRows function outside the route handler
async function getMyPagedRows(dataStore, tableId, hasNext = true, nextToken = undefined, allData = []) {
   if (!hasNext) {
      return allData;
   }

   try {
      const response = await dataStore.table(tableId).getPagedRows({
         nextToken,
         maxRows: 100
      });

      const { data, next_token, more_records } = response;
      console.log('rows:', data);
      allData = allData.concat(data);

      // If there are more records, recursively call the function with the next token
      if (more_records) {
         return await getMyPagedRows(dataStore, more_records, next_token, allData);
      } else {
         return allData;
      }
   } catch (err) {
      console.log(err.toString());
      throw err;
   }
}

app.get('/gettechnician', async (req, res) => {
   try {
      const catalystApp = catalyst.initialize(req);
      const dataStore = catalystApp.datastore();

      // Fetch all rows using the getMyPagedRows function
      const allRows = await getMyPagedRows(dataStore, technicianTableId);

      res.json(allRows);
   } catch (err) {
      res.status(500).send(err.toString());
   }
});

app.post('/posttechnician', (req, res) => {
   const catalystApp = catalyst.initialize(req);
   //Create a JSON object with the rows to be inserted 
   let rowData = req.body.data;
   //Use the table meta object to insert the row which returns a promise 
   let datastore = catalystApp.datastore();
   let table = datastore.table(technicianTable);
   let insertPromise = table.insertRow(rowData);
   insertPromise.then((row) => {
      console.log(row);
      res.send(row)
   })

      .catch((err) => {
         console.log("err while post technician", err)
      });

});

// Get method for product table
app.get('/getproducts', async (req, res) => {
   try {
      const catalystApp = catalyst.initialize(req);
      const dataStore = catalystApp.datastore();

      // Fetch all rows using the getMyPagedRows function
      const allRows = await getMyPagedRows(dataStore, prodTableId);

      res.json(allRows);
   } catch (err) {
      res.status(500).send(err.toString());
   }
});

//Post method for product table
app.post('/addproduct', (req, res) => {
   const catalystApp = catalyst.initialize(req);
   //Create a JSON object with the rows to be inserted 
   let rowData = req.body.data;
   console.log(req.body.data)
   //Use the table meta object to insert the row which returns a promise 
   let datastore = catalystApp.datastore();
   let table = datastore.table(productTable);
   let insertPromise = table.insertRow(rowData);
   insertPromise.then((row) => {
      console.log(row);
      res.send(row)
   })

      .catch((err) => {
         console.log("err while post Add product", err)
      });

});

//Get method for spares table
app.get('/getspares', async (req, res) => {
   try {
      const catalystApp = catalyst.initialize(req);
      const dataStore = catalystApp.datastore();

      // Fetch all rows using the getMyPagedRows function
      const allRows = await getMyPagedRows(dataStore, spraesTableId);

      res.json(allRows);
   } catch (err) {
      res.status(500).send(err.toString());
   }
});



//Post method for spares table
app.post('/addspares', (req, res) => {
   const catalystApp = catalyst.initialize(req);
   //Create a JSON object with the rows to be inserted 
   let rowData = req.body.data;
   //Use the table meta object to insert the row which returns a promise 
   let datastore = catalystApp.datastore();
   let table = datastore.table(sparesTable);
   let insertPromise = table.insertRow(rowData);
   insertPromise.then((row) => {
      console.log(row);
      res.send(row)
   })

      .catch((err) => {
         console.log("err while post spares data", err)
      });

});


app.post('/add-spares-sub', (req, res) => {
   console.log("server");
   const catalystApp = catalyst.initialize(req);
   var details = req.body.data; // Directly accessing req.body  
   console.log(details); // Logging to debug

   var datastore = catalystApp.datastore();
   var table = datastore.table('sparesSubform'); // Provide the table ID or table name to insert the rows

   var insertPromise = table.insertRows(details); // Pass the JSON array

   insertPromise
      .then((response) => {
         console.log(response);
         res.status(200).send(response);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send(err);
      });
});

//Post method for product table
app.post('/add-invoice', (req, res) => {
   const catalystApp = catalyst.initialize(req);
   //Create a JSON object with the rows to be inserted 
   let rowData = req.body.data;
   console.log(req.body.data)
   //Use the table meta object to insert the row which returns a promise 
   let datastore = catalystApp.datastore();
   let table = datastore.table('invoiceTable');
   let insertPromise = table.insertRow(rowData);
   insertPromise.then((row) => {
      console.log(row);
      res.send(row)
   })

      .catch((err) => {
         console.log("err", err)
      });

});


app.post('/ticketform', (req, res) => {
   const catalystApp = catalyst.initialize(req);
   //Create a JSON object with the rows to be inserted 
   let rowData = req.body.data;
   console.log(req.body.data)
   //Use the table meta object to insert the row which returns a promise 
   let datastore = catalystApp.datastore();
   let table = datastore.table('ticketTable');
   let insertPromise = table.insertRow(rowData);
   insertPromise.then((row) => {
      console.log(row);
      res.send(row)
   })

      .catch((err) => {
         console.log("err ", err)
      });

});



app.get('/getticket', async (req, res) => {
   try {
      const catalystApp = catalyst.initialize(req);
      const dataStore = catalystApp.datastore();

      // Fetch all rows using the getMyPagedRows function
      const allRows = await getMyPagedRows(dataStore, '15205000000102556');

      res.json(allRows);
   } catch (err) {
      res.status(500).send(err.toString());
   }
});


// app.put('/updateticket/', async (req, res) => {
//    try {
//       const catalystApp = catalyst.initialize(req);
//       console.log(req.body)
//       let updatedRowData = { Name: `Mathew Jones`, Age: 31, ROWID: 1510000000109474 };
//       //Use Table Meta Object to update a single row using ROWID which returns a promise 
//       let datastore = app.datastore();
//       let table = datastore.table('SampleTable');
//       let rowPromise = table.updateRow(updatedRowData);
//       rowPromise.then((row) => { console.log(row); });
//    } catch (error) {

//    }
// })

app.get('/getuser', (req, res) => {
   var catalystApp = catalyst.initialize(req);

   // get the details of the current user as a promise
   let userManagement = catalystApp.userManagement();
   let userPromise = userManagement.getCurrentUser();
   userPromise.then(currentUser => {
      console.log("Login details", currentUser);
      res.send(currentUser)
   });
})



app.put('/updateticket/:ROWID', async (req, res) => {
   try {
      const catalystApp = catalyst.initialize(req);
      console.log(req.body); // This will log the data sent from the frontend

      // Access the ROWID parameter from the URL
      const ROWID = req.params.ROWID;
      console.log('ROWID:', ROWID);

      // Here you can access the data sent from the frontend in req.body
      // Modify the below code to use the received data
      const { technicianName, technicianEmail } = req.body;
      let updatedRowData = { technicianName, technicianEmail, ROWID };

      // Use Table Meta Object to update a single row using ROWID which returns a promise 
      let datastore = catalystApp.datastore();
      let table = datastore.table('ticketTable');
      let rowPromise = table.updateRow(updatedRowData);
      rowPromise.then((row) => {
         console.log(row);
         res.status(200).json({ success: true, message: 'Row updated successfully' });
      }).catch(error => {
         console.error('Error updating row:', error);
         res.status(500).json({ success: false, error: 'Internal server error' });
      });
   } catch (error) {
      console.error('Error handling update ticket request:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
   }
});






app.get('/getuniquedata', (req, res) => {
   let table2 = 'ticketTable'
   let { email } = req.query
   var catalystApp = catalyst.initialize(req);
   console.log("Inside Api")
   getDataFromCatalystDataStore(catalystApp, table2, email).then(Detail => {
      console.log("function respose")
      res.send(Detail)
   })
      .catch((err) => {
         console.log(err, "error in getting time from true condition")

      })
})

function getDataFromCatalystDataStore(catalystApp, tableName, email) {
   return new Promise((resolve, reject) => {
     
         // Queries the Catalyst Data Store table
         catalystApp.zcql().executeZCQLQuery("Select * from " + tableName + " where technicianEmail ='" + email + "'").then(queryResponse => {
            console.log("function inside")
            resolve(queryResponse);
         }).catch(err => {
            console.log(err)
         })
      
   });

}


// const FOLDER_ID = 15205000000103376



// // Middleware for parsing form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.post('/uploadfile', async (req, res) => {
//    try {
//        console.log('Uploading file...');

//        // Initialize Zoho Catalyst SDK using the request object
//        const app = catalyst.initialize(req);
//        console.log(req.files)

//        // Check if file exists in request
//        if (!req.files || !req.files.data) {
//            throw new Error('No file uploaded');
//        }

//        // Move uploaded file to a temporary directory
//        const tmpDir = os.tmpdir(); // Get system's temporary directory
//        const tmpFilePath = `${tmpDir}/${req.files.data.name}`;
//        await req.files.data.mv(tmpFilePath);

//        // Upload file to Zoho Filestore
//        const folderId = 15205000000103376; // Replace with your folder ID
//        const config = {
//            code: fs.createReadStream(tmpFilePath),
//            name: req.files.data.name
//        };

//        const uploadPromise = app.filestore().folder(folderId).uploadFile(config);

//        uploadPromise.then((fileObject) => {
//            // Optionally delete the file from the temporary directory
//            fs.unlink(tmpFilePath, (err) => {
//                if (err) console.error('Error deleting temp file:', err);
//            });

//            // Send the file object to the frontend
//            res.status(200).send(fileObject);
//        }).catch((error) => {
//            console.error('Error uploading file:', error);
//            // Send error response
//            res.status(500).send({
//                status: 'error',
//                message: 'Internal Server Error',
//                error: error.message // Include error message in response
//            });
//        });
//    } catch (error) {
//        console.error('Error uploading file:', error);
//        // Send error response
//        res.status(500).send({
//            status: 'error',
//            message: 'Internal Server Error',
//            error: error.message // Include error message in response
//        });
//    }
// });


//2

app.post('/uploadfile', async (req, res) => {
   try {
       console.log('Uploading files...');

       // Initialize Zoho Catalyst SDK using the request object
       const app = catalyst.initialize(req);
       const files = req.files;
       console.log(files)

       // Check if files exist in the request
       if (!files) {
           throw new Error('No files uploaded');
       }

       const uploadPromises = Object.values(files).map(async file => {
           const tmpDir = os.tmpdir(); // Get system's temporary directory
           const tmpFilePath = `${tmpDir}/${file.name}`;
           await file.mv(tmpFilePath);

           // Upload file to Zoho Filestore
           const folderId = 15205000000103376; // Replace with your folder ID
           const config = {
               code: fs.createReadStream(tmpFilePath),
               name: file.name
           };

           return app.filestore().folder(folderId).uploadFile(config)
               .then(fileObject => {
                   // Optionally delete the file from the temporary directory
                   fs.unlink(tmpFilePath, (err) => {
                       if (err) console.error('Error deleting temp file:', err);
                   });
                   return fileObject;
               });
       });

       const uploadedFiles = await Promise.all(uploadPromises);

       // Send the file objects to the frontend
       res.status(200).send(uploadedFiles);
   } catch (error) {
       console.error('Error uploading files:', error);
       // Send error response
       res.status(500).send({
           status: 'error',
           message: 'Internal Server Error',
           error: error.message // Include error message in response
       });
   }
});




module.exports = app;
