import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import QrScanAlert from "../Dashboard/Alerts/QrScanAlert";
import QrscanData from "../Dashboard/QrScanData";
import Search from "../Dashboard/Search";
import Drowepage from "./account/Drowepage";
import Drowerforlink from "./account/Drowerforrelink";
import { getUserSecretKey } from "./account/SecretApiKey/Secrectkey";

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
  const [page, setPage] = useState(0); // State for current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [totalCount, setTotalCount] = useState(0); // State f



  useEffect(() => {
    const fetchQrScans = async (params = {}) => {
      const token = Cookies.get('token');
   const secretKey =await getUserSecretKey()
      try {
        const response = await axios.get('http://localhost:4000/api/v1/qr-scans/user', {
          params: { ...params, page: page + 1, limit: rowsPerPage },
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Secret-Key': secretKey
          }
        });

        if (response.data.success && Array.isArray(response.data.scans)) {
          setQrScans(response.data.scans);
          setTotalCount(response.data.totalCount); // Update totalCount with the total number of scans
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
  }, [searchParams, page, rowsPerPage]); // Add searchParams as a dependency

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


  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the page number
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page on rows per page change
  };

  // Handle For Delete Qr Scan Whatsapp 
  const handleConfirmDelete = async () => {
    try {
      const secretKey = await  getUserSecretKey()
      const response = await axios.delete(
        `http://localhost:4000/api/v1/qr-scans/${scanToDelete}`, // Only ID in the URL
        { params: { secretKey } } // Send secretKey as a query parameter
      )
      if (response.status === 200) {
        setQrScans((prevQrScans) =>
          prevQrScans.filter((scan) => scan._id !== scanToDelete)
        );
        setSnackbarMessage("QR scan deleted successfully.");
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
        setSnackbarMessage("Session already exists for this WhatsApp ID.");
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
            page={page} // Pass page to QrscanData
            rowsPerPage={rowsPerPage} // Pass rowsPerPage to QrscanData
            totalCount={totalCount} // Pass totalCount to QrscanData
            onChangePage={handleChangePage} // Pass onChangePage handler
            onChangeRowsPerPage={handleChangeRowsPerPage} // Pass onChangeRowsPerPage handler
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
