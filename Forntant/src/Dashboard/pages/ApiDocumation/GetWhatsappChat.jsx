import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";


const GetWhatsappChat = () => {
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
            <div id="api-whatsapp_get_account__Chat">
              <Typography variant="h4" gutterBottom>
                WhatsApp - Get Accounts
              </Typography>
              <Typography gutterBottom>
                Get Accounts. Requires "get_wa_accounts" API permission.
                <strong>get_get_whatsapp_account</strong>
              </Typography>
              <pre className="full-pre pre-get">
                <span className="typ typ-get">GET</span>{" "}
                <span className="url">
                  https://app.thewhatsappcity.com/api/get/wa.accounts
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
                  value="https://app.thewhatsappcity.com/api/get/wa.accounts"
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
                  label="Limit"
                  placeholder="limit"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                />
                <TextField
                  label="page"
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

export default GetWhatsappChat
