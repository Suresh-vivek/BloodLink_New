const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const twilio = require("twilio");
const shortid = require("shortid");
const path = require("path");

const SignupModel = require("./models/SignupModel");
const RequestModel = require("./models/requestModel");

const app = express();

let patientPhone22 = " ";

app.use(express.json({ limit: "50mb" }));
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use async/await for database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://svivekkumar012:22i22e11@cluster0.qb3xcka.mongodb.net/BloodLink?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToDatabase();

//  Route handler to fetch donor locations

app.get("/api/donorLocations", async (req, res) => {
  try {
    // Fetch all donor locations from the database, only including the detectlocation field
    const donorLocations = await SignupModel.find({}, "detectlocation");

    // Extracting only the detectlocation field from the results
    const locations = donorLocations.map((donor) => donor.detectlocation);
    console.log(locations);

    // Send the donor locations as a response
    res.json(locations);
  } catch (error) {
    console.error("Error fetching donor locations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    // Create a new instance of the SignupModel using the data from the request body
    const newSignup = new SignupModel({
      donorname: req.body.donorname,
      donorage: req.body.donorage,
      donoraddress: req.body.donoraddress,
      donorPhone: req.body.donorPhone,
      bloodgroup: req.body.bloodgroup,
      detectlocation: {
        latitude: req.body.detectlocation.latitude,
        longitude: req.body.detectlocation.longitude,
      },
    });

    // Save the newSignup to the database
    const savedSignup = await newSignup.save();

    // Send a response to the client
    res.json({ message: "Registered successfully", data: savedSignup });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Function to generate a unique request ID
function generateRequestId() {
  return shortid.generate(); // Generate a unique ID using shortid library
}

// Function to create a link with the unique request ID
function createRequestLink(requestId) {
  // Assuming your website URL is http://yourwebsite.com
  return `https://web.bloodlink.site/accept-request/${requestId}`;
}
// Function to calculate the distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to create an accept link with the unique request ID
function createAcceptLink(requestId) {
  return `https://web.bloodlink.site/accept-request/${requestId}/accept`;
}

// Function to create a decline link with the unique request ID
function createDeclineLink(requestId) {
  return `https://web.bloodlink.site/accept-request/${requestId}/decline`;
}

// Function to filter donors within a certain radius
function filterDonorsByDistance(patientLat, patientLon, donors, radius) {
  return donors.filter((donor) => {
    const distance = calculateDistance(
      patientLat,
      patientLon,
      donor.detectlocation.latitude,
      donor.detectlocation.longitude
    );
    return distance <= radius;
  });
}

async function notifyBloodSeeker1(
  patientPhone,

  donorName,
  donorPhone
) {
  try {
    const twilioClient = twilio(
      "ACbbfb67ce04dfc6a007e11b4ab3d65ed4",
      "259d5cc742cba1c67a81bd42b640687c"
    );

    // If the request status is 'accepted', send the notification message
    const message = `Dear blood seeker, \n\nThe donor has accepted your request. Here are the details:\n\nName: ${donorName}\nPhone: ${donorPhone}\n\nThank you for using BloodLink.`;

    // Send SMS to the blood seeker
    await twilioClient.messages.create({
      body: message,
      to: `+91${patientPhone}`, // Make sure to format the phone number correctly
      from: "+14696198911",
    });

    console.log(`Sent notification to blood seeker ${patientPhone}`);
  } catch (error) {
    console.error("Error sending notification to blood seeker:", error);
    throw error; // Propagate the error for handling at a higher level
  }
}
//request data
app.post("/send-request", async (req, res) => {
  console.log("Received a request:", req.body);
  try {
    // Generate a unique request ID
    const requestId = generateRequestId();
    patientPhone22 = req.body.patientPhone;
    console.log("Patient Phone HI ", patientPhone22);

    // Create a link with the unique request ID
    const requestLink = createRequestLink(requestId);

    // Create accept and decline links with the unique request ID
    const acceptLink = createAcceptLink(requestId);
    const declineLink = createDeclineLink(requestId);

    // Fetch all donors from the signups collection
    const allDonors = await SignupModel.find({}, "donorPhone detectlocation");
    console.log("All donors:", allDonors);

    // Set the initial radius
    let radius = 5;

    // Flag to check if any donors are found within the radius
    let donorsFound = false;

    // Keep increasing the radius until donors are found or the maximum radius is reached
    while (!donorsFound && radius <= 30) {
      // Filter donors within the current radius
      const nearbyDonors = filterDonorsByDistance(
        req.body.currentLocation.latitude,
        req.body.currentLocation.longitude,
        allDonors,
        radius
      );

      let acceptedBloodGroup = "";
      switch (req.body.bloodGroup) {
        case "O+":
          acceptedBloodGroup = "O+ , O-";
          break;
        case "A+":
          acceptedBloodGroup = "A+, A-, O+, O-";
          break;
        case "A-":
          acceptedBloodGroup = "A-, O-";
          break;
        case "B+":
          acceptedBloodGroup = "B+, B-, O+, O-";
          break;
        case "B-":
          acceptedBloodGroup = "B-, O-";
          break;
        case "AB+":
          acceptedBloodGroup = "All Blood Groups";
          break;

        case "AB-":
          acceptedBloodGroup = "AB- A- B- O-";
          break;

        default:
          // For other blood groups, accept any blood group
          acceptedBloodGroup = "";
          break;
      }

      // If there are donors within the radius, send requests
      if (nearbyDonors.length >= 0) {
        donorsFound = true;

        // Use Twilio to send an SMS to each phone number
        const twilioClient = twilio(
          "ACbbfb67ce04dfc6a007e11b4ab3d65ed4",
          "259d5cc742cba1c67a81bd42b640687c"
        );

        const requestMessage = `\nPatient Name: ${req.body.patientName} \n  Age: ${req.body.patientAge} \nAccepted Blood Group: ${acceptedBloodGroup} \n Phone: ${req.body.patientPhone} \n Address : ${req.body.patientAddress} \n.  Click here to accept the request: ${acceptLink} \n. Click here to decline the request: ${declineLink}`;
        console.log(requestMessage);
        console.log("nearby donors ", nearbyDonors);

        // Send SMS to each phone number of nearby donors
        for (const donor of nearbyDonors) {
          await twilioClient.messages.create({
            body: requestMessage,
            to: `+91${donor.donorPhone}`, // Make sure to format the phone number correctly
            from: "+14696198911",
          });
          console.log(`Sent SMS to ${donor.donorPhone}`);
        }

        res.json({ message: "Request sent successfully" });
        // Notify the blood seeker
      } else {
        // Double the radius for the next iteration
        radius *= 2;
      }
    }

    // If no donors are found within 30 km, respond accordingly
    if (!donorsFound) {
      res.json({ message: "No donors found within 30 km" });
    }
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to handle accept request
app.get("/accept-request/:requestId/accept", async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Extract form data from the request body
    const { name, phone } = req.body;
    // Use the globally stored patient phone
    console.log(patientPhone22);
    const patientPhone12 = patientPhone22;

    // Check if the request with the given requestId exists
    const existingRequest = await RequestModel.findOne({
      requestId: requestId,
    });

    if (!existingRequest) {
      // If the request does not exist, create a new one
      const newRequest = new RequestModel({
        requestId: requestId,
        status: "accepted",
      });
      await newRequest.save();
      console.log("New request created with status 'accepted'");
    } else if (existingRequest.status === "accepted") {
      // If the request already has status 'accepted', return an error response
      return res.status(400).json({ message: "Request already accepted" });
    } else {
      // If the request exists but status is not 'accepted', update the status to 'accepted'
      await RequestModel.findOneAndUpdate(
        { requestId: requestId },
        { $set: { status: "accepted" } }
      );
      console.log("Request status updated to 'accepted'");
    }

    // Notify the blood seeker
    // await notifyBloodSeeker(patientPhone1, requestId, name, phone);

    // Serve accept.html
    res.sendFile(path.join(__dirname, "accept.html"));
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/accept-request/:requestId/accept/submit", (req, res) => {
  try {
    const { name, phone } = req.body;
    const patientPhone1 = patientPhone22;
    console.log(name, phone);
    notifyBloodSeeker1(patientPhone1, name, phone);
    res.sendFile(path.join(__dirname, "thankyou.html"));
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Endpoint to handle decline request
app.get("/accept-request/:requestId/decline", async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Find the request with the given requestId
    const existingRequest = await RequestModel.findOne({
      requestId: requestId,
    });

    if (!existingRequest) {
      // If the request does not exist, create a new one with status 'declined'
      const newRequest = new RequestModel({
        requestId: requestId,
        status: "declined",
      });
      await newRequest.save();
      console.log("New request created with status 'declined'");
    } else if (existingRequest.status === "accepted") {
      // If the request status is already 'accepted', return an error response
      return res
        .status(400)
        .json({ message: "Request already accepted by another donor" });
    } else if (existingRequest.status === "declined") {
      // If the request status is already 'declined', do nothing
      console.log("Request status is already 'declined'");
    } else {
      // If the request exists but status is not 'declined', update the status to 'declined'
      await RequestModel.findOneAndUpdate(
        { requestId: requestId },
        { $set: { status: "declined" } }
      );
      console.log("Request status updated to 'declined'");
    }

    // Serve decline.html
    res.sendFile(path.join(__dirname, "decline.html"));
  } catch (error) {
    console.error("Error declining request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
