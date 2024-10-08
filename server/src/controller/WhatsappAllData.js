const Message = require('../models/Message.model');
const Recived = require('../models/Recived.message');
const QRScan = require('../models/Whatsapp.model');
const AsynicHandler = require('../utils/AsynicHandler');
const apifeatucher = require('../utils/Search'); // Import your ApiFeature utility
const { createWhatsappSection } = require('./WhatsappController');
const User = require('../models/User.model');

const { phoneNumberToIdMap, allSectionObject } = require('./WhatsappController'); // Ensure correct import path
const ApiErrorHandler = require('../utils/ApiResponseHandler');
const { default: mongoose } = require('mongoose');


// Get all user accounts when the QR code is scanned
exports.getAllData = AsynicHandler(async (req, res) => {
  
  const token = req.headers['authorization']?.split(' ')[1];
  const secretKey = req.headers['x-secret-key']; // Correctly get secret key from the header
  try {
    if (!token || !secretKey) {
      return next(new ApiErrorHandler(401, 'Authorization credentials missing'));
    }
    // Validate token and secret key
    const user = await User.findOne({ secretKey });
    if (!user) {
      return next(new ApiErrorHandler(404, 'User not found'));
    }

    const isSecretKeyValid = await user.validateSecretKey(secretKey);
    if (!isSecretKeyValid) {
      return next(new ApiErrorHandler(401, 'Invalid secret key'));
    }

    // Build the query object based on the provided filters
    const { keyword, date } = req.query;
    const query = {};
    if (keyword) {
      query.$or = [
        { senderNumber: { $regex: keyword, $options: 'i' } },
        { recipientNumber: { $regex: keyword, $options: 'i' } },
        { messageContent: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        query.timestamp = { $gte: parsedDate };
      } else {
        return next(new ApiErrorHandler(400, 'Invalid date format'));
      }
    }

    const scans = await QRScan.find(query).sort({ timestamp: -1 });
    res.json({ success: true, scans });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return next(new ApiErrorHandler(500, 'Internal server error'));
  }


  });
// Refresh All Data
  exports.Refreshdata=AsynicHandler(async(req,res,next)=>{
    try {
      // Fetch fresh data
      const freshData = await QRScan();
      // Update the cache or database with the fresh data
      dataCache = freshData;
  
      // Send a success response
      res.status(200).json({ message: 'Data refreshed successfully', data: dataCache });
    } catch (error) {
      console.error('Error refreshing data:', error);
      res.status(500).json({ message: 'Failed to refresh data', error: error.message });
    }
  })
  
// Get alll Messages
  exports.getmessage = AsynicHandler(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const secretKey = req.headers['x-secret-key']; // Correctly get secret key from the header
  
    try {
      if (!token || !secretKey) {
        return next(new ApiErrorHandler(401, 'Authorization credentials missing'));
      }
      // Validate token and secret key
      const user = await User.findOne({ secretKey });
      if (!user) {
        return next(new ApiErrorHandler(404, 'User not found'));
      }
  
      const isSecretKeyValid = await user.validateSecretKey(secretKey);
      if (!isSecretKeyValid) {
        return next(new ApiErrorHandler(401, 'Invalid secret key'));
      }
  
      // Build the query object based on the provided filters
      const { keyword, date } = req.query;
      const query = {};
      if (keyword) {
        query.$or = [
          { senderNumber: { $regex: keyword, $options: 'i' } },
          { recipientNumber: { $regex: keyword, $options: 'i' } },
          { messageContent: { $regex: keyword, $options: 'i' } }
        ];
      }
  
      if (date) {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
          query.timestamp = { $gte: parsedDate };
        } else {
          return next(new ApiErrorHandler(400, 'Invalid date format'));
        }
      }
  
      const scans = await Message.find(query).sort({ timestamp: -1 });
      res.json({ success: true, scans });
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return next(new ApiErrorHandler(500, 'Internal server error'));
    }
  });

  // Get all Recived MEsssage
  exports.getRecivedmessage =AsynicHandler(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const secretKey = req.headers['x-secret-key'];
  
    try {
      // Ensure both token and secretKey are provided
      if (!token || !secretKey) {
        return next(new ApiErrorHandler(401, 'Authorization credentials missing'));
      }
  
      // Validate the secret key by finding the user
      const user = await User.findOne({ secretKey });
      if (!user) {
        return next(new ApiErrorHandler(404, 'User not found'));
      }
  
      // Validate the secret key (assuming this method exists on User model)
      const isSecretKeyValid = await user.validateSecretKey(secretKey);
      if (!isSecretKeyValid) {
        return next(new ApiErrorHandler(401, 'Invalid secret key'));
      }
  
      // Define result per page and count the total documents
      const resultPerPage = 10;
      const currentPage = Number(req.query.page) || 1;
      const productsCount = await Recived.countDocuments();
  
      // Create an instance of the API feature helper for searching, filtering, and pagination
      const apifeatuc = new apifeatucher(Recived.find(), req.query)
        .Search()
        .pagination(resultPerPage);
  
      // Optional date filter
      const { date } = req.query;
      if (date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          return next(new ApiErrorHandler(400, 'Invalid date format'));
        }
        apifeatuc.query = apifeatuc.query.where('timestamp').gte(parsedDate);
      }
      // Execute the query
      const scans = await apifeatuc.query.sort({ timestamp: -1 });
  
      // Send response
      res.status(200).json({
        success: true,
        scans,
        productsCount,
        resultPerPage,
        currentPage
      });
  
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return next(new ApiErrorHandler(500, 'Internal server error'));
    }
  });
  
  

// Get Total User I mean All User are store in database
exports.getLoginUser=AsynicHandler(async(req,res,next)=>{
    try {
      const usercount=await User.countDocuments()
      res.status(200).json({
        success:true,
        count:usercount,
      })
    } catch (error) {
      console.log('Error feaching user '+error)
      res.status(500).json({
        success:false,
        error: "Server Error",
      })
    }
    })
    exports.getLoginUser=AsynicHandler(async(req,res,next)=>{
      try {
        const usercount=await User.countDocuments()
        res.status(200).json({
          success:true,
          count:usercount,
        })
      } catch (error) {
        console.log('Error feaching user '+error)
        res.status(500).json({
          success:false,
          error: "Server Error",
        })
      }
      })
      exports.getLoginUser=AsynicHandler(async(req,res,next)=>{
        try {
          const usercount=await User.countDocuments()
          res.status(200).json({
            success:true,
            count:usercount,
          })
        } catch (error) {
          console.log('Error feaching user '+error)
          res.status(500).json({
            success:false,
            error: "Server Error",
          })
        }
        })
// Get all  send  Message in Your Database i mean all Total message are store 
    exports.sentmessage=AsynicHandler(async(req,res,next)=>{
        try {
          const usercount=await Message.countDocuments()
          res.status(200).json({
            success:true,
            count:usercount,
          })
        } catch (error) {
          console.log('Error feaching user '+error)
          res.status(500).json({
            success:false,
            error: "Server Error",
          })
        }
        })
// Get all  Recived  Message in Your Database i mean all Total message are store 
        exports.recivedmessage=AsynicHandler(async(req,res,next)=>{
            try {
              const usercount=await Recived.countDocuments()
              res.status(200).json({
                success:true,
                count:usercount,
              })
            } catch (error) {
              console.log('Error feaching user '+error)
              res.status(500).json({
                success:false,
                error: "Server Error",
              })
            }
            })
// // Get all Qr Scan  Message in Your Database i mean all Total message are store 
            exports.getQrScan=AsynicHandler(async(req,res,next)=>{
                try {
                  const usercount=await QRScan.countDocuments()
                  res.status(200).json({
                    success:true,
                    count:usercount,
                  })
                } catch (error) {
                  console.log('Error feaching user '+error)
                  res.status(500).json({
                    success:false,
                    error: "Server Error",
                  })
                }
                })
// Create Section for Qernate Qr code 
exports.CreateSection = async (req, res, next) => { // Added next here
  const { id, secretKey } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  if (!secretKey) {
    return res.status(400).json({ error: 'Secret key is required' });
  }

  try {
    // Check if the secret key is valid and belongs to the user
    const user = await User.findOne({ secretKey });

    if (!user) {
      return next(new ApiErrorHandler(400, "User not found")); // Pass error to next
    }

    
    const isSecretKeyValid = user.validateSecretKey(secretKey);
    if (!isSecretKeyValid) {
      return next(new ApiErrorHandler(401, "Your secret key does not match")); // Pass error to next
    }

    // Create the WhatsApp section and get the QR code
    const response = await createWhatsappSection(id);

    // Send the QR code to the frontend
    res.status(200).json({ message: response.message, qrCode: response.qrCode });
  } catch (error) {
    console.error('Error creating WhatsApp section:', error);
    next(new ApiErrorHandler(500, 'Failed to create WhatsApp section')); // Pass error to next
  }
};



// API to log out a session
exports.sectionLogout=AsynicHandler(async (req,res,next)=>{
  const { whatsappId } = req.body;

  if (!whatsappId) {
    return res.status(400).json({ error: 'WhatsApp ID is required' });
  }

  const client = allSectionObject[whatsappId];
  if (!client) {
    return res.status(400).json({ error: 'WhatsApp client not found for the provided ID' });
  }

  try {
    await client.logout();
    const sessionDir = path.join(__dirname, '.wwebjs_auth', `session-${whatsappId}`);
    await removeDirectory(sessionDir);
    delete allSectionObject[whatsappId];
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out client:', error);
    res.status(500).json({ error: 'Failed to log out client' });
  }
})
// Function for qr scan Data Gelete 
exports.DeleteQrScan = AsynicHandler(async (req, res, next) => {
  const { id } = req.params; // Removed secretKey from params
  const { secretKey } = req.query; // Get secretKey from query parameters
  try {
    const user = await User.findOne({ secretKey });
    if (!user) {
      return next(new ApiErrorHandler(400, "User not found"));
    }
    const isSecretKeyValid = user.validateSecretKey(secretKey);
    if (!isSecretKeyValid) {
      return next(new ApiErrorHandler(401, "Your secret key does not match"));
    }
    const result = await QRScan.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'QR scan not found' });
    }
    res.status(200).json({ message: 'QR scan deleted successfully' });
  } catch (error) {
    console.error('Error deleting QR scan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function For Delete send message
exports.DeleteSentMessage=AsynicHandler(async(req,res,next)=>{
  const { id } = req.params; // Removed secretKey from params
  const { secretKey } = req.query; // Get secretKey from query parameters
  try {
    const user = await User.findOne({ secretKey });
    if (!user) {
      return next(new ApiErrorHandler(400, "User not found"));
    }
    const isSecretKeyValid = user.validateSecretKey(secretKey);
    if (!isSecretKeyValid) {
      return next(new ApiErrorHandler(401, "Your secret key does not match"));
    }
    const result = await Message.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'QR scan not found' });
    }
    res.status(200).json({ message: 'Sent Message deleted successfully' });
  } catch (error) {
    console.error('Error Deleomg Sent Message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Function For Delete Recived message
exports.DeleteRecivedMessage = AsynicHandler(async (req, res, next) => {
  const { id } = req.params;
  const { secretKey } = req.query;

  try {
    // Validate the existence of secretKey and id
    if (!secretKey || !id) {
      return res.status(400).json({ message: 'Secret key and message ID are required.' });
    }

    // Find the user based on secretKey
    const user = await User.findOne({ secretKey });
    if (!user) {
      return next(new ApiErrorHandler(400, 'User not found'));
    }

    // Validate the secretKey
    const isSecretKeyValid = user.validateSecretKey(secretKey);
    if (!isSecretKeyValid) {
      return next(new ApiErrorHandler(401, 'Your secret key does not match'));
    }

    // Validate the format of ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid message ID format' });
    }

    // Find and delete the message
    const deletedMessage = await Recived.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});













