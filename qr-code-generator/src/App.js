import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas instead of default

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [showQRCode, setShowQRCode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQRCode(true);
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
        <button type="submit">Generate QR Code</button>
      </form>

      {showQRCode && (
        <div>
          <h2>Scan the QR Code:</h2>
          <QRCodeCanvas value={qrData} /> {/* Use QRCodeCanvas */}
        </div>
      )}
    </div>
  );
}

export default App;
