import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Paper,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import KeyIcon from "@mui/icons-material/Key";
  import { getUserSecretKey } from "../../pages/account/SecretApiKey/Secrectkey";
  import { useSnackbar } from "notistack"; // Import the notification hook
  
  const columns = [
    { id: "timestamp", label: "CREATED", minWidth: 150 },
    { id: "permissions", label: "PERMISSIONS", minWidth: 150, align: "left" },
    { id: "options", label: "OPTIONS", minWidth: 150, align: "right" },
  ];
  
  const permissions = [
    {
      id: "1",
      label:
        "Delete Received Messages, Delete Sent Chat, Delete Sent Message, Delete Whatsapp Received Message, Delete Whatsapp Sent Message, Get Sent Message, Get Whatsapp Chat, Link Whatsapp, Pending Whatsapp Message, Relink Whatsapp, Whatsapp Bulk Message, Whatsapp Received Message, Whatsapp Single Message",
      minWidth: 150,
      align: "left",
    },
  ];
  
  const ApiSecreact = () => {
    const [secretKey, setSecretKey] = useState("");
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook to trigger notifications
  
    // Function to fetch the secret key
    useEffect(() => {
      const fetchSecretKey = async () => {
        try {
          const fetchedKey = await getUserSecretKey();
          setSecretKey(fetchedKey);
        } catch (error) {
          console.error("Error fetching secret key:", error);
        }
      };
  
      fetchSecretKey();
    }, []);
  
    // Copy the secret key to clipboard and show notification
    const handleCopy = async () => {
      if (secretKey) {
        try {
          await navigator.clipboard.writeText(secretKey);
          enqueueSnackbar("Secret key copied to clipboard!", { variant: "success" }); // Success notification
        } catch (error) {
          enqueueSnackbar("Failed to copy secret key!", { variant: "error" }); // Error notification
          console.error("Failed to copy secret key:", error);
        }
      } else {
        enqueueSnackbar("No secret key found.", { variant: "warning" }); // Warning notification
      }
    };
  
    const handleEdit = (rowId) => {
      console.log(`Editing row ID: ${rowId}`);
    };
  
    const handleDelete = (rowId) => {
      console.log(`Deleted row ID: ${rowId}`);
    };
  
    return (
      <Box m={2}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 440,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
          }}
        >
          <Table stickyHeader aria-label="permissions table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.length > 0 ? (
                permissions.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f0f8ff" },
                    }}
                  >
                    {columns.map((column) => {
                      const value =
                        column.id === "timestamp"
                          ? new Date().toLocaleString()
                          : row[column.id] || row.label;
  
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            backgroundColor:
                              column.id === "permissions" ? "#eaf7ff" : "inherit",
                            padding: "12px",
                            fontWeight: column.id === "permissions" ? "500" : "normal",
                          }}
                        >
                          {column.id === "options" ? (
                            <Box display="flex" justifyContent="center">
                              <Tooltip title="Copy Api KEY" arrow>
                                <IconButton
                                  aria-label="copy"
                                  sx={{
                                    backgroundColor: "#5A9",
                                    "&:hover": { backgroundColor: "#4A8" },
                                    color: "#fff",
                                    m: 0.5,
                                    p: 1,
                                  }}
                                  onClick={handleCopy}
                                >
                                  <KeyIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit" arrow>
                                <IconButton
                                  aria-label="edit"
                                  sx={{
                                    backgroundColor: "#FFA500",
                                    "&:hover": { backgroundColor: "#FF8C00" },
                                    color: "#fff",
                                    m: 0.5,
                                    p: 1,
                                  }}
                                  onClick={() => handleEdit(row.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" arrow>
                                <IconButton
                                  aria-label="delete"
                                  sx={{
                                    backgroundColor: "#E63757",
                                    "&:hover": { backgroundColor: "#D62847" },
                                    color: "#fff",
                                    m: 0.5,
                                    p: 1,
                                  }}
                                  onClick={() => handleDelete(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : column.id === "permissions" ? (
                            <Box>
                              {value.split(", ").map((permission, index) => (
                                <Typography
                                  key={index}
                                  variant="body2"
                                  sx={{
                                    whiteSpace: "normal",
                                    wordWrap: "break-word",
                                    paddingBottom: "4px",
                                  }}
                                >
                                  {permission}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                              }}
                            >
                              {value}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="body2">No Data Found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default ApiSecreact;
  