import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import placeHolderIcon from "../assets/placeholder.png";
import placeholder2 from "../assets/placeholder2.png";
import "./Map.css";
import axios from "axios";

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [donorLocations, setDonorLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donor locations from MongoDB
        const response = await axios.get(
          "http://localhost:3001/api/donorLocations"
        );
        console.log("Fetched donor locations:", response.data); // Log the response data
        console.log("HI");
        setDonorLocations(response.data);
      } catch (error) {
        console.error("Error fetching donor locations:", error);
      }
    };

    fetchData();

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            console.log("User location:", latitude, longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const customIcon = new Icon({
    iconUrl: placeHolderIcon,
    iconSize: [38, 38], // size of the icon
  });

  const userIcon = new Icon({
    iconUrl: placeholder2,
    iconSize: [38, 38],
  });

  const markers = [
    {
      geocode: [28.4087, 77.3178],
      popUp: "Hello, I am pop up 1",
      icon: customIcon,
    },
    {
      geocode: [28.48, 77.3173],
      popUp: "Hello, I am pop up 2",
      icon: customIcon,
    },
    {
      geocode: [28.4089, 77.35],
      popUp: "Hello, I am pop up 3",
      icon: customIcon,
    },
  ];

  console.log("userLocation:", userLocation);

  return (
    <>
      {userLocation !== null && (
        <MapContainer center={[userLocation[0], userLocation[1]]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {donorLocations.map((donor, index) => (
            <Marker
              key={index}
              position={[
                parseFloat(donor.latitude),
                parseFloat(donor.longitude),
              ]}
              icon={customIcon}
            ></Marker>
          ))}
          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
