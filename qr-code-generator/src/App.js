

// import React, { useState } from 'react';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';

// function App() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   const [isDataAppended, setIsDataAppended] = useState(false); // Track if data was successfully appended
//   const [errorMessage, setErrorMessage] = useState(null); // Track errors if appending fails

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     appendToExcel(formData); // Send data to the backend to append it to the Excel sheet
//   };

//   const appendToExcel = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/appendData', data);

//       if (response.status === 200) {
//         setIsDataAppended(true); // Indicate that the data was successfully appended
//         setErrorMessage(null); // Clear any previous errors
//       }
//     } catch (error) {
//       setIsDataAppended(false); // Indicate that appending failed
//       setErrorMessage('Failed to append data. Please try again.');
//     }
//   };

//   const qrData = JSON.stringify(formData);

//   return (
//     <div className="App">
//       <h1>QR Code Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Submit and Generate QR Code</button>
//       </form>

//       {isDataAppended && (
//         <p style={{ color: 'green' }}>Data appended successfully to the sheet!</p>
//       )}

//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//       {isDataAppended && (
//         <div>
//           <h2>Scan the QR Code:</h2>
//           <QRCodeCanvas value={qrData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isDataAppended, setIsDataAppended] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    appendToExcel(formData);
  };

  const appendToExcel = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/appendData', data);

      if (response.status === 200) {
        setIsDataAppended(true);
        setErrorMessage(null);
      }
    } catch (error) {
      setIsDataAppended(false);
      setErrorMessage('Failed to append data. Please try again.');
    }
  };

  const qrData = JSON.stringify(formData);

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit and Generate QR Code</button>
      </form>

      {isDataAppended && (
        <p style={{ color: 'green' }}>Data appended successfully to the sheet!</p>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {isDataAppended && (
        <div>
          <h2>Scan the QR Code:</h2>
          <QRCodeCanvas value={qrData} />
        </div>
      )}
    </div>
  );
}

export default App;
