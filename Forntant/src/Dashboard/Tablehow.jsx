import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';


const columns = [
  { id: 'timestamp', label: 'CREATED', minWidth: 170 },
  { id: 'senderNumber', label: 'ACCOUNT', minWidth: 100 },
  { id: 'recipientNumber', label: 'RECIPIENT', minWidth: 170, align: 'right' },
  { id: 'messageContent', label: 'MESSAGE', minWidth: 170, align: 'right' },
  { id: 'API', label: 'API', minWidth: 170, align: 'right' },
  { id: 'status', label: 'STATUS', minWidth: 170, align: 'right' },
  { id: 'options', label: 'OPTIONS', minWidth: 170, align: 'right' },
];

export default function ShowSendData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showMessage, setShowMessage] = React.useState([]);
  const [loading, setLoading] = React.useState(true);



  const fetchMessages = async () => {
    try {
      // const response = await axios.get("http://localhost:4000/api/v1/messages");
      // setShowMessage(response.data.filter(msg => msg.status === 'waiting')); // Filter by 'waiting'
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMessages();

    // Polling to check for updates every 5 seconds
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/messages/${id}`);
      fetchMessages(); // Refresh message list after deletion
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const downloadData = () => {
    const csvData = showMessage.map(row => ({
      timestamp: new Date(row.timestamp).toLocaleString(),
      senderNumber: row.senderNumber,
      recipientNumber: row.recipientNumber,
      messageContent: row.messageContent,
      API: row.API,
      status: row.status
    }));

    const csvContent = [
      ["CREATED", "ACCOUNT", "RECIPIENT", "MESSAGE", "API", "STATUS"],
      ...csvData.map(item => [
        item.timestamp,
        item.senderNumber,
        item.recipientNumber,
        item.messageContent,
        item.API,
        item.status
      ])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "messages.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2, marginTop: "2rem" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            {!loading && showMessage.length > 0 ? (
              showMessage
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = column.id === 'timestamp'
                        ? new Date(row[column.id]).toLocaleString()
                        : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'options' ? (
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
                                onClick={() => handleDelete(row._id)} // Pass the message ID to delete
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
                  <Typography>No data available</Typography>
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
  );
}
