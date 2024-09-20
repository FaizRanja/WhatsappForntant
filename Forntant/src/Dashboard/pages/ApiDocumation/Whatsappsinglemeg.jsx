import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Whatsappsinglemeg = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [fileType, setFileType] = useState(''); // State for file type
  const [filePreviewUrl, setFilePreviewUrl] = useState(null); // State for file preview URL
const [secretKey , setsecretKey] = useState(''); // State for


  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileType(file.type);
      setFilePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Function to upload file to Cloudinary (or any other file hosting service)
  const uploadFileToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your actual upload preset if using Cloudinary

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/upload', // Replace with your Cloudinary URL
        formData
      );

      return response.data.secure_url; // Return the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  };

  // Function for sending a message to the user
  const handleSend = async () => {
    try {
      if (message.trim() && phoneNumber.trim() && number.trim()) {
        setStatus('Sending...');

        let fileUrl = '';
        if (selectedFile) {
          fileUrl = await uploadFileToCloudinary(selectedFile); // Upload file if selected
        }

        // Sending data with POST request
        const response = await axios.post('http://localhost:4000/api/v1/qr-scans/user/sendmessage', {
          phoneNumber,
          number,
          message,
          fileType,
          fileUrl, // Include uploaded file URL if exists
          secretKey
        });

        console.log('Response:', response);

        if (response.data.status === 'Message sent') {
          setMessage('');
          setSelectedFile(null);
          setFileType('');
          setFilePreviewUrl(null);
          setStatus('Message sent successfully');
        } else {
          setStatus('Failed to send message');
        }
      } else {
        setStatus('Please fill in all fields');
      }
    } catch (error) {
      setStatus('Failed to send message');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          p: 2,
          bgcolor: '#e2e2ff',
          overflow: 'auto',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <div id="api-whatsapp_sent_single_Message">
          <Typography variant="h4" gutterBottom>
            WhatsApp - Send Single Message
          </Typography>
          <Typography gutterBottom>
            Send a single WhatsApp message. Requires <strong>send_single_message</strong> API permission.
          </Typography>
          <pre className="full-pre pre-get">
            <span className="typ typ-get">GET</span> <span className="url">http://localhost:4000/api/v1/qr-scans/user/sendmessage</span>
          </pre>

          <Typography variant="h6" gutterBottom>
            Parameter
          </Typography>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>secret</td>
                <td>String</td>
                <td>The API secret you copied from (Tools API Keys) page</td>
              </tr>
              <tr>
                <td>mode</td>
                <td>String</td>
                <td>
                  Mode of sending the message, it can be "devices" which will allow you to use your linked android
                  devices or "credits" which will allow you to use gateways and partner devices. "credits" requires you
                  to have enough credit balance to send Chat. Allowed values: "devices", "credits"
                </td>
              </tr>
              <tr>
                <td>numbers</td>
                <td>String</td>
                <td>
                  List of phone numbers separated by commas. It can be optional if "groups" parameter is not empty. It
                  will accept E.164 formatted number or locally formatted numbers using the country code from your
                  profile settings. Example for Philippines E.164: +639184661533 Local: 09184661533
                </td>
              </tr>
              <tr>
                <td>message</td>
                <td>String</td>
                <td>Message you want to send, spintax and shortcodes are supported.</td>
              </tr>
            </tbody>
          </table>

          <Typography variant="h6" gutterBottom>
            Success Response Format
          </Typography>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status</td>
                <td>Number</td>
                <td>
                  List of Codes 400 = Invalid parameters 401 = Invalid API secret 403 = Access denied 404 = Device
                  doesn't exist 500 = Something went wrong
                </td>
              </tr>
              <tr>
                <td>message</td>
                <td>String</td>
                <td>Response message</td>
              </tr>
              <tr>
                <td>data</td>
                <td>Array</td>
                <td>Array of data</td>
              </tr>
            </tbody>
          </table>

          <Typography variant="h6" gutterBottom>
            Error Response Format
          </Typography>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status</td>
                <td>Number</td>
                <td>
                  List of Codes 400 = Invalid parameters 401 = Invalid API secret 403 = Access denied 500 = Something
                  went wrong
                </td>
              </tr>
              <tr>
                <td>message</td>
                <td>String</td>
                <td>Response message</td>
              </tr>
              <tr>
                <td>data</td>
                <td>Array</td>
                <td>Array of data</td>
              </tr>
            </tbody>
          </table>
          <hr />

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="h6">Send a Sample Request</Typography>
            <TextField
              label="URL"
              value="https://app.thewhatsappcity.com/api/get/whatsapp.pending"
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <TextField
              label="Secret"
              placeholder="Enter your API secret"
              variant="outlined"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
              value={secretKey}
              onChange={(e)=>setsecretKey(e.target.value)}
            />
            <TextField
              label="numbers"
              placeholder="the form of number is + "
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <TextField
              label="message"
              placeholder="enter message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <TextField
              label="phone number"
              placeholder="enter message"
              type="number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <input type="file" onChange={handleFileChange} accept="image/*,video/*,application/pdf" />

            {filePreviewUrl && (
              <img src={filePreviewUrl} alt="File preview" style={{ width: 100, height: 100, marginTop: 10 }} />
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              sx={{ alignSelf: 'flex-start', mt: 1 }}
              onClick={handleSend}
            >
              Send
            </Button>
          </Stack>

          {status && (
            <Alert sx={{ mt: 2 }} severity={status.includes('Failed') ? 'error' : 'success'}>
              {status}
            </Alert>
          )}

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Success Response Format
          </Typography>
          <pre
            style={{
              backgroundColor: '#e0f7fa',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <code>
              {`{
 "status": 200,
  "message": "Message has been queued for sending!",
  "data": false
}`}
            </code>
          </pre>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Error Response Format
          </Typography>
          <pre
            style={{
              backgroundColor: '#ffebee',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <code>
              {`{
"status": 400,
"message": "Invalid parameters",
 "data": false
}`}
            </code>
          </pre>
        </div>
      </Paper>
    </div>
  );
};

export default Whatsappsinglemeg;
