// // with location button

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [survivalKits, setSurvivalKits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const apiBaseUrl = "http://localhost:3000";

//   const fetchNearbySurvivalKits = async (latitude, longitude) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${apiBaseUrl}/survival_kits/nearby?latitude=${latitude}&longitude=${longitude}`
//       );

//       console.log("Full API Response:", response); // Log the entire response

//       if (Array.isArray(response.data)) {
//         // Check if the response data is an array
//         console.log("Survival Kits Data:", response.data);
//         setSurvivalKits(response.data);
//       } else {
//         console.error("Invalid response format. Expected an array.");
//       }
//     } catch (error) {
//       console.error("Error fetching nearby survival kits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFetchNearbyClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLatitude = position.coords.latitude;
//           const userLongitude = position.coords.longitude;
//           fetchNearbySurvivalKits(userLatitude, userLongitude);
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by your browser");
//     }
//   };

//   return (
//     <div>
//       <h1>Survival Kit App</h1>
//       <button onClick={handleFetchNearbyClick}>
//         Fetch Nearby Survival Kits
//       </button>

//       <div>
//         <h2>Nearby Survival Kits:</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : survivalKits.length > 0 ? (
//           <ul>
//             {survivalKits.map((kit) => (
//               <li key={kit.id}>
//                 {kit.name} - Location: {kit.location} - Address: {kit.address}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No nearby survival kits found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [survivalKits, setSurvivalKits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiBaseUrl = "http://localhost:3000";

//   useEffect(() => {
//     const fetchAllSurvivalKits = async () => {
//       try {
//         const response = await axios.get(`${apiBaseUrl}/survival_kits`, {
//           headers: {
//             "ngrok-skip-browser-warning": true,
//           },
//         });

//         console.log("Response data:", response.data);

//         // Ensure the response data is an array before setting the state
//         if (Array.isArray(response.data)) {
//           setSurvivalKits(response.data);
//         } else {
//           console.error("Invalid data structure:", response.data);
//           setError("Invalid data structure");
//         }
//       } catch (error) {
//         console.error("Error fetching all survival kits:", error);
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllSurvivalKits();
//   }, [apiBaseUrl]);

//   console.log("Survival Kits state:", survivalKits);

//   return (
//     <div>
//       <h1>Survival Kit App</h1>

//       {loading && <p>Loading...</p>}

//       {error && <p>Error: {error}</p>}

//       {!loading && !error && (
//         <div>
//           <h2>All Survival Kits:</h2>
//           <ul>
//             {survivalKits.map((kit) => (
//               <li key={kit.id}>
//                 {kit.name} - Location: {kit.location} - Address: {kit.address}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
// Import necessary libraries and modules
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "./components/Header";

// function App() {
//   const [survivalKits, setSurvivalKits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [nearbyKits, setNearbyKits] = useState([]);
//   const apiBaseUrl = "https://mysite-kmyj.onrender.com";

//   const fetchAllSurvivalKits = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiBaseUrl}/survival_kits`);

//       console.log("Full API Response:", response.data);

//       if (Array.isArray(response.data)) {
//         setSurvivalKits(response.data);
//       } else {
//         console.error("Invalid response format. Expected an array.");
//       }
//     } catch (error) {
//       console.error("Error fetching all survival kits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findNearbySurvivalKits = async () => {
//     try {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const userLatitude = position.coords.latitude;
//         const userLongitude = position.coords.longitude;

//         const nearbyKits = survivalKits.filter((kit) => {
//           const kitDistance = calculateDistance(
//             userLatitude,
//             userLongitude,
//             kit.latitude,
//             kit.longitude
//           );
//           return kitDistance <= 10;
//         });

//         console.log("Nearby Survival Kits:", nearbyKits);
//         setNearbyKits(nearbyKits);
//       });
//     } catch (error) {
//       console.error("Error finding nearby survival kits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) *
//         Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
//   };

//   const deg2rad = (deg) => {
//     return deg * (Math.PI / 180);
//   };

//   useEffect(() => {
//     fetchAllSurvivalKits();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <h1>Survival Kit App</h1>

//       <button onClick={findNearbySurvivalKits} disabled={loading}>
//         {loading
//           ? "Finding Nearby Survival Kits..."
//           : "Find Nearby Survival Kits"}
//       </button>

//       <div>
//         <h2>All Survival Kits:</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : survivalKits.length > 0 ? (
//           <ul>
//             {survivalKits.map((kit) => (
//               <li key={kit.id}>
//                 {kit.name} - Location: {kit.location} - Address: {kit.address}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No survival kits found.</p>
//         )}
//       </div>

//       <div>
//         <h2>Nearby Survival Kits:</h2>
//         {loading ? (
//           <p>Searching for nearby survival kits...</p>
//         ) : nearbyKits.length > 0 ? (
//           <ul>
//             {nearbyKits.map((kit) => (
//               <li key={kit.id}>
//                 {kit.name} - Location: {kit.location} - Address: {kit.address}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No nearby survival kits found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import Kits from "./components/Kits";
// import Header from "./components/Header";

// function App() {
//   return (
//     <div>
//       <Header />
//       <Kits />
//     </div>
//   );
// }

// export default App;
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import Kits from "./components/Kits";
// import Header from "./components/Header";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia3ViaWRvZ2FuIiwiYSI6ImNsc2Y1bjZxcDE5N2Iyamw1MGlmZjdzcTUifQ.p87uDmOrQ2KUjSDMaVLoxw";

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//       <Kits />
//     </div>
//   );
// }

/* eslint-disable-next-line import/no-webpack-loader-syntax */
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import Kits from "./components/Kits";
// import Header from "./components/Header";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia3ViaWRvZ2FuIiwiYSI6ImNsc2Y2bDF6ODB1djAya21oYjM0cjlsbW4ifQ.FhR8WBg6YiNwwloyBOqLUQ";

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-1.8907);
//   const [lat, setLat] = useState(52.4958);
//   const [zoom, setZoom] = useState(10);

//   const addMarkersToMap = (coordinates) => {
//     if (map.current) {
//       // Clear existing markers
//       map.current.getSource("markers").setData({
//         type: "FeatureCollection",
//         features: [],
//       });

//       // Add new markers
//       map.current.getSource("markers").setData({
//         type: "FeatureCollection",
//         features: coordinates.map(([longitude, latitude]) => ({
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [longitude, latitude],
//           },
//           properties: {},
//         })),
//       });
//     }
//   };

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on("load", () => {
//       // Add a source and layer for the markers
//       map.current.addSource("markers", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.current.addLayer({
//         id: "markers",
//         type: "symbol",
//         source: "markers",
//         layout: {
//           "icon-image": "custom-marker",
//           "icon-allow-overlap": true,
//         },
//       });

//       // Add a custom marker image
//       map.current.loadImage("/marker.png", (error, image) => {
//         if (error) throw error;
//         if (map.current) {
//           map.current.addImage("custom-marker", image);
//         }
//       });
//     });

//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   }, [lng, lat, zoom]);

//   return (
//     <div>
//       <Header />
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//       <Kits addMarkersToMap={addMarkersToMap} />
//     </div>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Kits from "./components/Kits";
import Header from "./components/Header";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3ViaWRvZ2FuIiwiYSI6ImNsc2Y2bDF6ODB1djAya21oYjM0cjlsbW4ifQ.FhR8WBg6YiNwwloyBOqLUQ";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.9506128); // Default to the longitude of the UK
  const [lat, setLat] = useState(52.6173877); // Default to the latitude of the UK
  const [zoom, setZoom] = useState(9);

  const addMarkersToMap = (survivalKits) => {
    if (map.current) {
      // Clear existing markers
      map.current.getSource("markers").setData({
        type: "FeatureCollection",
        features: [],
      });

      // Add new markers
      map.current.getSource("markers").setData({
        type: "FeatureCollection",
        features: survivalKits.map((kit) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [kit.longitude, kit.latitude],
          },
          properties: {
            name: kit.name,
            location: kit.location,
            address: kit.address,
          },
        })),
      });
    }

    // Add a popup to each marker
    survivalKits.forEach((kit) => {
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(
        `<h3>${kit.name}</h3><p>Location: ${kit.location}</p><p>Address: ${kit.address}</p>`
      );

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([kit.longitude, kit.latitude])
        .setPopup(popup)
        .addTo(map.current);
    });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // Add sources and layers when the map is loaded
      map.current.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      // Add a custom marker image
      map.current.loadImage(
        "/marker.png", // Adjust the path to your marker image
        (error, image) => {
          if (error) throw error;
          if (map.current) {
            map.current.addImage("custom-marker", image);

            // Add a layer for the markers after the image is loaded
            map.current.addLayer({
              id: "markers",
              type: "symbol",
              source: "markers",
              layout: {
                "icon-image": "custom-marker",
                "icon-allow-overlap": true,
              },
            });
          }
        }
      );
    });
  }, [lng, lat, zoom]);

  return (
    <div>
      <Header />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <Kits addMarkersToMap={addMarkersToMap} />
    </div>
  );
}
