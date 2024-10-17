const express = require('express');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Path to the Excel file
const excelFilePath = path.join(__dirname, 'data.xlsx');

// Append data to Excel sheet
const appendDataToExcel = (data) => {
  let workbook;
  let worksheet;

  // Check if the Excel file exists
  if (fs.existsSync(excelFilePath)) {
    // Read the existing Excel file
    workbook = XLSX.readFile(excelFilePath);
    worksheet = workbook.Sheets['Sheet1'];
  } else {
    // Create a new Excel file and worksheet if it doesn't exist
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([['Name', 'Email', 'Phone']]); // Headers
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  }

  // Convert the existing worksheet data to JSON
  const existingData = XLSX.utils.sheet_to_json(worksheet);

  // Append the new data
  existingData.push(data);

  // Convert the updated data back to worksheet format
  const updatedWorksheet = XLSX.utils.json_to_sheet(existingData);

  // Replace the worksheet in the workbook with the updated one
  workbook.Sheets['Sheet1'] = updatedWorksheet;

  // Write the updated Excel file back to the system
  XLSX.writeFile(workbook, excelFilePath);
};

// API to receive form data and append it to the Excel file
app.post('/api/appendData', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  // Append data to the Excel file
  try {
    appendDataToExcel({ Name: name, Email: email, Phone: phone });
    res.status(200).json({ message: 'Data appended successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to append data to Excel file.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
