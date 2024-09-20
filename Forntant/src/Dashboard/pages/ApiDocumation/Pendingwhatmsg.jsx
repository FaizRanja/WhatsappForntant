import SendIcon from "@mui/icons-material/Send";
import {
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React from "react";


const Pendingwhatmsg = () => {
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
            <div id="api-whatsapp_Sent_Pending_Message">
              <Typography variant="h4" gutterBottom>
                WhatsApp- Get Pending Chat
              </Typography>
              <Typography gutterBottom>
                Get Pending Chat. Requires "get_whatsapp_pending" API
                permission.
                <strong>get_whatsapp_pending</strong>
              </Typography>
              <pre className="full-pre pre-get">
                <span className="typ typ-get">GET</span>{" "}
                <span className="url">
                  https://app.thewhatsappcity.com/api/get/whatsapp.pending
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
                    <td>limit (optional)</td>
                    <td>Number</td>
                    <td>
                      Limit the number of results per page. Default value: 10
                    </td>
                  </tr>
                  <tr>
                    <td>page (optional)</td>
                    <td>Number</td>
                    <td>Pagination of results. Default value: 1</td>
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
                      List of Codes 400 = Invalid parameters 401 = Invalid API
                      secret 403 = Access denied 500 = Something went wrong
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
                  label="limit"
                  placeholder="limit"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                />
                <TextField
                  label="Page"
                  placeholder="page"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SendIcon />}
                  sx={{ alignSelf: "flex-start", mt: 1 }}
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
  "message": "Pending WhatsAppChat",
  "data": [
       {
           "id": 1,
   
           "sender": "00000000-0000-0000-d57d-f30cb6a89289",
         
           "api": false,
           "recipient": "+639184661533",
           "message": "Hello World!",
           "created": 1645520349
       },
       {
           "id":
           "sender": "00000000-0000-0000-d57d-f30cb6a89289",
           "api": false,
           "recipient": "+639206150513",
           "message": "Hello World!",
           "created": 1645520349
       },
       {
           "id": 3,
             "sender": "00000000-0000-0000-d57d-f30cb6a89289",
           "api": false,
           "recipient": "+639184661532",
           "message": "Hello World!",
           "created": 1645520349
       }
   ]
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
  )
}

export default Pendingwhatmsg
