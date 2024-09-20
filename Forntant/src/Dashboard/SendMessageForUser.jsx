import React from 'react';
import { Button, Paper, Tooltip } from '@mui/material';
import { Refresh, Delete, Send } from '@mui/icons-material';

import ShowSendData from './ShowSendData';

const SendMessageForUser = () => {
    // Handler functions for button actions
    const handleRefresh = () => {
        // Implement refresh logic
        console.log("Refresh clicked");
    };

    const handleDelete = (e) => {
        e.preventDefault(); // Correct method name
        console.log("Delete clicked");
    };

    return (
      <>
        <Paper sx={{ width: '100%', mb: 2, p: 1 ,mt:-2}}> {/* Adjust margin-bottom and padding */}
            <div className="container">
                <div className="header-body">
                    <div className="row align-items-end">
                        <div className="col mb-2 mb-lg-0">
                            <h6 className="header-pretitle">
                                sms
                            </h6>
                            <h1 className="header-title">
                                <i className="la la-tasks la-lg"><Send/></i> SENT SMS
                            </h1>
                        </div>
                        <div className="col-auto ">
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
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    
        <ShowSendData />
      </>
    );
};

export default SendMessageForUser;
