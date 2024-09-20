import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AlertSendMessage from "./Alerts/AlertSendMessage";
import SearchSms from "./SearchSms";
import { getUserSecretKey } from "../pages/account/SecretApiKey/Secrectkey";

const columns = [
  { id: "timestamp", label: "CREATED", minWidth: 150 },
  { id: "senderNumber", label: "ACCOUNT", minWidth: 100 },
  { id: "recipientNumber", label: "RECIPIENT", minWidth: 150, align: "right" },
  { id: "messageContent", label: "MESSAGE", minWidth: 150, align: "right" },
  { id: "API", label: "API", minWidth: 150, align: "right" },
  { id: "status", label: "STATUS", minWidth: 150, align: "right" },
  { id: "options", label: "OPTIONS", minWidth: 150, align: "right" },
];

export default function ShowSendData() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showMessage, setShowMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [scanToDelete, setScanToDelete] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    fetchMessages(searchParams);
  }, [searchParams]);

  const fetchMessages = async (params = {}) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const secretKey = await getUserSecretKey();
      // Pass the secretKey in headers or body based on backend expectation
      const response = await axios.get(
        "http://localhost:4000/api/v1/qr-scans/user/message",
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Secret-Key": secretKey,
          },
        }
      );

      if (response.data && Array.isArray(response.data.scans)) {
        setShowMessage(response.data.scans);
      } else {
        setShowMessage([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setShowMessage([]);
      setAlertSeverity("error");
      setAlertMessage("Error fetching messages");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setPage(0); // Reset page to 0 when new search parameters are applied
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmDelete = async () => {
    try {
      const secretKey = await getUserSecretKey();
      console.log(secretKey);

      if (!scanToDelete) return;
      const response = await axios.delete(
        `http://localhost:4000/api/v1/qr-scans/user/delete/sentmessage/${scanToDelete}`,
        { params: { secretKey } }
      );
      if (response.status === 200) {
        setShowMessage((prev) =>
          prev.filter((msg) => msg._id !== scanToDelete)
        );
        setAlertSeverity("success");
        setAlertMessage("Send  message deleted successfully");
      } else {
        setAlertSeverity("error");
        setAlertMessage("Error deleting send message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setAlertSeverity("error");
      setAlertMessage("Error deleting message");
    }
    setAlertOpen(true);
    closeConfirmDialog();
  };

  const openConfirmDialog = (scanId) => {
    setScanToDelete(scanId);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setScanToDelete(null);
  };

  const downloadData = () => {
    const csvData = showMessage.map((row) => ({
      timestamp: new Date(row.timestamp).toLocaleString(),
      senderNumber: row.senderNumber,
      recipientNumber: row.recipientNumber,
      messageContent: row.messageContent,
      API: row.API,
      status: row.status,
    }));
    const csvContent = [
      ["CREATED", "ACCOUNT", "RECIPIENT", "MESSAGE", "API", "STATUS"],
      ...csvData.map((item) => [
        item.timestamp,
        item.senderNumber,
        item.recipientNumber,
        item.messageContent,
        item.API,
        item.status,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle alert close
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper sx={{ width: "100%", mb: 2, marginTop: "2rem" }}>
        <Stack>
          <SearchSms onSearch={handleSearch} />
        </Stack>
        <hr />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {showMessage.length > 0 ? (
                showMessage
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value =
                          column.id === "timestamp"
                            ? new Date(row[column.id]).toLocaleString()
                            : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "options" ? (
                              <Box display="flex" justifyContent="center">
                                <IconButton
                                  aria-label="download"
                                  onClick={downloadData}
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 4,
                                    backgroundColor: "#05785d",
                                    margin: 2,
                                  }}
                                >
                                  <FileDownloadIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 4,
                                    backgroundColor: "#E63757",
                                    margin: 2,
                                  }}
                                  onClick={() => openConfirmDialog(row._id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={showMessage.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        className="animated-dialog"
        color="error"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this message?</Typography>
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

      {/* Alert Snackbar */}

      <AlertSendMessage
        alert={alertOpen}
        close={handleAlertClose}
        severity={alertSeverity}
        message={alertMessage}
      />
    </>
  );
}
