// Required imports and initializations
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const QRScan = require("../models/Whatsapp.model");
const Message = require("../models/Message.model");
const User = require("../models/User.model");
const path = require("path");
const os = require("os");
const { promises: fsPromises } = require("fs");
const axios = require("axios");
const ApiErrorHandler = require("../utils/ApiError");
const AsynicHandler = require("../utils/AsynicHandler");

let allSectionObject = {};
let phoneNumberToIdMap = {};

// Helper function to remove a directory
const removeDirectory = async (dirPath) => {
  try {
    if (
      await fsPromises
        .access(dirPath)
        .then(() => true)
        .catch(() => false)
    ) {
      const files = await fsPromises.readdir(dirPath);
      for (const file of files) {
        const curPath = path.join(dirPath, file);
        const stat = await fsPromises.stat(curPath);
        if (stat.isDirectory()) {
          await removeDirectory(curPath);
        } else {
          await fsPromises.unlink(curPath);
        }
      }
      await fsPromises.rmdir(dirPath);
    }
  } catch (error) {
    console.error("Error removing directory:", error);
  }
};

// Create a WhatsApp session
const createWhatsappSection = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (allSectionObject[id]) {
      }

      const client = new Client({
        puppeteer: {
          headless: true,
          executablePath:
            os.platform() === "win32"
              ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
              : os.platform() === "darwin"
              ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
              : "/usr/bin/google-chrome",
        },
        authStrategy: new LocalAuth({ clientId: id }),
      });

      let qrTimeout;

      client.on("qr", async (qr) => {
        const existingSession = await QRScan.findOne({ whatsappId: id });
        if (existingSession && existingSession.status === "Connected") {
          return resolve({ message: "Session is already connected" });
        }

        qrTimeout = setTimeout(async () => {
          await client.destroy();
          delete allSectionObject[id];
          resolve({ message: "QR code expired, session destroyed" });
        }, 15000);

        resolve({ message: "QR Code generated", qrCode: qr });
      });

      client.on("ready", async () => {
        clearTimeout(qrTimeout);

        const phoneNumber = client.info.wid._serialized.split("@")[0];
        await QRScan.findOneAndUpdate(
          { whatsappId: id },
          { status: "Connected", phoneNumber, qrCode: null },
          { new: true, upsert: true }
        );

        phoneNumberToIdMap[phoneNumber] = id;
        allSectionObject[id] = client;
        resolve({ message: "WhatsApp connected successfully", phoneNumber });
      });

      client.on("disconnected", async (reason) => {
        await QRScan.findOneAndUpdate(
          { whatsappId: id },
          { status: "Disconnected" },
          { new: true }
        );
        resolve({ message: "Client disconnected", reason });
      });
      client.on('message', async (msg) => {
        if (msg.body === '!send-media') {
          const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
          await client.sendMessage(msg.from, media);
        }
      });

      client.initialize();

      // Media send example with command
     
    } catch (error) {
      reject(error);
    }
  });
};

// Send Message Handler
const SendMessage = async (req, res, next) => {
  const { phoneNumber, number, message, fileType, fileUrl, secretKey } = req.body;
const data={phoneNumber, number, message, fileType, fileUrl, secretKey}
console.log(data);
  // Input validation
  if (
    !phoneNumber ||
    !number ||
    (!message && !fileUrl) ||
    !phoneNumberToIdMap[phoneNumber] ||
    !secretKey
  ) {
    return res.status(400).json({ status: "Failed", error: "Invalid input data" });
  }

  // Validate the user with the provided secretKey
  const user = await User.findOne({ secretKey });
  if (!user) {
    return next(new ApiErrorHandler(404, "User not found"));
  }

  const isSecretKeyValid = user.validateSecretKey(secretKey);
  if (!isSecretKeyValid) {
    return next(new ApiErrorHandler(401, "Invalid secret key"));
  }

  const formattedNumber = `${number.replace("+", "")}@c.us`;
  const id = phoneNumberToIdMap[phoneNumber];
  const client = allSectionObject[id];

  // Check if client exists
  if (!client) {
    return res.status(404).json({ status: "Failed", error: "Client not found for phone number" });
  }

  try {
    const senderNumber = client.info.wid.user || id;

    // Create a message record in the database
    const newMessage = await Message.create({
      senderId: id,
      senderNumber,
      recipientNumber: number,
      messageContent: message || "Media message",
      status: "waiting",

    });

    // If text message is provided, send it
    if (message) {
      await client.sendMessage(formattedNumber, message);
      await Message.findByIdAndUpdate(newMessage._id, { status: "sent" });
      return res.status(200).json({
        status: "Message sent",
        senderNumber: phoneNumber,
        recipientNumber: number,
      });
    }

    



    // Handle media file sending
    if (fileUrl && fileType) {
      // Fetch the media file from the provided URL
      const mediaResponse = await axios.get(fileUrl, {
        responseType: "arraybuffer", // Fetch the file as binary data
      });

      // Check if media was successfully fetched
      if (mediaResponse.status !== 200) {
        throw new Error("Failed to fetch media file");
      }

      // Convert the media response to base64
      const mediaBuffer = Buffer.from(mediaResponse.data, "binary").toString("base64");

      // Create a new MessageMedia object
      const media = new MessageMedia(fileType, mediaBuffer, path.basename(fileUrl));

      // Send the media message
      await client.sendMessage(formattedNumber, media);

      // Update the message status to sent
      await Message.findByIdAndUpdate(newMessage._id, { status: "sent" });
      return res.status(200).json({
        status: "File sent",
        senderNumber: phoneNumber,
        recipientNumber: number,
      });
    }

    throw new Error("Invalid input data");
  } catch (error) {
    // Update the message status to failed in case of an error
    await Message.findByIdAndUpdate(newMessage._id, { status: "failed" });
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Function for relink WhatsApp Account
const generateCodeforRelink = AsynicHandler(async (req, res, next) => {
  const { whatsappId } = req.body;

  if (!whatsappId) {
    return res.status(400).json({ error: "WhatsApp ID is required" });
  }

  if (allSectionObject[whatsappId]) {
    return res
      .status(200)
      .json({ message: "Session already exists for this WhatsApp ID" });
  }

  const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth({ clientId: whatsappId }),
  });

  let qrTimeout;
  let isResponseSent = false;

  client.on("qr", async (qr) => {
    const existingSession = await QRScan.findOne({ whatsappId });
    if (existingSession && existingSession.status === "Connected") {
      if (!isResponseSent) {
        isResponseSent = true;
        return res
          .status(200)
          .json({ message: "Session is already connected" });
      }
    }

    if (!isResponseSent) {
      isResponseSent = true;
      res.status(200).json({ message: "QR Code generated", qrCode: qr });
    }

    qrTimeout = setTimeout(async () => {
      await client.destroy();
      delete allSectionObject[whatsappId];
      await QRScan.findOneAndDelete({ whatsappId });
      if (!isResponseSent) {
        isResponseSent = true;
        return res
          .status(200)
          .json({ message: "QR code expired, session destroyed" });
      }
    }, 15000);
  });

  client.on("ready", async () => {
    if (qrTimeout) {
      clearTimeout(qrTimeout);
    }

    try {
      const phoneNumber = client.info.wid._serialized.split("@")[0];

      await QRScan.findOneAndUpdate(
        { whatsappId },
        { status: "Connected", phoneNumber },
        { new: true }
      );

      allSectionObject[whatsappId] = client;

      if (!isResponseSent) {
        isResponseSent = true;
        return res
          .status(200)
          .json({ message: "WhatsApp connected successfully", phoneNumber });
      }
    } catch (error) {
      console.error("Error updating QR Scan:", error);
    }
  });

  client.on("disconnected", async (reason) => {
    delete allSectionObject[whatsappId];
    await QRScan.findOneAndUpdate(
      { whatsappId },
      { status: "Disconnected" },
      { new: true }
    );

    if (!isResponseSent) {
      isResponseSent = true;
      return res.status(200).json({ message: "WhatsApp disconnected" });
    }
  });

  client.initialize();
});

// Export all functions
module.exports = {
  createWhatsappSection,
  SendMessage,
  generateCodeforRelink,
};
