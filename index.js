const express = require('express');
const { connectDB, sql } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// GET all users (example)
app.post('/api/codetype', async (req, res) => {
     console.log('req',req)
     //const CodeType = req.params.code;
     const { CodeType, Description, IsActive } = req.body;
     //const CodeType = "STATUS";
    try {
    const request = new sql.Request();
    request.input('CodeType', sql.NVarChar(50), CodeType);
    
    const result = await request.execute('GetSystemCodeDetails');
    res.json(result.recordset);
    //res.status(201).send('Record inserted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
//   try {
//     const result = await sql.query`SELECT top 1 * FROM SystemCode`;
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
