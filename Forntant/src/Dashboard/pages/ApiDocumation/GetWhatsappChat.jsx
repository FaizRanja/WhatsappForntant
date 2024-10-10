import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const GetWhatsappChat = () => {
  const [secretKey, setSecretKey] = useState(
    ""
  );
  const [success, setSuccess] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [limit, setLimit] = useState(10); // Default limit
  const [page, setPage] = useState(1); // Default page
  const [receivedMessages, setReceivedMessages] = useState([]); // State to store received messages

  // Function to handle closing the alert
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  // Function to fetch received chats
  const handleGetReceivedChat = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        setSuccess("Authentication token not found.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      if (!secretKey) {
        setSuccess("Secret key is required.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/api/v1/qr-scans/user",
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Secret-Key": secretKey, // Adjust header name if necessary
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const data = Array.isArray(response.data.scans)
          ? response.data.scans
          : [];
        setSuccess("Whatsapp Account  Received Successfully.");
        setReceivedMessages(data);
        setAlertSeverity("success");
      } else {
        setSuccess("Error Fetching Received Messages.");
        setReceivedMessages([]); // Reset to empty array on error
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error("Error fetching received messages:", error);
      setSuccess("Error Fetching Received Messages.");
      setReceivedMessages([]); // Reset to empty array on error
      setAlertSeverity("error");
    } finally {
      setAlertOpen(true);
    }
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
        <div id="api-whatsapp_get_Wahtsapp_Account">
          <Typography variant="h4" gutterBottom>
            WhatsApp - Get Whatsapp Account
          </Typography>
          <Typography gutterBottom>
            Get Whatsapp Account. Requires "get_whatsapp_Account" API permission.
          </Typography>
          <pre className="full-pre pre-get">
            <span className="typ typ-get">GET</span>{" "}
            <span className="url">
            http://localhost:4000/api/v1/qr-scans/user
            </span>
          </pre>

          <Typography variant="h6" gutterBottom>
            Parameters
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
                  The API secret you copied from the (Tools API Keys) page.
                </td>
              </tr>
              <tr>
                <td>limit (optional)</td>
                <td>Number</td>
                <td>
                  Limit the number of results per page. Default value: 10.
                </td>
              </tr>
              <tr>
                <td>page (optional)</td>
                <td>Number</td>
                <td>Pagination of results. Default value: 1.</td>
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
                  List of Codes: 400 = Invalid parameters, 401 = Invalid API
                  secret, 403 = Access denied, 500 = Something went wrong.
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
              value="http://localhost:4000/api/v1/qr-scans/user"
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
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Limit"
              placeholder="Limit"
              type="number"
              variant="outlined"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Page"
              placeholder="Page"
              type="number"
              variant="outlined"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              sx={{ alignSelf: "flex-start", mt: 1 }}
              onClick={handleGetReceivedChat}
            >
              Send
            </Button>
          </Stack>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Received Messages:
          </Typography>

          {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
            <ul>
              {receivedMessages.map((msg, index) => (
                <li key={msg._id || index}>
                  <strong>Sender Number:</strong> {msg.senderNumber || "N/A"}{" "}
                  <br />
                  <strong>Recipient Number:</strong>{" "}
                  {msg.recipientNumber || "N/A"} <br />
                  <strong>Message Content:</strong>{" "}
                  {msg.messageContent || "N/A"} <br />
                  <strong>Status:</strong> {msg.status || "N/A"} <br />
                  <strong>Timestamp:</strong>{" "}
                  {new Date(msg.timestamp).toLocaleString() || "N/A"} <br />
                  <strong>Message ID:</strong> {msg._id || "N/A"} <br />
                  <strong>Sender ID:</strong> {msg.senderId || "N/A"} <br />
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No messages received yet.</Typography>
          )}

          {/* Success Response Example */}
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
  "message": "WhatsApp Accounts",
  "data": [
       {
           "id": 1,
           "phone": "+639760713666",
           "unique": "90cf7d40a467d5f40a39fca222c216449cb9abee73e5e2b0b321060c2ae06a8fa9e45486",
           "status": "connected",
           "created": 1645128758
       }
   ]
}`}
                </code>
          </pre>

          {/* Error Response Example */}
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

      {/* Snackbar for Alerts */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
};




export default GetWhatsappChat
