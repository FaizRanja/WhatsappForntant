import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";

const WhatsappBulkmess = () => {
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
            <div id="api-whatsapp_get_bulk_Message">
              <Typography variant="h4" gutterBottom>
                WhatsApp- Send Bulk Chat
              </Typography>
              <Typography gutterBottom>
                Send bulk WhatsAppChat. Requires "whatsapp_send_bulk" API
                permission.
                <strong>get_whatsapp_pending</strong>
              </Typography>
              <pre className="full-pre pre-get">
                <span className="typ typ-get">GET</span>{" "}
                <span className="url">
                  https://app.thewhatsappcity.com/api/send/whatsapp.bulk
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
                    <td>mode</td>
                    <td>String</td>
                    <td>
                      Mode of sending the message, it can be "devices" which
                      will allow you to use your linked android devices or
                      "credits" which will allow you to use gateways and partner
                      devices. "credits" requires you to have enough credit
                      balance to send Chat. Allowed values: "devices", "credits"
                    </td>
                  </tr>
                  <tr>
                    <td>numbers</td>
                    <td>String</td>
                    <td>
                      List of phone numbers separated by commas. It can be
                      optional if "groups" parameter is not empty. It will
                      accept E.164 formatted number or locally formatted numbers
                      using the country code from your profile settings. Example
                      for Philippines E.164: +639184661533 Local: 09184661533
                    </td>
                  </tr>
                  <tr>
                    <td>message</td>
                    <td>String</td>
                    <td>
                      Message you want to send, spintax and shortcodes are
                      supported.
                    </td>
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
                      LList of Codes 400 = Invalid parameters 401 = Invalid API
                      secret 403 = Access denied 404 = Device doesn't exist 500
                      = Something went wrong
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
                  label="numbers"
                  placeholder="the form of number is + "
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                />
                <TextField
                  label="message"
                  placeholder="enter message"
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

export default WhatsappBulkmess
