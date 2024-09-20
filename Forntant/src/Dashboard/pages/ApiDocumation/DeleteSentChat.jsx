import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const DeleteSentChat = () => {
  // state declared here
  const [scantodelete, setscantodelete] = useState("");

  // function for deleting
  const handlefordelete = async () => {
    if (!scantodelete) {
      alert("Please enter a valid sent message ID");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/qr-scans/user/delete/sentmessage/${scantodelete}`
      );
      console.log(response);
      if (response.status === 200) {
        alert("Sent message deleted successfully");
      } else {
        alert("Error deleting sent message");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Error deleting sent message");
    }
  };
  

  const handleonchange = (e) => {
    setscantodelete(e.target.value);
    console.log("ID to delete:", e.target.value);
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
        <div id="api-whatsapp_delete_sent__Chat">
          <Typography variant="h4" gutterBottom>
            WhatsApp - Delete Sent Chat
          </Typography>
          <Typography gutterBottom>
            Delete Sent Chat. Requires "delete_wa_sent" API permission.
            <strong>get_delete_sent_chats</strong>
          </Typography>
          <pre className="full-pre pre-get">
            <span className="typ typ-get">GET</span>{" "}
            <span className="url">
              http://localhost:4000/api/v1/qr-scans/user/delete/sentmessage
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
                <td>
                  The API secret you copied from (Tools API Keys) page
                </td>
              </tr>
              <tr>
                <td>id</td>
                <td>Number</td>
                <td>Sent chat ID</td>
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
              value="http://localhost:4000/api/v1/qr-scans/user/delete/sentmessage"
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Secret"
              placeholder="Enter your API secret"
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="id"
              placeholder="Enter sent Message ID"
              type="number"
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
              value={scantodelete}
              onChange={handleonchange}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              sx={{ alignSelf: "flex-start", mt: 1 }}
              onClick={handlefordelete}
            >
              Send
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
  "message": "Sent WhatsApp chat has been deleted!",
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

export default DeleteSentChat;
