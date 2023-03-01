import React, { useEffect, useState } from "react";
import bgPattern from "./assets/images/pattern-bg-mobile.png";
import bgPatternDesktop from "./assets/images/pattern-bg-desktop.png";
import arrowIcon from "./assets/images/icon-arrow.svg";
import Details from "./components/Details";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import locationIcon from "./assets/images/icon-location.svg";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";

const App = () => {
  // Declaring the states of the app
  const [ipAddress, setIpAddress] = useState("8.8.8.8");
  const [trackedDetails, setTrackedDetails] = useState({});
  const [latLong, setLatLong] = useState([0, 0]);

  // Method to track the IP Address
  const trackAddress = () => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_oTcodbQm0ghNP16FEZeTqwD6ltpif&ipAddress=${ipAddress}`
    )
      .then((response) => response.json())
      .then((json) => {
        setTrackedDetails({
          ip: json.ip,
          location: json.location.region + ", " + json.location.country,
          timezone: "UTC " + json.location.timezone,
          isp: json.isp,
        });
        setLatLong([json.location.lat, json.location.lng]);
        // map.setView([json.location.lat, json.location.lng]);
      });
  };

  // Setting the marker for the react-leaflet
  let defaultIcon = L.icon({
    iconUrl: locationIcon,
    shadowUrl: iconShadow,
    iconAnchor: [50, 150],
  });
  L.Marker.prototype.options.icon = defaultIcon;


  // Calls the trackAddress() when the page loads
  useEffect(() => {
    trackAddress();
  }, []);

  return (
    <div className="font-rubik h-screen flex flex-col">
      <img
        src={bgPattern}
        alt="Background Pattern"
        className="w-full -z-10 lg:hidden"
      />
      <img
        src={bgPatternDesktop}
        alt="Bakckground Pattern"
        className="hidden lg:block w-full -z-10"
      />
      <div className="absolute top-0 w-full z-20">
        <div className="">
          <h1 className="text-white text-center text-3xl py-8 font-medium">
            IP Address Tracker
          </h1>
          <div className="flex w-[85%] mx-auto max-w-xl">
            <input
              type="text"
              className="text-xl px-6 rounded-l-2xl w-full py-4 placeholder-dark-gray"
              value={ipAddress}
              placeholder="Search for any IP address or domain"
              onChange={(event) => setIpAddress(event.target.value)}
            />
            <button
              className="bg-black p-6 rounded-r-2xl"
              onClick={trackAddress}
            >
              <img src={arrowIcon} alt="Search/Go Icon" className="" />
            </button>
          </div>
        </div>
        <Details {...trackedDetails} />
      </div>
      <MapContainer
        center={latLong}
        zoom={25}
        zoomControl={true}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
      <ChangeView center={latLong} zoom={25} /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        <Marker position={latLong}></Marker>
      </MapContainer>
    </div>
  );
};
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
export default App;
