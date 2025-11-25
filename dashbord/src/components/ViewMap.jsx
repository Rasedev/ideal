// import React, { useState, useEffect, useRef } from "react";

// const ViewMap = ({ apiKey }) => {
//   const [showDetails, setShowDetails] = useState(true);
//   const [mapTitle, setMapTitle] = useState("Bangladesh Map View");
//   const [mapCenter, setMapCenter] = useState({ lat: 23.685, lng: 90.3563 }); // ✅ Bangladesh
//   const [mapZoom, setMapZoom] = useState(7);
//   const [mapType, setMapType] = useState("roadmap");

//   const mapContainerRef = useRef(null);
//   const googleMapInstanceRef = useRef(null);

//   const initMap = () => {
//     if (!window.google || !window.google.maps) {
//       console.error("Google Maps is not available.");
//       return;
//     }

//     if (mapContainerRef.current) {
//       if (googleMapInstanceRef.current) {
//         googleMapInstanceRef.current.setCenter(mapCenter);
//         googleMapInstanceRef.current.setZoom(mapZoom);
//         googleMapInstanceRef.current.setMapTypeId(mapType);
//       } else {
//         const mapOptions = {
//           center: mapCenter,
//           zoom: mapZoom,
//           mapTypeId: mapType,
//         };

//         const map = new window.google.maps.Map(
//           mapContainerRef.current,
//           mapOptions
//         );

//         // Marker API: fallback for non-AdvancedMarkerElement if needed
//         if (window.google.maps.marker?.AdvancedMarkerElement) {
//           new window.google.maps.marker.AdvancedMarkerElement({
//             map,
//             position: mapCenter,
//             title: `Centered at: ${mapCenter.lat.toFixed(
//               4
//             )}, ${mapCenter.lng.toFixed(4)}`,
//           });
//         } else {
//           new window.google.maps.Marker({
//             map,
//             position: mapCenter,
//             title: `Centered at: ${mapCenter.lat.toFixed(
//               4
//             )}, ${mapCenter.lng.toFixed(4)}`,
//           });
//         }

//         googleMapInstanceRef.current = map;
//       }
//     }
//   };

//   const handleReset = () => {
//     setMapCenter({ lat: 23.685, lng: 90.3563 });
//     setMapZoom(7);
//     setMapType("roadmap");
//     if (googleMapInstanceRef.current) {
//       googleMapInstanceRef.current.setCenter({ lat: 23.685, lng: 90.3563 });
//       googleMapInstanceRef.current.setZoom(7);
//       googleMapInstanceRef.current.setMapTypeId("roadmap");
//     }
//   };

//   const handleLayerChange = (type) => {
//     setMapType(type);
//     if (googleMapInstanceRef.current) {
//       googleMapInstanceRef.current.setMapTypeId(type);
//     }else {
//     console.warn("Google Map is not initialized yet.");
//   }
//   };

//   useEffect(() => {
//     if (!apiKey) {
//       console.error("Google Maps API Key is missing!");
//       return;
//     }

//     const initializeMap = () => {
//       if (window.google && window.google.maps) {
//         initMap();
//       } else {
//         console.error("Google Maps script did not load properly.");
//       }
//     };

//     // Avoid loading script if already available
//     const existingScript = document.getElementById("google-maps-script");
//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.id = "google-maps-script";
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
//       script.async = true;
//       script.defer = true;

//       // Wait until the script is loaded before initializing the map
//       script.onload = initializeMap;
//       document.head.appendChild(script);
//     } else {
//       if (window.google && window.google.maps) {
//         initializeMap();
//       } else {
//         existingScript.addEventListener("load", initializeMap);
//       }
//     }

//     return () => {
//       delete window.initMap;
//     };
//   }, [apiKey]);

//   const toggleDetails = () => setShowDetails(!showDetails);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row gap-6">
//         {/* Map Section */}
//         <div className="flex-1 relative min-h-[400px] rounded-2xl overflow-hidden">
//           {/* <div
//             ref={mapContainerRef}
//             className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
//           >
//             {!googleMapInstanceRef.current && <p>Loading Map...</p>}
//           </div> */}
//           <div
//             ref={mapContainerRef}
//             className="w-full h-full bg-gray-200"
//             style={{ position: "relative" }}
//           ></div>

//           <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-lg shadow-md text-center text-lg font-semibold z-10">
//             {mapTitle}
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="w-full lg:w-1/3 p-4 flex flex-col justify-between space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
//               Map Information & Controls
//             </h2>

//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Current View Details:
//               </h3>
//               {showDetails ? (
//                 <div className="bg-blue-50 p-4 rounded-lg text-sm shadow-inner">
//                   <p>
//                     <strong>Library:</strong> Google Maps
//                   </p>
//                   <p>
//                     <strong>Center:</strong> {mapCenter.lat.toFixed(4)},{" "}
//                     {mapCenter.lng.toFixed(4)}
//                   </p>
//                   <p>
//                     <strong>Zoom:</strong> {mapZoom}
//                   </p>
//                   <p>
//                     <strong>Map Type:</strong> {mapType}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {new Date().toLocaleTimeString()}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="italic text-gray-500">Details are hidden.</p>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Map Layers:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {["roadmap", "satellite", "terrain"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => handleLayerChange(type)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                       mapType === type
//                         ? "bg-indigo-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-3">
//             <button
//               onClick={toggleDetails}
//               className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
//             >
//               {showDetails ? "Hide Details" : "Show Details"}
//             </button>
//             <button
//               onClick={handleReset}
//               className="w-full bg-white border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition"
//             >
//               Reset View
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMap;

// AIzaSyDSRUAPYVSOiPwbOveKa5oC16Q_uhsdZjs     ////  google api key ////



////////////////////////////////////Final????///////////////////////////



// import { Layout,Typography } from "antd";
// import { useState, useEffect, useRef } from "react";

// const { Title } = Typography;
// const { Header} = Layout;

// const App = () => {
//   const GOOGLE_MAPS_API_KEY = "AIzaSyDSRUAPYVSOiPwbOveKa5oC16Q_uhsdZjs";

//   return (
//     <Layout className="min-h-screen bg-gray-100  antialiased font-railway">
//       <Header className="bg-[#FFF] p-0 ">
//         <Title
//           level={3}
//           className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800 ">
//          Map Viewer (Google Maps)
//         </Title>
//       </Header>
      

//       <ViewMap apiKey={GOOGLE_MAPS_API_KEY} />
//     </Layout>
//   );
// };

// const ViewMap = ({ apiKey }) => {
//   const [showDetails, setShowDetails] = useState(true);
//   const [mapTitle, setMapTitle] = useState("Bangladesh Map View");

//   const [mapCenter, setMapCenter] = useState({ lat: 23.685, lng: 90.3563 });
//   const [mapZoom, setMapZoom] = useState(7);
//   const [mapType, setMapType] = useState("roadmap");

//   const mapContainerRef = useRef(null);
//   const googleMapInstanceRef = useRef(null);

//   const initMap = () => {
//     if (!window.google || !window.google.maps || !mapContainerRef.current) {
//       console.warn("Google Maps API not loaded or map container not ready.");
//       return;
//     }

//     if (googleMapInstanceRef.current) {
//       googleMapInstanceRef.current.setCenter(mapCenter);
//       googleMapInstanceRef.current.setZoom(mapZoom);
//       googleMapInstanceRef.current.setMapTypeId(mapType);
//       console.log("Google Map view updated:", mapCenter, mapZoom, mapType);
//     } else {
//       const mapOptions = {
//         center: mapCenter,
//         zoom: mapZoom,
//         mapTypeId: mapType,
//         // You can customize UI controls here if needed
//         // disableDefaultUI: false,
//       };

//       const map = new window.google.maps.Map(
//         mapContainerRef.current,
//         mapOptions
//       );

//       new window.google.maps.Marker({
//         position: mapCenter,
//         map: map,
//         title: `Initial View: ${mapCenter.lat.toFixed(
//           4
//         )}, ${mapCenter.lng.toFixed(4)}`,
//       });

//       googleMapInstanceRef.current = map;
//       console.log("Google Map initialized:", mapCenter, mapZoom, mapType);
//     }
//   };
  


//   useEffect(() => {
//     const loadMapSettings = () => {
//       const savedMapSettings = localStorage.getItem("mapSettings");
//       if (savedMapSettings) {
//         const settings = JSON.parse(savedMapSettings);
//         // Update state with loaded settings
//         setMapCenter({ lat: settings.latitude, lng: settings.longitude });
//         setMapZoom(settings.zoom);
//         // Set title based on loaded settings
//         setMapTitle(
//           `Map View: Lat ${settings.latitude.toFixed(
//             4
//           )}, Lon ${settings.longitude.toFixed(4)}`
//         );
//         console.log("Loaded map settings from localStorage:", settings);
//       } else {
//         console.log("No saved map settings found, using component defaults.");
//       }
//     };

//     loadMapSettings();

//   }, []);

//   useEffect(() => {
//     if (!apiKey) {
//       console.error("Google Maps API Key is missing. Map will not load.");
//       return; 
//     }
//     window.initMap = initMap;

//     const existingScript = document.getElementById("google-maps-script");
//     if (window.google && window.google.maps) {
//       console.log("Google Maps API already loaded, initializing map directly.");
//       initMap(); 
//       return;
//     }

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.id = "google-maps-script";
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=quarterly&libraries=marker`;
//       script.async = true;
//       script.defer = true;
//       script.onerror = () => {
//         console.error("Failed to load Google Maps API script.");
        
//       };
//       document.head.appendChild(script);
//     }

//     return () => {
//       if (window.initMap) {
//         delete window.initMap;
//       }
//     };
//   }, [apiKey, mapCenter, mapZoom, mapType]);

//   const handleReset = () => {
//     setMapCenter({ lat: 23.685, lng: 90.3563 });
//     setMapZoom(7);
//     setMapType("roadmap");
//     console.log("Map view reset to Bangladesh defaults.");
//   };

//   const handleLayerChange = (type) => {
//     setMapType(type);
//     console.log(`Map type changed to: ${type}`);
//     if (googleMapInstanceRef.current) {
//       googleMapInstanceRef.current.setMapTypeId(type);
//     } else {
//       console.warn("Google Map is not initialized yet.");
//     }
//   };

//   const toggleDetails = () => setShowDetails(!showDetails);

//   return (

//     <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6 ">
//       <div className="rounded-2xl  overflow-hidden flex flex-col lg:flex-row gap-6">
//         <div className="flex-1 relative min-h-[600px] rounded-2xl overflow-hidden">
//           <div
//             ref={mapContainerRef}
//             className="w-full h-full"
//             style={{ position: "relative" }}
//           />

          
//         </div>

//         <div className="bg-slate-700 w-full lg:w-1/4 p-6 flex flex-col justify-between space-y-6 rounded-2xl">
//           <div>
//             <h2 className="text-xl font-bold text-white mb-4 border-b pb-2 font-railway">
//               Map Information & Controls
//             </h2>

//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Current View Details:
//               </h3>
//               {showDetails ? (
//                 <div className="bg-blue-50 p-4 rounded-lg text-sm shadow-inner font-railway">
//                   <p>
//                     <strong>Library:</strong> Google Maps
//                   </p>
//                   <p>
//                     <strong>Center:</strong> {mapCenter.lat.toFixed(4)},{" "}
//                     {mapCenter.lng.toFixed(4)}
//                   </p>
//                   <p>
//                     <strong>Zoom:</strong> {mapZoom}
//                   </p>
//                   <p>
//                     <strong>Map Type:</strong> {mapType}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {new Date().toLocaleTimeString()}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="italic text-gray-500">Details are hidden.</p>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Map Layers:</h3>
//               <div className="flex flex-wrap gap-1">
//                 {["roadmap", "satellite", "terrain"].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => handleLayerChange(type)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                       mapType === type
//                         ? "bg-indigo-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={toggleDetails}
//               className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
//             >
//               {showDetails ? "Hide Details" : "Show Details"}
//             </button>
//             <button
//               onClick={handleReset}
//               className="w-full bg-white border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition"
//             >
//               Reset View
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>


//   );
// };

// export default App;




import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3'; // Import D3.js library

// Main App component (for Canvas preview)
const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 font-sans antialiased text-gray-100 flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-300 md:text-4xl lg:text-5xl">
          Geography Based Traffic
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Visualizing simulated traffic data across countries.
        </p>
      </header>
      <ViewMap />
    </div>
  );
};

const ViewMap = () => {
  const svgRef = useRef(null); // Ref for the SVG element
  const [loading, setLoading] = useState(true);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const drawMap = async () => {
      setLoading(true);
      try {
        // Fetch GeoJSON data for world countries
        // Using a publicly available GeoJSON for countries
        // In a real app, you might host this locally or use a more specific dataset.
        const worldData = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");

        if (!worldData) {
          console.error("Failed to load world GeoJSON data.");
          setLoading(false);
          return;
        }

        // Define map dimensions
        const width = window.innerWidth * 0.8; // 80% of window width
        const height = window.innerHeight * 0.7; // 70% of window height

        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", `0 0 ${width} ${height}`) // Essential for responsiveness
          .attr("preserveAspectRatio", "xMidYMid meet"); // Maintain aspect ratio

        // Clear previous drawing
        svg.selectAll("*").remove();

        // Map projection
        // Use geoMercator for standard world maps
        const projection = d3.geoMercator()
          .scale(Math.min(width, height) / (2 * Math.PI) * 1.5) // Adjust scale dynamically
          .translate([width / 2, height / 2]);

        // Path generator
        const path = d3.geoPath().projection(projection);

        // Generate random traffic data for countries
        const trafficData = new Map();
        worldData.features.forEach(feature => {
          // Assign a random traffic value between 0 and 100
          trafficData.set(feature.properties.name, Math.floor(Math.random() * 101));
        });

        // Define a color scale
        // domain: range of your data values (e.g., 0 to 100 for traffic)
        // range: array of colors from low to high
        const colorScale = d3.scaleSequential(d3.interpolateBlues) // A nice blue gradient
          .domain(d3.extent(Array.from(trafficData.values()))); // Use min/max of actual data

        // Draw the countries
        svg.append("g")
          .selectAll("path")
          .data(worldData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", d => {
            const countryTraffic = trafficData.get(d.properties.name);
            return countryTraffic !== undefined ? colorScale(countryTraffic) : "#ccc"; // Grey for no data
          })
          .attr("stroke", "#333") // Border color
          .attr("stroke-width", 0.5) // Border width
          .on("mouseover", (event, d) => {
            const countryName = d.properties.name;
            const trafficValue = trafficData.get(countryName) || "N/A";
            setTooltipContent(`Country: ${countryName}<br/>Traffic: ${trafficValue}`);
            setTooltipPosition({ x: event.pageX + 10, y: event.pageY - 20 });
            setShowTooltip(true);
            d3.select(event.currentTarget)
              .attr("stroke", "white") // Highlight on hover
              .attr("stroke-width", 2);
          })
          .on("mousemove", (event) => {
            setTooltipPosition({ x: event.pageX + 10, y: event.pageY - 20 });
          })
          .on("mouseout", (event) => {
            setShowTooltip(false);
            d3.select(event.currentTarget)
              .attr("stroke", "#333") // Revert border color
              .attr("stroke-width", 0.5);
          });

        setLoading(false);

        // Optional: Add a legend
        const legendWidth = 200;
        const legendHeight = 20;
        const legendSvg = svg.append("g")
          .attr("transform", `translate(${width - legendWidth - 20}, ${height - legendHeight - 20})`); // Position at bottom right

        const legendLinear = d3.scaleLinear()
          .domain(colorScale.domain())
          .range([0, legendWidth]);

        legendSvg.append("rect")
          .attr("width", legendWidth)
          .attr("height", legendHeight)
          .style("fill", "url(#gradient)");

        // Create a gradient for the legend
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");

        linearGradient.selectAll("stop")
          .data(colorScale.ticks().map((t) => ({ offset: `${100 * legendLinear(t) / legendWidth}%`, color: colorScale(t) })))
          .enter().append("stop")
          .attr("offset", d => d.offset)
          .attr("stop-color", d => d.color);

        legendSvg.append("text")
          .attr("x", 0)
          .attr("y", -5)
          .attr("fill", "white")
          .style("font-size", "10px")
          .text("Low Traffic");

        legendSvg.append("text")
          .attr("x", legendWidth)
          .attr("y", -5)
          .attr("text-anchor", "end")
          .attr("fill", "white")
          .style("font-size", "10px")
          .text("High Traffic");

      } catch (error) {
        console.error("Error drawing map:", error);
        setLoading(false);
      }
    };

    // Re-draw map on window resize for responsiveness
    const handleResize = () => {
      drawMap();
    };

    drawMap(); // Initial draw
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-2xl p-6 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-20 rounded-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">Loading Map Data...</p>
        </div>
      )}
      <svg ref={svgRef} className="rounded-lg"></svg>
      {showTooltip && (
        <div
          className="absolute bg-gray-700 text-white text-xs p-2 rounded shadow-lg pointer-events-none transition-opacity duration-200"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)', // Center above cursor
            opacity: showTooltip ? 1 : 0,
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}
    </div>
  );
};

export default App; // Export App for Canvas preview

