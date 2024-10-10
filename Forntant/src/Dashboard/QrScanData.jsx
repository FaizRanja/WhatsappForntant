import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LinkIcon from '@mui/icons-material/Link';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

const columns = [
  { id: 'scannedAt', label: 'SCANNED AT', minWidth: 170 },
  { id: 'phoneNumber', label: 'LOGGED IN', minWidth: 100 },
  { id: 'whatsappId', label: 'UNIQUE ID', minWidth: 170 },
  { id: 'status', label: 'STATUS', minWidth: 170 },
  { id: 'options', label: 'OPTION', minWidth: 200 },
];

export default function QrscanData({
  qrScans,
  onLinkClick,
  onCopy,
  onDelete,
  page,
  rowsPerPage,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
}) {
  // Log the incoming prop to verify data
  console.log('QR Scans:', qrScans);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {qrScans.length > 0 ? (
              qrScans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((scan) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={scan._id}>
                    <TableCell align="center">
                      {scan.scannedAt
                        ? new Date(scan.scannedAt).toLocaleString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      {scan.phoneNumber || 'Unknown'}
                    </TableCell>
                    <TableCell align="center">{scan.whatsappId}</TableCell>
                    <TableCell align="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {scan.status === 'Connected' ? (
                          <>
                            <RssFeedIcon color="success" fontSize="small" />
                            <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                              Connected
                            </Typography>
                          </>
                        ) : scan.status === 'Disconnected' ? (
                          <>
                            <WifiOffIcon color="warning" fontSize="small" />
                            <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                              Disconnected
                            </Typography>
                          </>
                        ) : (
                          <>
                            <MailOutlineIcon color="error" fontSize="small" />
                            <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                              Unknown
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap="0rem">
                        <Tooltip title="Send Message">
                          <IconButton
                            onClick={() => handleOpenSendMessage(scan)}
                            sx={{
                              bgcolor: '#05785d',
                              borderRadius: '2px',
                              fontSize: '0.75rem',
                              padding: '6px',
                            }}
                          >
                            <MailOutlineIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ReLink WhatsApp Account">
                          <IconButton
                            onClick={() => onLinkClick(scan.whatsappId)}
                            sx={{
                              bgcolor: '#00d97e',
                              borderRadius: '2px',
                              padding: '6px',
                            }}
                          >
                            <LinkIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy this item">
                          <IconButton
                            onClick={() => onCopy(scan.whatsappId)}
                            sx={{
                              bgcolor: '#6e84a3',
                              borderRadius: '2px',
                              padding: '6px',
                            }}
                          >
                            <FileCopyIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete this item">
                          <IconButton
                            onClick={() => onDelete(scan._id)}
                            sx={{
                              bgcolor: '#e63757',
                              borderRadius: '2px',
                              padding: '6px',
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  No QR Scans Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Paper>
  );
}
