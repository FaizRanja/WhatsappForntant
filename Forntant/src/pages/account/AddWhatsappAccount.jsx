import React, { useEffect } from 'react'
import swal from "sweetalert";

const AddWhatsappAccount = () => {
    useEffect(() => {
        swal({
          title: "Add ACCOUNT",
          text: "Connect your WhatsApp by clicking the button to display the QRCode then scan it via Link a device button in the app. You only have 15 seconds to scan the QRCode.",
          icon: "info",
          buttons: {
            cancel: "Cancel",
            confirm: {
              text: "Add Account",
              value: "add",
            },
          },
          dangerMode: true,
          className: "my-swal",
        }).then((value) => {
          switch (value) {
            case "add":
              handleAddAccount();
              break;
            default:
              swal("Cancelled", "Your imaginary file was not added", "error");
          }
        });
      }, []); // The empty dependency array means this will run once when the component mounts
    
  return (
    swal(
        <div>
        
        </div>
      )
  )
}

export default AddWhatsappAccount
