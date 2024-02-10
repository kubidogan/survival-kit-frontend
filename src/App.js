// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import Kits from "./components/Kits";
// import Header from "./components/Header";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia3ViaWRvZ2FuIiwiYSI6ImNsc2Y2bDF6ODB1djAya21oYjM0cjlsbW4ifQ.FhR8WBg6YiNwwloyBOqLUQ";

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-1.9506128); // Default to the longitude of the UK
//   const [lat, setLat] = useState(52.6173877); // Default to the latitude of the UK
//   const [zoom, setZoom] = useState(9);

//   const addMarkersToMap = (survivalKits) => {
//     if (map.current) {
//       // Clear existing markers
//       map.current.getSource("markers").setData({
//         type: "FeatureCollection",
//         features: [],
//       });

//       // Add new markers
//       map.current.getSource("markers").setData({
//         type: "FeatureCollection",
//         features: survivalKits.map((kit) => ({
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [kit.longitude, kit.latitude],
//           },
//           properties: {
//             name: kit.name,
//             location: kit.location,
//             address: kit.address,
//           },
//         })),
//       });
//     }

//     // Add a popup to each marker
//     survivalKits.forEach((kit) => {
//       const popup = new mapboxgl.Popup({
//         offset: 25,
//         closeButton: false,
//       }).setHTML(
//         `<h3>${kit.name}</h3><p>Location: ${kit.location}</p><p>Address: ${kit.address}</p>`
//       );

//       new mapboxgl.Marker({ color: "red" })
//         .setLngLat([kit.longitude, kit.latitude])
//         .setPopup(popup)
//         .addTo(map.current);
//     });
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
//       // Add sources and layers when the map is loaded
//       map.current.addSource("markers", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [],
//         },
//       });

//       map.current.on("move", () => {
//         setLng(map.current.getCenter().lng.toFixed(4));
//         setLat(map.current.getCenter().lat.toFixed(4));
//         setZoom(map.current.getZoom().toFixed(2));
//       });

//       // Add a custom marker image
//       map.current.loadImage(
//         "/marker.png", // Adjust the path to your marker image
//         (error, image) => {
//           if (error) throw error;
//           if (map.current) {
//             map.current.addImage("custom-marker", image);

//             // Add a layer for the markers after the image is loaded
//             map.current.addLayer({
//               id: "markers",
//               type: "symbol",
//               source: "markers",
//               layout: {
//                 "icon-image": "custom-marker",
//                 "icon-allow-overlap": true,
//               },
//             });
//           }
//         }
//       );
//     });
//   }, [lng, lat, zoom]);

//   return (
//     <div className="app-container">
//       <Header />

//       <div className="circle">
//         <div ref={mapContainer} className="map-container" />
//       </div>
//       <Kits addMarkersToMap={addMarkersToMap} />
//     </div>
//   );
// }

// Before adding users location as the default location for mapbox

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Kits from "./components/Kits";
import Header from "./components/Header";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3ViaWRvZ2FuIiwiYSI6ImNsc2Y2bDF6ODB1djAya21oYjM0cjlsbW4ifQ.FhR8WBg6YiNwwloyBOqLUQ";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
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
    if (map.current) return;

    // Try to get user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        setLng(userLongitude);
        setLat(userLatitude);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [userLongitude, userLatitude],
          zoom: zoom,
        });

        map.current.on("load", () => {
          // Check if the source already exists, remove it if it does
          if (map.current.getSource("markers")) {
            map.current.removeSource("markers");
          }

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

          map.current.loadImage("/marker.png", (error, image) => {
            if (error) throw error;
            if (map.current) {
              map.current.addImage("custom-marker", image);

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
          });
        });
      },
      (error) => {
        console.error("Error getting user's geolocation:", error);
        setLng(-1.9506128);
        setLat(52.6173877);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [lng, lat],
          zoom: zoom,
        });

        map.current.on("load", () => {
          // Check if the source already exists, remove it if it does
          if (map.current.getSource("markers")) {
            map.current.removeSource("markers");
          }

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

          map.current.loadImage("/marker.png", (error, image) => {
            if (error) throw error;
            if (map.current) {
              map.current.addImage("custom-marker", image);

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
          });
        });
      }
    );
  }, [lng, lat, zoom]);

  return (
    <div className="app-container">
      <Header />

      <div className="circle">
        <div ref={mapContainer} className="map-container" />
      </div>
      <Kits addMarkersToMap={addMarkersToMap} />
    </div>
  );
}
