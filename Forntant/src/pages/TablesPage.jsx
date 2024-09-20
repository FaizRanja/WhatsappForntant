import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert
} from "@mui/material";
import axios from "axios";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import QrscanData from "../Dashboard/QrScanData";
import Drowepage from "./account/Drowepage";
import Drowerforlink from "./account/Drowerforrelink";
import Search from "../Dashboard/Search";
import QrScanAlert from "../Dashboard/Alerts/QrScanAlert";
import Cookies from 'js-cookie';

const TablesPage = ({ sectionId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkDroweOpen, setLinkDroweOpen] = useState(false);
  const [whatsappId, setWhatsappId] = useState("");
  const [qrScans, setQrScans] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [scanToDelete, setScanToDelete] = useState(null);
  const [copyUniqueId, setCopyUniqueId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchParams, setSearchParams] = useState({});
  const [refresh, setRefresh] = useState("");

  http://localhost:4000/api/v1/qr-scans/user

  useEffect(() => {
    const fetchQrScans = async (params = {}) => {

      const token = Cookies.get('token');
      console.log(token)
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
  
      const userResponse = await axios.get('http://localhost:4000/api/v1/user/Getallregisteruser', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });
      const { secretKey } = userResponse.data.user;
      console.log(secretKey)
      if (!secretKey) {
        throw new Error('No secret key found for the user.');
      }

      try {
        const response = await axios.get('http://localhost:4000/api/v1/qr-scans/user', {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Secret-Key': secretKey
          }
        });

        if (response.data.success && Array.isArray(response.data.scans)) {
          setQrScans(response.data.scans);
        } else {
          setQrScans([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching QR scans:", error);
        setLoading(false);
      }
    };

    fetchQrScans(searchParams);  // Pass searchParams here

    const intervalId = setInterval(() => fetchQrScans(searchParams), 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [searchParams]); // Add searchParams as a dependency

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const openConfirmDialog = (scanId) => {
    setScanToDelete(scanId);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setScanToDelete(null);
    setConfirmDialogOpen(false);
  };

  // Handle For Delete Qr Scan Whatsapp 
  const handleConfirmDelete = async () => {
    try {
      if (!scanToDelete) {
        console.error("Invalid scan ID");
        return;
      }

      const response = await axios.delete(
        `http://localhost:4000/api/v1/qr-scans/${scanToDelete}`
      );

      if (response.status === 200) {
        setQrScans((prevQrScans) =>
          prevQrScans.filter((scan) => scan._id !== scanToDelete)
        );
        setSnackbarMessage("QR scan User deleted successfully.");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Failed to delete QR scan.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error deleting scan:", error);
      setSnackbarMessage("Error deleting QR scan.");
      setSnackbarSeverity("error");
    }

    setSnackbarOpen(true);
    closeConfirmDialog();
  };

  const handleAddCopyUniqueid = (whatsappId) => {
    navigator.clipboard
      .writeText(whatsappId)
      .then(() => {
        setCopyUniqueId(whatsappId);
        setSnackbarMessage(`${whatsappId} copied to clipboard!`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setSnackbarMessage("Failed to copy text.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLinkClick = async (id) => {
    try {
      // Corrected API endpoint
      const response = await axios.post("http://localhost:4000/api/v1/qr-scans/user/generatecode/relink", { whatsappId: id });
      
      // Log the response for debugging
      console.log(response);
      if (response.data.success) {
        setWhatsappId(id);
        setLinkDroweOpen(true);
      } else {
        console.error("Failed to relink WhatsApp account:", response.data.message);
        setSnackbarMessage("Failed to relink WhatsApp account.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error relinking WhatsApp account:", error);
      setSnackbarMessage("Error relinking WhatsApp account.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params); // Update searchParams here
  };

  // Function for refresh data
  const handleonreresh = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/qr-scans/user/refreshdata");
      setRefresh(response.data.refresh);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  return (
    <>
      <Paper sx={{ width: '100%', mb: 4, p: 2 }}>
        <div className="container">
          <div className="header-body">
            <div className="row align-items-end">
              <div className="col mb-2 mb-lg-0">
                <h6 className="header-pretitle">
                  WhatsApp
                </h6>
                <h1 className="header-title">
                  <i className="la la-tasks la-lg"></i> WhatsApp Queue
                </h1>
              </div>
              <div className="col-auto">
                <Tooltip title="Refresh" arrow>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: '3px' }}
                    onClick={handleonreresh}
                  >
                    <SyncProblemIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Link Whatsapp Account" arrow>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={toggleDialog}
                    sx={{ margin: '3px' }}
                  >
                    <WhatsAppIcon /> Add Account
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <div>
        <Search onSearch={handleSearch} />
      </div>
      {loading ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Stack mt={"2rem"}>
          <QrscanData
            qrScans={qrScans}
            onLinkClick={handleLinkClick}
            onCopy={handleAddCopyUniqueid}
            onDelete={openConfirmDialog}
            sectionId={sectionId}
          />
        </Stack>
      )}

      {dialogOpen && <Drowepage />}
      {linkDroweOpen && (
        <Drowerforlink WhatsApp={whatsappId} onClose={() => setLinkDroweOpen(false)} />
      )}

      <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog} className="animated-dialog" color="error">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this QR scan?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <QrScanAlert alert={snackbarOpen} close={handleCloseSnackbar} severity={snackbarSeverity} message={snackbarMessage} />
    </>
  );
};

export default TablesPage;