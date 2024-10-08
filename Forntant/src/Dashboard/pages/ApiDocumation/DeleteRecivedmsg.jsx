import React, { useState } from "react";
import { Typography, Paper, Button, Stack, TextField, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const DeleteRecivedmsg = () => {
  const [secretKey, setsecretKey] = useState("");
  const [id, setid] = useState("");
  const [success, setSuccess] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleDeletemessage = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/qr-scans/user/delete/recivedmessage/${id}`,
        {
          params: { secretKey }, // Passing secretKey as query parameter
        }
      );
      if (response.status === 200) {
        setAlertSeverity('success');
        setSuccess("Message deleted successfully");
      } else {
        setAlertSeverity('error');
        setSuccess("Error deleting message");
      }
    } catch (error) {
      setAlertSeverity('error');
      setSuccess("Error deleting message");
    }
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          bgcolor: "#e2e2ff",
          overflow: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Alert Snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position alert at the top
          sx={{
            mt: 8, // Optional margin to push it a bit down from the top
            zIndex: 9999,
          }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertSeverity}
            variant="filled"
            sx={{
              width: '100%',
              fontSize: "1.1rem", // Larger text size for better visibility
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Adding shadow for a modern look
            }}
          >
            {success}
          </Alert>
        </Snackbar>

        <div id="api-whatsapp-Delete_Received_Chat">
          <Typography variant="h4" gutterBottom>
            WhatsApp - Delete Received Message
          </Typography>
          <Typography gutterBottom>
            Delete Received Message. Requires "
            <strong>delete_Recievid_Message</strong>" API permission.
          </Typography>
          <pre className="full-pre pre-get">
            <span className="typ typ-get">GET</span>{" "}
            <span className="url">
              http://localhost:4000/api/v1/qr-scans/user/delete/recivedmessage
            </span>
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
                <td>id</td>
                <td>Number</td>
                <td>Received Message Id</td>
              </tr>
            </tbody>
          </table>

          <Typography variant="h6" gutterBottom>
            Success Response Format
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
                <td>status</td>
                <td>Number</td>
                <td>List of Codes 200 = Success</td>
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
              value="http://localhost:4000/api/v1/qr-scans/user/delete/recivedmessage"
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Secret Key"
              placeholder="Enter your API secret"
              variant="outlined"
              fullWidth
              value={secretKey}
              onChange={(e) => setsecretKey(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Message ID"
              placeholder="Enter the message ID"
              variant="outlined"
              fullWidth
              value={id}
              onChange={(e) => setid(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              sx={{ alignSelf: "flex-start", mt: 1 }}
              onClick={handleDeletemessage}
            >
              Delete Message
            </Button>
          </Stack>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Success Response Format
          </Typography>
          <pre
            style={{
              backgroundColor: "#e0f7fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <code>
              {`{
  "status": 200,
  "message": "WhatsAppcampaign has been deleted!",
  "data": false
}`}
            </code>
          </pre>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Error Response Format
          </Typography>
          <pre
            style={{
              backgroundColor: "#ffebee",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <code>
              {`{
  "status": 400,
  "message": "Invalid parameters"
}`}
            </code>
          </pre>
        </div>
      </Paper>
    </div>
  );
};

export default DeleteRecivedmsg;
