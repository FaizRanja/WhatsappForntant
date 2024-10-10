import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import QRCode from "react-qr-code";
import TablesPage from "../TablesPage";
import axios from 'axios';

const Drowerforlink = ({ WhatsApp, onClose }) => {
  const [qrCode, setQrCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qrcodeDialogOpen, setQrcodeDialogOpen] = useState(false);
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [redirectToTables, setRedirectToTables] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false); // State to manage backdrop visibility

  useEffect(() => {
    swal({
      title: "LINK ACCOUNT",
      text: "Connect your WhatsApp by clicking the button to display the QRCode then scan it via Link a device button in the app. You only have 15 seconds to scan the QRCode.",
      icon: "info",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Add Account",
          value: "add",
        },
      },
      dangerMode: true,
      className: "my-swal",
    }).then((value) => {
      if (value === "add") {
        handleAddAccount();
      } else {
        swal("Cancelled", "Your action was cancelled", "error");
      }
    });
  }, []);

 

  const handleAddAccount = async () => {
    try {
      
      setLoading(true); // Start loading when making the request
      setBackdropOpen(true); // Open the backdrop to blur the screen and show loader
      const response = await axios.post("http://localhost:4000/api/v1/qr-generate", {
        whatsappId: WhatsApp
      });
      const { qrCode } = response.data;
      if (qrCode) {
        setQrCode(qrCode);
        setSection(WhatsApp);
        setLoading(false);
        setDialogOpen(false); // Close confirmation dialog
        setQrcodeDialogOpen(true); // Open QR code dialog
      } else {
        throw new Error("QR code not generated");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      setLoading(false);
      setBackdropOpen(false); // Close the backdrop if there's an error
      swal("Error", "Failed to generate QR code", "error");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close confirmation dialog
    handleAddAccount(); // Start QR code generation
  };

  const handleQrcodeDialogClose = () => {
    setQrcodeDialogOpen(false);
    setTimer(15);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  if (redirectToTables) {
    return <TablesPage />;
  }

  return (
    <div>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(5px)", // Apply blur effect to the backdrop
          }}
          open={backdropOpen} // Control visibility with state
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography>Your account has been added!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={qrcodeDialogOpen} onClose={handleQrcodeDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle textAlign={"center"}>Add WhatsApp Account</DialogTitle>
          <DialogContent>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              {loading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : qrCode ? (
                <>
                  <QRCode
                    size={128}
                    style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                    value={qrCode}
                    viewBox={"0 0 256 256"}
                  />
                  <Typography variant="caption" mt={"5px"} display="block" gutterBottom>
                    Time remaining: {timer}s
                  </Typography>
                </>
              ) : (
                <Typography>No QR code available</Typography>
              )}
            </div>  
          </DialogContent>
          <DialogActions> 
            <Button onClick={handleQrcodeDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </div>
  );
};

export default Drowerforlink;
