import {
    AccountCircle as AccountCircleIcon,
    Add as AddIcon,
    Comment as CommentIcon,
    Phone as PhoneIcon,
    Send as SendIcon
} from '@mui/icons-material';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    MenuItem,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSecretKey } from '../pages/account/SecretApiKey/Secrectkey';

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
                const token = Cookies.get('token');
                const secretKey = await getUserSecretKey();
                const response = await axios.get("http://localhost:4000/api/v1/qr-scans/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Secret-Key': secretKey,
                    },
                });
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

    const handleSendMessage = async () => {
        try {
            if (message.trim() && phoneNumber.trim() && number) {
                setStatus('Sending message...');

                const secretKey = await getUserSecretKey();
                const response = await axios.post('http://localhost:4000/api/v1/qr-scans/user/sendmessage', {
                    phoneNumber,
                    number,
                    message,
                    secretKey
                });

                if (response.data.status === 'Message sent') {
                    setStatus('Message sent successfully');
                    return true;
                } else {
                    setStatus('Failed to send message');
                    return false;
                }
            } else {
                setStatus('Please fill in all fields');
                return false;
            }
        } catch (error) {
            setStatus('Failed to send message');
            console.error('Error sending message:', error);
            return false;
        }
    };

    const handleSendAttachment = async (fileUrl) => {
        try {
            setStatus('Sending attachment...');
            const secretKey = await getUserSecretKey();
            const response = await axios.post('http://localhost:4000/api/v1/qr-scans/user/sendmessage', {
                phoneNumber,
                number,
                fileType,
                fileUrl,
                secretKey
            });

            if (response.data.status === 'File sent') {
                setStatus('Attachment sent successfully');
                return true;
            } else {
                setStatus('Failed to send attachment');
                return false;
            }
        } catch (error) {
            setStatus('Failed to send attachment');
            console.error('Error sending attachment:', error);
            return false;
        }
    };

    const handleSendClick = async () => {
        setLoading(true);
        try {
            // First, send the message
            const isMessageSent = await handleSendMessage();

            if (isMessageSent) {
                // If a file is selected, send the attachment
                if (selectedFile) {
                    const fileUrl = await uploadFileToCloudinary(selectedFile);
                    await handleSendAttachment(fileUrl);
                }
                navigate("/user/sendmessage"); // Navigate to SendMessage page after successful send
                setSelectedFile(null);
                setFileType('');
                setFilePreviewUrl(null);
                setStatus('');
                setMessage('')
            }
        } catch (error) {
            console.error('Error sending message and/or attachment:', error);
            setStatus('Failed to send message and/or attachment');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'audio/mpeg', 'audio/wav', 'application/pdf'];
            if (validTypes.includes(file.type)) {
                setSelectedFile(file);
                setFileType(file.type);
                const url = URL.createObjectURL(file);
                setFilePreviewUrl(url);
                handleCloseModal();
                setStatus(''); // Clear any previous status
            } else {
                setStatus('Invalid file type. Please upload an image, audio, video, or PDF file.');
            }
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
                            {fileType === 'application/pdf' && (
                                <Typography>{selectedFile.name}</Typography>
                            )}
                        </Box>
                    )}
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={handleOpenModal} startIcon={<AddIcon />}>
                            Attachment
                        </Button>
                        <Button
                            onClick={handleSendClick}
                            variant="contained"
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            disabled={loading}
                        >
                            Send
                        </Button>
                    </Stack>
                    {status && (
                        <Box sx={{ marginTop: 2 }}>
                            <Alert severity="info">{status}</Alert>
                        </Box>
                    )}
                </Box>
            </Paper>
            <Modal open={showModal} onClose={handleCloseModal}>
                <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Box sx={{
                        width: 400,
                        maxWidth: '90%',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        p: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" component="h2">
                            Upload Attachment
                        </Typography>
                        <Button variant="contained" component="label">
                            Choose File
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    </Box>
                </Backdrop>
            </Modal>
        </Stack>
    );
}   
