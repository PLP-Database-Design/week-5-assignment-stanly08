const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Create the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware
app.use(express.json());


// Question 1 goes here
// Retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve patients' });
      }
      res.status(200).json(results);
    });
});
  


// Question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve providers' });
      }
      res.status(200).json(results);
    });
});
  

// Question 3 goes here
//Filter patients by first name
app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve patients by first name' });
      }
      res.status(200).json(results);
    });
});
  

// Question 4 goes here
// Retrieve providers by their specialty
app.get('/providers/filter', (req, res) => {
    const { specialty } = req.query;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
      }
      res.status(200).json(results);
    });
});
  


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
