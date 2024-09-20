import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import QRCode from 'react-qr-code';
import swal from 'sweetalert';
import { getUserSecretKey } from './SecretApiKey/Secrectkey';

const Drowepage = () => {
  const [qrCode, setQrCode] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qrcodeDialogOpen, setQrcodeDialogOpen] = useState(false);
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to handle the swal dialog
  useEffect(() => {
    swal({
      title: 'LINK ACCOUNT',
      text: 'Connect your WhatsApp by clicking the button to display the QR Code then scan it via "Link a device" in the app. You have 15 seconds to scan the QR Code.',
      icon: 'info',
      buttons: {
        cancel: 'Cancel',
        confirm: {
          text: 'LINK ACCOUNT',
          value: 'add',
        },
      },
      dangerMode: true,
      className: 'my-swal',
    }).then((value) => {
      if (value === 'add') {
        handleAddAccount();
      } else {
        swal('Cancelled', 'Your action was cancelled', 'error');
      }
    });
  }, []);

  // Function to create WhatsApp section
  const createWhatsappSection = async () => {
    setLoading(true);
    const randomId = Math.random().toString(36).substr(2, 9);

    try {
     const secretKey =await getUserSecretKey()
      // Make the request to create a WhatsApp session and get the QR code
      const postResponse = await axios.post('http://localhost:4000/api/v1/qr-scans/user/createsection', { 
        id: randomId, 
        secretKey: secretKey 
      }, config);

      const { qrCode } = postResponse.data;

      if (typeof qrCode === 'string' && qrCode.trim() !== '') {
        setQrCode(qrCode);
      } else {
        console.error('Invalid QR code received:', qrCode);
        swal('Error', 'Invalid QR code received', 'error');
      }

      setLoading(false);
      startTimer();
    } catch (error) {
      console.error('Error generating QR code:', error.message || error);
      swal('Error', 'Failed to generate QR code: ' + (error.message || error), 'error');
      setLoading(false);
    }
  };

  // Function to start the timer for QR code expiry
  const startTimer = () => {
    setTimer(15);
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(newIntervalId);
          setQrcodeDialogOpen(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  // Function to handle account linking
  const handleAddAccount = () => {
    setDialogOpen(true);
  };

  // Function to handle dialog close and open QR code dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setQrcodeDialogOpen(true);
    createWhatsappSection();
  };

  // Function to handle QR code dialog close
  const handleQrcodeDialogClose = () => {
    setQrcodeDialogOpen(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>LINK ACCOUNT</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            To link your WhatsApp account, click "Generate QR Code" to display the code, then scan it via "Link a device" in WhatsApp.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Generate QR Code
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={qrcodeDialogOpen} onClose={handleQrcodeDialogClose}>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <Vortex color="#00BFFF" height={100} width={100} />
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {qrCode && <QRCode value={qrCode} />}
            </div>
          )}
          <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
            You have {timer} seconds to scan the QR code.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQrcodeDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Drowepage;
