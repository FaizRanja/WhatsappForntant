// App.js
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinkWhatsapp from "./ApiDocumation/LinkWhatsapp";
import RelinkWhatsapp from "./ApiDocumation/RelinkWhatsapp";
import GetWhatsappChat from "./ApiDocumation/GetWhatsappChat";
import DeleteWhatsappsent from "./ApiDocumation/DeleteWhatsappsent";
import DeleteSentChat from "./ApiDocumation/DeleteSentChat";
import DeleteWhastappRecivedChat from "./ApiDocumation/DeleteWhastappRecivedChat";
import WhatsappBulkmess from "./ApiDocumation/WhatsappBulkmess";
import Whatsappsinglemeg from "./ApiDocumation/Whatsappsinglemeg";
import WhatsappRecivedmsg from "./ApiDocumation/WhatsappRecivedmsg";
import GetSentMessage from "./ApiDocumation/GetSentMessage";
import Pendingwhatmsg from "./ApiDocumation/Pendingwhatmsg";
import Deletesentmsg from "./ApiDocumation/Deletesentmsg";
import DeleteRecivedmsg from "./ApiDocumation/DeleteRecivedmsg";


const menuItems = [
  {
    title: " Link WhatsApp Account",
    method: "GET ",
    description: "WhatsApp - Get Accounts ",
    url: "http://localhost:4000/api/v1/qr-scans/user",
    sectionId: "api-whatsapp_link_account__Chat",
  },
  {
    title: " Relink WhatsApp Account",
    method: "GET ",
    description: "WhatsApp - Get Accounts ",
    url: "http://localhost:4000/api/v1/qr-scans/user/generatecode/relink",
    sectionId: "api-whatsapp_Relink_account",
  },
  {
    title: "  Send Single Chat",
    method: "POST",
    description: "WhatsApp - Send Single Chat   ",
    url: "http://localhost:4000/api/v1/qr-scans/user/sendmessage",
    sectionId: "api-whatsapp_sent_single_Message",
  },
  {
    title: "Delete Sent Chat",
    method: "DELETE",
    description: "WhatsApp - Delete Sent Chat",
    url: "http://localhost:4000/api/v1/qr-scans/user/delete/sentmessage",
    sectionId: "api-whatsapp_delete_sent__Chat",
  },
  {
    title: "Delete Received Chat",
    method: "GET",
    description: "Whatsapp - Delete Received Message",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.received",
    sectionId: "api-whatsapp-Delete_Received_Chat",
  },

  {
    title: "Pending Chat",
    method: "GET",
    description: "WhatsApp- Get Pending Chat",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_Sent_Pending_Message",
  },
  {
    title: " Received Chat",
    method: "GET",
    description: "WhatsApp- Get Received Chat",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_get_Received_Message",
  },
  {
    title: " Sent Chat",
    method: "GET",
    description: "WhatsApp- Get Received Chat",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_get_Sent_Message",
  },
  {
    title: " Send Bulk Chats",
    method: "PSOT",
    description: "WhatsApp - Send Bulk Chats   ",
    url: "https://app.thewhatsappcity.com/api/send/whatsapp.bulk",
    sectionId: "api-whatsapp_get_bulk_Message",
  },
 
  {
    title: "  Delete Received Chat",
    method: "GEt",
    description: "whatsapp  - Send Single Message    ",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_delete_received__Chat",
  },
  {
    title: "  Delete Sent Chat",
    method: "GEt",
    description: "WhatsApp - Delete Sent Chat  ",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_delete_sent__Chat",
  },

  {
    title: "  Delete WhatsApp Account",
    method: "GEt  ",
    description: "WhatsApp - Delete Sent Chat  ",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_delete_sent__Chat",
  },
  {
    title: " Get Accounts",
    method: "GEt  ",
    description: "WhatsApp - Get Accounts ",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_get_account__Chat",
  },

  {
    title: "  Send Single Chat",
    method: "GET ",
    description: "WhatsApp - Send Single Chat ",
    url: "https://app.thewhatsappcity.com/api/delete/whatsapp.sentmessage",
    sectionId: "api-whatsapp_single_message",
  },
  // Add more menu items as needed
];

// All UseState declare

function Api() {
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
 
  const renderApiSection = (sectionId) => {
    switch (sectionId) {
      case "api-whatsapp-Delete_Received_Chat":
        return (
      <DeleteRecivedmsg/>
        );
      case "api-whatsapp-Delete_Sent_Message":
        return (
        <Deletesentmsg/>
        );

      // case for sent Message Pending
      case "api-whatsapp_Sent_Pending_Message":
        return (
          <Pendingwhatmsg/>
        );

      // case for get Recived Chat

      case "api-whatsapp_get_Sent_Message":
        return (
          <GetSentMessage/>
        );

      // Case for Get sent Chat

      case "api-whatsapp_get_Received_Message":
        return (
       <WhatsappRecivedmsg/>
        );

      // case for bulk message

      case "api-whatsapp_sent_single_Message":
        return (
          <Whatsappsinglemeg/>
        );

      // Case for Single message

      case "api-whatsapp_get_bulk_Message":
        return (
        <WhatsappBulkmess/>
        );

      // delete Recived Chats

      case "api-whatsapp_delete_received__Chat":
        return (
          <DeleteWhastappRecivedChat/>
        );

      // case for delete sent message

      case "api-whatsapp_delete_sent__Chat":
        return (
        <DeleteSentChat/>
        );

      // CAse for delete whatsapp account
      case "api-whatsapp_delete_sent__Chat":
        return (
        <DeleteWhatsappsent/>
        );

      // Case for get whatsapp account

      case "api-whatsapp_get_account__Chat":
        return (
         <GetWhatsappChat/>
        );

      // case for link whastapp account

      case "api-whatsapp_link_account__Chat":
        return (
       <LinkWhatsapp/>
        );
      // case for relink whatsapp account
      case "api-whatsapp_Relink_account":
        return (
         <RelinkWhatsapp/>
        );

      default:
        return <Typography>Select an API from the sidebar.</Typography>;
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", mb: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4">API Documentation</Typography>
      </Paper>

      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 100px)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Paper
          sx={{
            width: 240,
            flexShrink: 0,
            overflowY: "auto",
            height: "100%",
            boxShadow: 3,
          }}
        >
          <Typography
            sx={{
              color: "blue",
              margin: "1px",
              padding: "1px",
              fontSize: "1rem",
            }}
          >
            whatsapp
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setSelectedItem(item)}
                sx={{
                  "&:hover": { bgcolor: "#e3f2fd" },
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText primary={`${item.method} ${item.title}`} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          <Typography variant="h5" gutterBottom>
            {selectedItem.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedItem.description}
          </Typography>

          {/* Render the specific API section based on selected item's sectionId */}
          {renderApiSection(selectedItem.sectionId)}
        </Box>
      </Box>
    </>
  );
}

export default Api;
