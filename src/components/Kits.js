import React, { useState, useEffect } from "react"; // eslint-disable-line
import axios from "axios";
import KitModal from "./KitModal";

function Kits({ addMarkersToMap }) {
  const [survivalKits, setSurvivalKits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nearbyKits, setNearbyKits] = useState([]);
  const [selectedKit, setSelectedKit] = useState(null);
  const apiBaseUrl = "https://mysite-kmyj.onrender.com";

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const closeBanner = () => {
    const banner = document.querySelector(".notification-banner");
    banner.style.display = "none";
  };

  // const fetchAllSurvivalKits = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${apiBaseUrl}/survival_kits`);

  //     console.log("Full API Response:", response.data);

  //     if (Array.isArray(response.data)) {
  //       setSurvivalKits(response.data);
  //     } else {
  //       console.error("Invalid response format. Expected an array.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching all survival kits:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAllSurvivalKits = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiBaseUrl}/survival_kits`);

      console.log("Full API Response:", response.data);

      if (Array.isArray(response.data)) {
        // Assuming the data structure is an array, extract the survival kits
        const survivalKits = response.data.map((kit) => ({
          id: kit.id,
          name: kit.name,
          location: kit.location,
          address: kit.address,
          latitude: kit.latitude,
          longitude: kit.longitude,
          content: kit.contents,
          contact: kit.contact,
        }));

        setSurvivalKits(survivalKits);
      } else {
        console.error("Invalid response format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching all survival kits:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal
  const handleKitClick = (kit) => {
    setSelectedKit(kit);
  };

  // In Kits.js
  const findNearbySurvivalKits = async () => {
    try {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        const nearbyKits = survivalKits.filter((kit) => {
          const kitDistance = calculateDistance(
            userLatitude,
            userLongitude,
            kit.latitude,
            kit.longitude
          );
          return kitDistance <= 350;
        });

        console.log("Nearby Survival Kits:", nearbyKits);
        addMarkersToMap(nearbyKits); // Pass the array of kits directly
        setNearbyKits(nearbyKits);
      });
    } catch (error) {
      console.error("Error finding nearby survival kits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSurvivalKits();
  }, []);

  return (
    <div className="kit-container">
      {/* <div className="notification-banner">
        <div className="banner-name">
          <h3>Important</h3>
          <p>
            Please call 999 first. Click the button below to find the nearest
            stab survival kit. Then follow the instructions inside the kit.
          </p>
        </div>
      </div> */}
      <div className="notification-banner">
        <span className="notification-banner-close" onClick={closeBanner}>
          ×
        </span>
        <p>
          <strong>Important</strong> <br></br>Please call 999 if this is an
          emergency, survival kits may not always be available even if the app
          shows they are.<br></br>
          <a href="www.google.com">Learn more</a>
        </p>
      </div>
      <span
        className="material-symbols-outlined nearby-button"
        onClick={findNearbySurvivalKits}
        disabled={
          loading
            ? "Finding Nearby Survival Kits..."
            : "Find Nearby Survival Kits"
        }
      >
        medical_services
      </span>

      {/* <button onClick={findNearbySurvivalKits} disabled={loading}>
        {loading
          ? "Finding Nearby Survival Kits..."
          : "Find Nearby Survival Kits"}
      </button> */}

      {/* <div className="kits-all">
        <h2>All Survival Kits:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : survivalKits.length > 0 ? (
          <ul>
            {survivalKits.map((kit) => (
              <li key={kit.id}>
                {kit.name} - Location: {kit.location} - Address: {kit.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No survival kits found.</p>
        )}
      </div> */}

      <div className="kits-nearby">
        <h2>Kits Near You:</h2>
        {loading ? (
          <p>Searching for nearby survival kits...</p>
        ) : nearbyKits.length > 0 ? (
          <ul>
            {selectedKit && (
              <KitModal
                kit={selectedKit}
                onClose={() => setSelectedKit(null)}
              />
            )}
            {nearbyKits.map((kit) => (
              <li key={kit.id} onClick={() => handleKitClick(kit)}>
                {kit.name} - Location: {kit.location} - {kit.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby survival kits found.</p>
        )}
      </div>
    </div>
  );
}

export default Kits;
