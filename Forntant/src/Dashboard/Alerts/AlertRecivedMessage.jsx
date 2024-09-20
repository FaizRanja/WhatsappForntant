import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/system';

// Establish socket connection
 // Adjust the port if necessary

// Define a custom MUI theme
const theme = createTheme({
  palette: {
    info: {
      main: '#0288d1', // Main color used by MUI components
      dark: '#01579b', // Optional: Darker shade of the main color
    },
  },
});

// Styled Alert component with custom styles for enhanced appearance
const CustomAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.info.dark || '#0288d1', // Fallback color if theme is not available
  color: theme.palette.common.white, // Text color
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', // Adding a soft shadow for depth
  borderRadius: theme.shape.borderRadius, // Rounded corners
  fontWeight: 500, // Bold text
  fontSize: '1rem', // Slightly larger text for better readability
  padding: theme.spacing(2), // More padding for a spacious look
  '& .MuiAlert-icon': {
    color: theme.palette.common.white, // Icon color
  },
}));

// Transition function for sliding effect
const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

function AlertRecivedMessage({alert, message,close,severity}) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // Function to close the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Prevents closing when clicked outside
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust position as needed
        TransitionComponent={SlideTransition} // Slide transition for a smooth effect
      >
        <CustomAlert
          onClose={close}
          severity="info" // Severity can be 'error', 'warning', 'info', 'success'
          variant="filled" // Can be 'standard', 'outlined', 'filled'
          iconMapping={{ info: <span>💬</span> }} // Custom icon, can be replaced with any emoji or SVG
        >
          {message}
        </CustomAlert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default AlertRecivedMessage
