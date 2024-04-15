import "./Request.css";

import React, { useEffect, useState } from "react";
import SubmitButton from "../components/miniComponents/SubmitButton";
import axios from "axios";
import bloodrequest from "../assets/blood_request.png";

const Request = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [patientAddress, setPatientAddress] = useState("");

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

  //sending form data to server
  const sendRequest = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent
    const formData = {
      patientName,
      patientAge,
      patientPhone,
      currentLocation: {
        latitude: currentLocation[0],
        longitude: currentLocation[1],
      },
      bloodGroup: bloodGroup,
      patientAddress: patientAddress,
    };

    try {
      // Send the data to the server
      const response = await axios.post(
        "http://localhost:3001/send-request",
        formData
      );

      // Handle the response as needed
      console.log("Server response:", response.data);

      // Show success alert
      alert("Request sent successfully!");
      setPatientName("");
      setPatientAge("");
      setPatientPhone("");
      setCurrentLocation([]);
      setBloodGroup("");
      setPatientAddress("");
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error sending request:", error.message);
    }
  };
  return (
    <>
      <div className="request">Raise a Request</div>

      <div className="form-outer">
        <form className="form" onSubmit={sendRequest}>
          <div className="label">
            <label htmlFor="ngoid">Patient Name</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Patient's Name"
              autoComplete="off"
              name="patient"
              className="form-fields"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="ngoid">Patient Age</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Patient's Age"
              autoComplete="off"
              name="age"
              className="form-fields"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="ngoid">Phone Number</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Phone Number"
              autoComplete="off"
              name="phone"
              className="form-fields"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="ngoid">Current Location</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Current Location"
              autoComplete="off"
              name="loaction"
              className="form-fields"
              onChange={(e) => setPatientAddress(e.target.value)}
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
              <option value="O">O+</option>
            </select>
          </div>

          <div>
            <SubmitButton text="Submit" type="submit" />
          </div>
        </form>

        <div className="image">
          <img src={bloodrequest} className="image-inner" />
        </div>
      </div>
    </>
  );
};

export default Request;
