import React, { useEffect, useState } from "react";
import {
 
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import QRCode from "react-qr-code";
import swal from "sweetalert";

const LinkWhatsapp = () => {

    const [id, setId] = useState("");
    const [qrcode, setQrCode] = useState("");
    const [intervalId, setIntervalId] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(15);
    const [showQRCode, setShowQRCode] = useState(false);
    const [secrectKey, setsecrectKey] = useState("");


      // Function for fetch link whatsapp Account by Qr code
  const handleqrcode = async () => {
    setLoading(true); // Start loading when the button is clicked
    try {
      const response = await axios.post('http://localhost:4000/api/v1/qr-scans/user/createsection', { id: id,secretKey:secrectKey })
      const { qrCode } = response.data;
      console.log(qrCode)
      if (typeof qrCode === "string" && qrCode.trim() !== "") {
        setQrCode(qrCode);
        setLoading(false); // Stop loading when QR code is fetched
        startTimer();
        setShowQRCode(true);
        
      } else {
        console.error("Invalid QR code received:", qrCode);
        swal("Error", "Invalid QR code received", "error");
        setLoading(false); // Stop loading on error
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      swal("Error", "Failed to generate QR code", "error");
      setLoading(false); // Stop loading on error
    }
  };
  // Function for timer
  const startTimer = () => {
    setTimer(15);
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(newIntervalId);
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };
// Using useEffect for api call one time and 15s time  scond the qr code will closed 
  useEffect(() => {
    let countdown;
    if (showQRCode && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowQRCode(false); // Hide QR code when timer reaches 0
      setQrCode(""); // Clear QR code value
    }

    return () => clearInterval(countdown); // Cleanup the timer
  }, [showQRCode, timer]);




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
            <div id="api-whatsapp_link_account__Chat">
              <Typography variant="h4" gutterBottom>
                WhatsApp - Link WhatsApp Account
              </Typography>
              <Typography gutterBottom>
                Link WhatsApp Account. Use this to link WhatsApp accounts that
                are not yet in the system. Requires "create_whatsapp" API
                permission.
                <strong>get_link_whatsapp_account</strong>
              </Typography>
              <pre className="full-pre pre-get">
                <span className="typ typ-get">GET</span>{" "}
                <span className="url">
                  http://localhost:4000/api/v1/qr-scans/user
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
                    <td>Enter Random id for gernate Qr Code</td>
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
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                  value={secrectKey}
                  onChange={(e)=>setsecrectKey(e.target.value)}
                />
                <TextField
                  label="ID"
                  placeholder="Please enter random ID"
                  type="number"
                  variant="outlined"
                  value={id}
                  onChange={(e) => setId(e.target.value)} // Make sure this updates correctly
                  fullWidth
                  sx={{ bgcolor: "#fff", borderRadius: 1 }}
                  
                />

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SendIcon />}
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                  onClick={handleqrcode}
                >
                  Send
                </Button>
              </Stack>

              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                  }}
                >
                  <Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                  />
                </div>
              ) : (
                showQRCode && qrcode && (
                  <Paper
                    style={{
                      display: "inline-block",
                      padding: "16px",
                      textAlign: "center",
                      justifyContent:"center",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <QRCode value={qrcode} size={200} />
                    <Typography>{timer} seconds left</Typography>
                  </Paper>
                )
              )}

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
            qrstring: "2@MwggDzdZqWfC4vYBJQsExNnSuE6+fyGYVo+/RfMyWUxJBW2Q0yDKykpqRi+pSoHquonRk5P6CaVOsg==,BpVhDS5yHBbN9k/xCiQIWwOduYcyo/1tMhoWaNpwJC8=,7F75UfkJzXY6GbLy+3evLc9aCkyN40K2ORR0dZ84eSk=,7nQ0NTR4eaXRZOwIbv9FKoFpFTSNu6fHzKGaICsyDzc=",
       qrimagelink: "https://app.thewhatsappcity.com/api/get/wa.qr?token=e10adc3949ba59abbe56e057f20f883e",
       infolink: "https://app.thewhatsappcity.com/api/get/wa.info?token=e10adc3949ba59abbe56e057f20f883e",
  }
}
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

export default LinkWhatsapp
