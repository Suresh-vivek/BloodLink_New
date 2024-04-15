import React from "react";
import "./SignUp.css";
import bloodDonor from "../assets/blood_donor.jpg";
import SubmitButton from "../components/miniComponents/SubmitButton";
import axios from "axios";
import { useState, useEffect } from "react";
const Signup = () => {
  const [donorName, setDonorName] = useState("");
  const [donorAge, setDonorAge] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [currentLocation, setCurrentLocation] = useState([]);
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Store the latitude and longitude in the currentLocation state
        setCurrentLocation([latitude, longitude]);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  //Add the following code to the return statement of the Signup component:

  const addSignup = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent
    const formData = {
      donorname: donorName,
      donorage: donorAge,
      donoraddress: donorAddress,
      donorPhone: donorPhone,
      bloodgroup: bloodGroup,
      detectlocation: {
        latitude: currentLocation[0],
        longitude: currentLocation[1],
      },
    };

    try {
      // Send the data to the server
      const response = await axios.post(
        "http://localhost:3001/signup",
        formData
      );

      // Handle the response as needed
      console.log("Server response:", response.data);

      // Clear form fields
      setDonorName("");
      setDonorAge("");
      setDonorAddress("");
      setDonorPhone("");
      setBloodGroup("");
      setCurrentLocation([]);

      // Show success alert
      alert("Thank You for Registration!");
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error sending data:", error.message);
    }
  };

  return (
    <>
      <div className="request">Register Yourself</div>

      <div className="form-outer">
        <form className="form" onSubmit={addSignup}>
          <div className="label">
            <label htmlFor="name">Name</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              autoComplete="off"
              name="donorname"
              className="form-fields"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="age">Age</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Age"
              autoComplete="off"
              name="donorage"
              className="form-fields"
              value={donorAge}
              onChange={(e) => setDonorAge(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="address">Address</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Address"
              autoComplete="off"
              name="donoraddress"
              className="form-fields"
              value={donorAddress}
              onChange={(e) => setDonorAddress(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="phone">Phone Number</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Phone Number"
              autoComplete="off"
              name="donorphone"
              className="form-fields"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={handleDetectLocation}
              className="ngo-form-button"
              type="button"
            >
              Detect Location
            </button>
            {currentLocation.length > 0 && (
              <div>
                <p className="ngo-form-location">
                  Latitude: {currentLocation[0]}
                </p>
                <p className="ngo-form-location">
                  Longitude: {currentLocation[1]}
                </p>
              </div>
            )}
          </div>

          <div className="option">
            <span className="age-groups">Blood Group</span>
            <select
              name="bloodgroup"
              className="form-field-option"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="" disabled selected>
                Choose Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
            </select>
          </div>

          <div>
            <SubmitButton text="Submit" type="submit" />
          </div>
        </form>

        <div className="image">
          <img src={bloodDonor} className="image-inner" />
        </div>
      </div>
    </>
  );
};

export default Signup;
