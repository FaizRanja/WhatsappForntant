import React, { useState, useEffect } from 'react';
import {
    Box, TextField, Paper, Stack, IconButton,
    Typography, Button, Modal, CircularProgress, Backdrop, InputAdornment,
    Alert, MenuItem
} from '@mui/material';
import {
    Send as SendIcon, Add as AddIcon,
    VideoLibrary as VideoLibraryIcon, Image as ImageIcon,
    AudioFile as AudioFileIcon, Description as DescriptionIcon,
    AccountCircle as AccountCircleIcon, Phone as PhoneIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function QuickTitle() {
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQrScans = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:4000/api/v1/qr-scans/user");
                if (response.data.success && Array.isArray(response.data.scans)) {
                    setUsers(response.data.scans);
                } else {
                    console.error("Unexpected response data format:", response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching QR scans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQrScans();
    }, []);

    const uploadFileToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.url;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    };

    const handleSend = async () => {
        try {
            if (message.trim() && phoneNumber.trim() && number) {
                setStatus('Sending...');

                let fileUrl = '';
                if (selectedFile) {
                    // Upload file to Cloudinary and get the URL
                    fileUrl = await uploadFileToCloudinary(selectedFile);
                }

                const token = Cookies.get('token'); // Retrieve token from cookies
                console.log('Token from cookies:', token);
                if (!token) {
                  throw new Error('No token found. Please log in again.');
                }
          
                const config = {
                  headers: { 'Authorization': `Bearer ${token}` },
                  withCredentials: true, // Ensures cookies are sent with the request
                };
          
                // Fetch the user data from the backend
                const userResponse = await axios.get('http://localhost:4000/api/v1/user/Getallregisteruser', config);
                const { secretKey } = userResponse.data.user;
                if (!secretKey) {
                  throw new Error('No secret key found for the user.');
                }
          
                console.log(secretKey);



                // Sending data with POST request
                const response = await axios.post('http://localhost:4000/api/v1/qr-scans/user/sendmessage', {
                    phoneNumber,
                    number,
                    message,
                    fileType,
                    fileUrl, // Include uploaded file URL if exists
                    secretKey
                  },config);
          
                console.log(response)

                if (response.data.status === 'Message sent') {
                    setMessage('');
                    setSelectedFile(null);
                    setFileType('');
                    setFilePreviewUrl(null);
                    setStatus('Message sent successfully');
                    return true; // Return true to indicate success
                } else {
                    setStatus('Failed to send message');
                    return false;
                }
            } else {
                setStatus('Please fill in all fields');
                return false; // Return false if the form is not filled out
            }
        } catch (error) {
            setStatus('Failed to send message');
            console.error('Error sending message:', error);
            return false;
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileType(file.type);
            const url = URL.createObjectURL(file);
            setFilePreviewUrl(url);
            handleCloseModal();
        }
    };

    const handleSendClick = async () => {
        setLoading(true);
        try {
            const isSuccess = await handleSend();
            if (isSuccess) {
                navigate("/user/sendmessage"); // Navigate to the SendMessage page
                setStatus(''); // Clear status after successful send
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (filePreviewUrl) {
                URL.revokeObjectURL(filePreviewUrl);
            }
        };
    }, [filePreviewUrl]);

    return (
        <Stack sx={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: 2, width: '90%', maxWidth: 600 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Send Quick Chat
                </Typography>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, maxWidth: 600, margin: '0 auto' }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="reciver-number"
                        label="Receiver Number"
                        placeholder="Receiver Number"
                        value={number}
                        multiline
                        onChange={(e) => setNumber(e.target.value)}
                        maxRows={4}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="sender-number"
                        label="Sender Number"
                        placeholder="Sender Number"
                        select
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {users.length > 0 ? users.map(user => (
                            <MenuItem key={user._id} value={user.phoneNumber}>{user.phoneNumber}</MenuItem>
                        )) : <MenuItem value="">No users available</MenuItem>}
                    </TextField>
                    <TextField
                        id="message"
                        label="Message"
                        multiline
                        placeholder="Write Message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CommentIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {filePreviewUrl && (
                        <Box sx={{ marginTop: 2, overflow: 'hidden', textAlign: 'center' }}>
                            {fileType.startsWith('video/') && (
                                <video
                                    src={filePreviewUrl}
                                    controls
                                    style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                                />
                            )}
                            {fileType.startsWith('image/') && (
                                <img
                                    src={filePreviewUrl}
                                    alt="Selected"
                                    style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                                />
                            )}
                            {fileType.startsWith('audio/') && (
                                <audio
                                    src={filePreviewUrl}
                                    controls
                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                />
                            )}
                            {!fileType.startsWith('video/') && !fileType.startsWith('image/') && !fileType.startsWith('audio/') && (
                                <Typography>{selectedFile.name}</Typography>
                            )}
                        </Box>
                    )}
                    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendClick}
                            startIcon={<SendIcon />}
                        >
                            Send
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenModal}
                            startIcon={<AddIcon />}
                        >
                            Add File
                        </Button>
                    </Stack>
                    {status && (
                        <Alert sx={{ mt: 2 }} severity={status.includes('Failed') ? 'error' : 'success'}>
                            {status}
                        </Alert>
                    )}
                </Box>

                {/* File Upload Modal */}
                <Modal
                    open={showModal}
                    onClose={handleCloseModal}
                    aria-labelledby="upload-file-modal-title"
                    aria-describedby="upload-file-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="upload-file-modal-title" variant="h6" component="h2">
                            Select a File to Upload
                        </Typography>
                        <input
                            accept="video/*,image/*,audio/*,.pdf,.doc,.docx"
                            type="file"
                            onChange={handleFileChange}
                            style={{ marginTop: 16 }}
                        />
                    </Box>
                </Modal>

                {/* Loading Spinner */}
                <Backdrop open={loading} sx={{ zIndex: 9999 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Paper>
        </Stack>
    );
}
