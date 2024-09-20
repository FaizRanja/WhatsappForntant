import React, { useState } from 'react';
import { Button, Paper, Tooltip, Drawer, Box, IconButton } from '@mui/material';
import { Refresh, Delete, Telegram, Close } from '@mui/icons-material';
import ColumnGroupingTable from './Tablehow';
import QuckTitle from './QuckTitle';
import Notifactionformessage from '../Dashboard/Alerts/Notifactionformessage';



const SendMessage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleRefresh = () => {
        // Implement refresh logic
    };

    const handleDelete = () => {
        // Implement delete logic
    };

    const handleQuickToggle = () => {
        setDrawerOpen(!drawerOpen); // Toggle drawer open/close
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false); // Close the drawer
    };

    const handleMessageSent = () => {
        setDrawerOpen(false); // Close the drawer when message is sent
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
                                        onClick={handleRefresh}
                                        sx={{ margin: '3px' }}
                                    >
                                        <Refresh fontSize="small" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Delete selected item" arrow>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleDelete}
                                        sx={{ margin: '3px' }}
                                    >
                                        <Delete fontSize="small" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Send Quick Chat" arrow>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleQuickToggle}
                                        sx={{ margin: '3px' }}
                                    >
                                        <Telegram fontSize="small" /> Quick
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        <Notifactionformessage/>
            <ColumnGroupingTable />
           
        

            {/* Drawer Component */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{
                    marginTop: "1rem",
                    '& .MuiDrawer-paper': {
                        position: 'absolute',
                        top: '0',
                        left: '30%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: 600,
                        height: 'auto',
                        overflow: 'auto',
                        borderRadius: '16px 16px 0 0', // Rounded corners at the bottom
                    },
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{ position: 'absolute', top: 16, right: 16 }}
                    >
                        <Close />
                    </IconButton>
                   
                    <QuckTitle  />
                </Box>
            </Drawer>
        </>
    );
};

export default SendMessage;
