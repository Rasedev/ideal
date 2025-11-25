// // components/map/ViewMap.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Card,
//   Row,
//   Col,
//   Input,
//   Select,
//   Button,
//   Space,
//   Typography,
//   Divider,
//   Tag,
//   Tooltip,
//   Spin,
//   Alert,
//   Modal,
//   Form,
//   Switch,
//   Slider,
//   Badge
// } from 'antd';
// import {
//   SearchOutlined,
//   EnvironmentOutlined,
//   FilterOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   SettingOutlined,
//   CompassOutlined,
//   ZoomInOutlined,
//   ZoomOutOutlined,
//   MyLocationOutlined,
//   LayersOutlined,
//   InfoCircleOutlined
// } from '@ant-design/icons';

// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { Search } = Input;

// /**
//  * ViewMap Component - Interactive Map Viewer for Association
//  */
// const ViewMap = ({ apiKey }) => {
//   const [loading, setLoading] = useState(true);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     plotType: 'all',
//     status: 'all',
//     category: 'all'
//   });
//   const [selectedPlot, setSelectedPlot] = useState(null);
//   const [showSettings, setShowSettings] = useState(false);
//   const [mapSettings, setMapSettings] = useState({
//     showLabels: true,
//     showGrid: true,
//     showPlots: true,
//     zoomLevel: 15,
//     mapStyle: 'standard'
//   });

//   // Mock plot data - Replace with actual API data
//   const [plots, setPlots] = useState([
//     {
//       id: 1,
//       plotNumber: 'A-101',
//       type: 'residential',
//       status: 'available',
//       category: 'premium',
//       area: '1200 sq ft',
//       price: '₹25,00,000',
//       owner: 'John Smith',
//       coordinates: { lat: 23.8103, lng: 90.4125 },
//       description: 'Corner plot with road access'
//     },
//     {
//       id: 2,
//       plotNumber: 'A-102',
//       type: 'commercial',
//       status: 'sold',
//       category: 'standard',
//       area: '800 sq ft',
//       price: '₹18,00,000',
//       owner: 'Sarah Johnson',
//       coordinates: { lat: 23.8110, lng: 90.4130 },
//       description: 'Near main entrance'
//     },
//     {
//       id: 3,
//       plotNumber: 'B-201',
//       type: 'residential',
//       status: 'reserved',
//       category: 'premium',
//       area: '1500 sq ft',
//       price: '₹30,00,000',
//       owner: 'Mike Brown',
//       coordinates: { lat: 23.8095, lng: 90.4118 },
//       description: 'Lake view plot'
//     },
//     {
//       id: 4,
//       plotNumber: 'C-301',
//       type: 'industrial',
//       status: 'available',
//       category: 'economic',
//       area: '2000 sq ft',
//       price: '₹22,00,000',
//       owner: 'Association',
//       coordinates: { lat: 23.8120, lng: 90.4140 },
//       description: 'Industrial zone plot'
//     }
//   ]);

//   const [filteredPlots, setFilteredPlots] = useState(plots);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Simulate map loading
//     const timer = setTimeout(() => {
//       setLoading(false);
//       setMapLoaded(true);
//       initializeMap();
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     filterPlots();
//   }, [filters, searchQuery, plots]);

//   const initializeMap = () => {
//     // This would initialize Google Maps or any other map service
//     console.log('Initializing map with API key:', apiKey);
//     // Actual map initialization would go here
//   };

//   const filterPlots = () => {
//     let filtered = [...plots];

//     // Search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(plot =>
//         plot.plotNumber.toLowerCase().includes(query) ||
//         plot.owner.toLowerCase().includes(query) ||
//         plot.description.toLowerCase().includes(query)
//       );
//     }

//     // Plot type filter
//     if (filters.plotType !== 'all') {
//       filtered = filtered.filter(plot => plot.type === filters.plotType);
//     }

//     // Status filter
//     if (filters.status !== 'all') {
//       filtered = filtered.filter(plot => plot.status === filters.status);
//     }

//     // Category filter
//     if (filters.category !== 'all') {
//       filtered = filtered.filter(plot => plot.category === filters.category);
//     }

//     setFilteredPlots(filtered);
//   };

//   const handlePlotClick = (plot) => {
//     setSelectedPlot(plot);
//   };

//   const handleSearch = (value) => {
//     setSearchQuery(value);
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       available: { color: 'green', text: 'AVAILABLE' },
//       sold: { color: 'red', text: 'SOLD' },
//       reserved: { color: 'orange', text: 'RESERVED' },
//       under_construction: { color: 'blue', text: 'UNDER CONSTRUCTION' }
//     };
//     const config = statusConfig[status] || { color: 'default', text: status };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const getTypeTag = (type) => {
//     const typeConfig = {
//       residential: { color: 'blue', text: 'RESIDENTIAL' },
//       commercial: { color: 'purple', text: 'COMMERCIAL' },
//       industrial: { color: 'orange', text: 'INDUSTRIAL' },
//       agricultural: { color: 'green', text: 'AGRICULTURAL' }
//     };
//     const config = typeConfig[type] || { color: 'default', text: type };
//     return <Tag color={config.color}>{config.text}</Tag>;
//   };

//   const handleZoomIn = () => {
//     setMapSettings(prev => ({
//       ...prev,
//       zoomLevel: Math.min(prev.zoomLevel + 1, 20)
//     }));
//   };

//   const handleZoomOut = () => {
//     setMapSettings(prev => ({
//       ...prev,
//       zoomLevel: Math.max(prev.zoomLevel - 1, 1)
//     }));
//   };

//   const handleCurrentLocation = () => {
//     // This would center map on user's current location
//     console.log('Centering on current location');
//   };

//   const MapContainer = () => (
//     <div 
//       ref={mapRef}
//       className="w-full h-full rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
//     >
//       {/* Mock Map Grid */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
//         {/* Grid Lines */}
//         <div className="absolute inset-0 opacity-20">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <React.Fragment key={i}>
//               <div 
//                 className="absolute w-full h-px bg-gray-400"
//                 style={{ top: `${(i + 1) * 5}%` }}
//               />
//               <div 
//                 className="absolute h-full w-px bg-gray-400"
//                 style={{ left: `${(i + 1) * 5}%` }}
//               />
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Plot Markers */}
//         {filteredPlots.map((plot, index) => (
//           <Tooltip key={plot.id} title={`Plot ${plot.plotNumber} - ${plot.owner}`}>
//             <div
//               className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 ${
//                 plot.status === 'available' ? 'bg-green-500 border-green-700' :
//                 plot.status === 'sold' ? 'bg-red-500 border-red-700' :
//                 'bg-orange-500 border-orange-700'
//               } ${selectedPlot?.id === plot.id ? 'ring-4 ring-blue-400 scale-150' : ''}`}
//               style={{
//                 left: `${20 + (index * 15) % 60}%`,
//                 top: `${30 + (index * 10) % 40}%`
//               }}
//               onClick={() => handlePlotClick(plot)}
//             >
//               <div className="text-white text-xs font-bold flex items-center justify-center h-full">
//                 {plot.plotNumber.split('-')[1]}
//               </div>
//             </div>
//           </Tooltip>
//         ))}

//         {/* Legend */}
//         <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
//           <Text strong className="block mb-2">Legend</Text>
//           <Space direction="vertical" size="small">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <Text className="text-xs">Available</Text>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <Text className="text-xs">Sold</Text>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//               <Text className="text-xs">Reserved</Text>
//             </div>
//           </Space>
//         </div>

//         {/* Map Controls */}
//         <div className="absolute top-4 right-4 space-y-2">
//           <Tooltip title="Zoom In">
//             <Button 
//               icon={<ZoomInOutlined />} 
//               size="small" 
//               onClick={handleZoomIn}
//               className="bg-white shadow"
//             />
//           </Tooltip>
//           <Tooltip title="Zoom Out">
//             <Button 
//               icon={<ZoomOutOutlined />} 
//               size="small" 
//               onClick={handleZoomOut}
//               className="bg-white shadow"
//             />
//           </Tooltip>
//           <Tooltip title="My Location">
//             <Button 
//               icon={<MyLocationOutlined />} 
//               size="small" 
//               onClick={handleCurrentLocation}
//               className="bg-white shadow"
//             />
//           </Tooltip>
//           <Tooltip title="Map Settings">
//             <Button 
//               icon={<SettingOutlined />} 
//               size="small" 
//               onClick={() => setShowSettings(true)}
//               className="bg-white shadow"
//             />
//           </Tooltip>
//         </div>

//         {/* Zoom Level Indicator */}
//         <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow border">
//           <Text className="text-sm">Zoom: {mapSettings.zoomLevel}</Text>
//         </div>
//       </div>

//       {!mapLoaded && (
//         <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
//           <Spin size="large" tip="Loading Map..." />
//         </div>
//       )}
//     </div>
//   );

//   const PlotDetails = () => {
//     if (!selectedPlot) {
//       return (
//         <div className="h-full flex items-center justify-center text-gray-500">
//           <div className="text-center">
//             <EnvironmentOutlined className="text-4xl mb-4 text-gray-300" />
//             <Text>Select a plot to view details</Text>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-start">
//           <div>
//             <Title level={4} className="!mb-1">
//               Plot {selectedPlot.plotNumber}
//             </Title>
//             <Text type="secondary">{selectedPlot.description}</Text>
//           </div>
//           <Badge 
//             status={
//               selectedPlot.status === 'available' ? 'success' :
//               selectedPlot.status === 'sold' ? 'error' : 'warning'
//             } 
//             text={selectedPlot.status.toUpperCase()}
//           />
//         </div>

//         <Divider className="!my-4" />

//         <Space direction="vertical" size="middle" className="w-full">
//           <div className="flex justify-between">
//             <Text strong>Type:</Text>
//             {getTypeTag(selectedPlot.type)}
//           </div>
//           <div className="flex justify-between">
//             <Text strong>Area:</Text>
//             <Text>{selectedPlot.area}</Text>
//           </div>
//           <div className="flex justify-between">
//             <Text strong>Price:</Text>
//             <Text className="text-green-600 font-semibold">{selectedPlot.price}</Text>
//           </div>
//           <div className="flex justify-between">
//             <Text strong>Owner:</Text>
//             <Text>{selectedPlot.owner}</Text>
//           </div>
//           <div className="flex justify-between">
//             <Text strong>Category:</Text>
//             <Tag color={selectedPlot.category === 'premium' ? 'gold' : 'blue'}>
//               {selectedPlot.category.toUpperCase()}
//             </Tag>
//           </div>
//         </Space>

//         <Divider className="!my-4" />

//         <Space direction="vertical" size="small" className="w-full">
//           <Text strong>Coordinates:</Text>
//           <Text code>
//             {selectedPlot.coordinates.lat.toFixed(4)}, {selectedPlot.coordinates.lng.toFixed(4)}
//           </Text>
//         </Space>

//         <div className="pt-4">
//           <Space>
//             <Button type="primary" icon={<EyeOutlined />}>
//               View Details
//             </Button>
//             <Button icon={<InfoCircleOutlined />}>
//               More Info
//             </Button>
//           </Space>
//         </div>
//       </div>
//     );
//   };

//   const MapSettingsModal = () => (
//     <Modal
//       title="Map Settings"
//       open={showSettings}
//       onCancel={() => setShowSettings(false)}
//       footer={[
//         <Button key="cancel" onClick={() => setShowSettings(false)}>
//           Cancel
//         </Button>,
//         <Button key="save" type="primary" onClick={() => setShowSettings(false)}>
//           Save Settings
//         </Button>,
//       ]}
//       width={500}
//     >
//       <Space direction="vertical" size="middle" className="w-full">
//         <div className="flex justify-between items-center">
//           <Text>Show Plot Labels</Text>
//           <Switch 
//             checked={mapSettings.showLabels} 
//             onChange={(checked) => setMapSettings(prev => ({ ...prev, showLabels: checked }))}
//           />
//         </div>
//         <div className="flex justify-between items-center">
//           <Text>Show Grid Lines</Text>
//           <Switch 
//             checked={mapSettings.showGrid} 
//             onChange={(checked) => setMapSettings(prev => ({ ...prev, showGrid: checked }))}
//           />
//         </div>
//         <div className="flex justify-between items-center">
//           <Text>Show All Plots</Text>
//           <Switch 
//             checked={mapSettings.showPlots} 
//             onChange={(checked) => setMapSettings(prev => ({ ...prev, showPlots: checked }))}
//           />
//         </div>
        
//         <Divider />
        
//         <div>
//           <Text strong>Zoom Level</Text>
//           <Slider
//             min={1}
//             max={20}
//             value={mapSettings.zoomLevel}
//             onChange={(value) => setMapSettings(prev => ({ ...prev, zoomLevel: value }))}
//           />
//         </div>
        
//         <div>
//           <Text strong>Map Style</Text>
//           <Select
//             value={mapSettings.mapStyle}
//             onChange={(value) => setMapSettings(prev => ({ ...prev, mapStyle: value }))}
//             className="w-full mt-2"
//           >
//             <Option value="standard">Standard</Option>
//             <Option value="satellite">Satellite</Option>
//             <Option value="terrain">Terrain</Option>
//             <Option value="light">Light</Option>
//             <Option value="dark">Dark</Option>
//           </Select>
//         </div>
//       </Space>
//     </Modal>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Spin size="large" tip="Loading Map Viewer..." />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <Title level={2} className="!mb-2">
//             <EnvironmentOutlined className="text-green-500 mr-3" />
//             Association Map
//           </Title>
//           <Text className="text-gray-600">
//             Interactive map view of all plots and properties
//           </Text>
//         </div>
//         <Space>
//           <Button icon={<LayersOutlined />}>
//             Layer Manager
//           </Button>
//           <Button type="primary" icon={<PlusOutlined />}>
//             Add Plot
//           </Button>
//         </Space>
//       </div>

//       {/* Search and Filters */}
//       <Card className="shadow-sm border-0">
//         <Row gutter={[16, 16]} align="middle">
//           <Col xs={24} sm={12} md={8}>
//             <Search
//               placeholder="Search plots by number, owner..."
//               allowClear
//               enterButton={<SearchOutlined />}
//               size="large"
//               onSearch={handleSearch}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </Col>
//           <Col xs={24} sm={12} md={4}>
//             <Select
//               placeholder="Plot Type"
//               value={filters.plotType}
//               onChange={(value) => handleFilterChange('plotType', value)}
//               className="w-full"
//               size="large"
//             >
//               <Option value="all">All Types</Option>
//               <Option value="residential">Residential</Option>
//               <Option value="commercial">Commercial</Option>
//               <Option value="industrial">Industrial</Option>
//               <Option value="agricultural">Agricultural</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={4}>
//             <Select
//               placeholder="Status"
//               value={filters.status}
//               onChange={(value) => handleFilterChange('status', value)}
//               className="w-full"
//               size="large"
//             >
//               <Option value="all">All Status</Option>
//               <Option value="available">Available</Option>
//               <Option value="sold">Sold</Option>
//               <Option value="reserved">Reserved</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={4}>
//             <Select
//               placeholder="Category"
//               value={filters.category}
//               onChange={(value) => handleFilterChange('category', value)}
//               className="w-full"
//               size="large"
//             >
//               <Option value="all">All Categories</Option>
//               <Option value="premium">Premium</Option>
//               <Option value="standard">Standard</Option>
//               <Option value="economic">Economic</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={4}>
//             <Button 
//               icon={<FilterOutlined />}
//               onClick={() => setFilters({ plotType: 'all', status: 'all', category: 'all' })}
//               className="w-full"
//               size="large"
//             >
//               Clear Filters
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Stats Alert */}
//       <Alert
//         message={`Showing ${filteredPlots.length} of ${plots.length} plots`}
//         description={`${plots.filter(p => p.status === 'available').length} plots available for purchase`}
//         type="info"
//         showIcon
//         closable
//       />

//       {/* Main Content */}
//       <Row gutter={[16, 16]}>
//         {/* Map Container */}
//         <Col xs={24} lg={16}>
//           <Card className="shadow-sm border-0 h-full">
//             <div className="h-96 lg:h-[500px]">
//               <MapContainer />
//             </div>
//           </Card>
//         </Col>

//         {/* Plot Details Sidebar */}
//         <Col xs={24} lg={8}>
//           <Card 
//             title="Plot Details" 
//             className="shadow-sm border-0 h-full"
//             extra={
//               selectedPlot && (
//                 <Button 
//                   type="text" 
//                   icon={<EyeInvisibleOutlined />} 
//                   onClick={() => setSelectedPlot(null)}
//                   size="small"
//                 >
//                   Clear
//                 </Button>
//               )
//             }
//           >
//             <div className="h-96 lg:h-[500px] overflow-y-auto">
//               <PlotDetails />
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Plots List */}
//       <Card title="All Plots" className="shadow-sm border-0">
//         <Row gutter={[16, 16]}>
//           {filteredPlots.map(plot => (
//             <Col xs={24} sm={12} md={8} lg={6} key={plot.id}>
//               <Card 
//                 size="small" 
//                 className={`cursor-pointer transition-all hover:shadow-lg ${
//                   selectedPlot?.id === plot.id ? 'border-blue-500 border-2' : ''
//                 }`}
//                 onClick={() => handlePlotClick(plot)}
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <Text strong>Plot {plot.plotNumber}</Text>
//                   {getStatusTag(plot.status)}
//                 </div>
//                 <Text type="secondary" className="text-xs block mb-2">
//                   {plot.area} • {plot.type}
//                 </Text>
//                 <Text className="text-green-600 font-semibold block">
//                   {plot.price}
//                 </Text>
//                 <Text className="text-xs text-gray-500 block mt-1">
//                   {plot.owner}
//                 </Text>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {filteredPlots.length === 0 && (
//           <div className="text-center py-8">
//             <EnvironmentOutlined className="text-4xl text-gray-300 mb-4" />
//             <Text type="secondary">No plots found matching your criteria</Text>
//           </div>
//         )}
//       </Card>

//       {/* Settings Modal */}
//       <MapSettingsModal />
//     </div>
//   );
// };

// export default ViewMap;





// components/map/ViewMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Divider,
  Tag,
  Tooltip,
  Spin,
  Alert,
  Modal,
  Form,
  Switch,
  Slider,
  Badge
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  PlusOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
  CompassOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  AimOutlined,
  InfoCircleOutlined,
  AppstoreOutlined // Using AppstoreOutlined instead of LayersOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

/**
 * ViewMap Component - Interactive Map Viewer for Association
 */
const ViewMap = ({ apiKey }) => {
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    plotType: 'all',
    status: 'all',
    category: 'all'
  });
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [mapSettings, setMapSettings] = useState({
    showLabels: true,
    showGrid: true,
    showPlots: true,
    zoomLevel: 15,
    mapStyle: 'standard'
  });

  // Mock plot data - Replace with actual API data
  const [plots, setPlots] = useState([
    {
      id: 1,
      plotNumber: 'A-101',
      type: 'residential',
      status: 'available',
      category: 'premium',
      area: '1200 sq ft',
      price: '₹25,00,000',
      owner: 'John Smith',
      coordinates: { lat: 23.8103, lng: 90.4125 },
      description: 'Corner plot with road access'
    },
    {
      id: 2,
      plotNumber: 'A-102',
      type: 'commercial',
      status: 'sold',
      category: 'standard',
      area: '800 sq ft',
      price: '₹18,00,000',
      owner: 'Sarah Johnson',
      coordinates: { lat: 23.8110, lng: 90.4130 },
      description: 'Near main entrance'
    },
    {
      id: 3,
      plotNumber: 'B-201',
      type: 'residential',
      status: 'reserved',
      category: 'premium',
      area: '1500 sq ft',
      price: '₹30,00,000',
      owner: 'Mike Brown',
      coordinates: { lat: 23.8095, lng: 90.4118 },
      description: 'Lake view plot'
    },
    {
      id: 4,
      plotNumber: 'C-301',
      type: 'industrial',
      status: 'available',
      category: 'economic',
      area: '2000 sq ft',
      price: '₹22,00,000',
      owner: 'Association',
      coordinates: { lat: 23.8120, lng: 90.4140 },
      description: 'Industrial zone plot'
    }
  ]);

  const [filteredPlots, setFilteredPlots] = useState(plots);
  const mapRef = useRef(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setLoading(false);
      setMapLoaded(true);
      initializeMap();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterPlots();
  }, [filters, searchQuery, plots]);

  const initializeMap = () => {
    // This would initialize Google Maps or any other map service
    console.log('Initializing map with API key:', apiKey);
    // Actual map initialization would go here
  };

  const filterPlots = () => {
    let filtered = [...plots];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(plot =>
        plot.plotNumber.toLowerCase().includes(query) ||
        plot.owner.toLowerCase().includes(query) ||
        plot.description.toLowerCase().includes(query)
      );
    }

    // Plot type filter
    if (filters.plotType !== 'all') {
      filtered = filtered.filter(plot => plot.type === filters.plotType);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(plot => plot.status === filters.status);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(plot => plot.category === filters.category);
    }

    setFilteredPlots(filtered);
  };

  const handlePlotClick = (plot) => {
    setSelectedPlot(plot);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      available: { color: 'green', text: 'AVAILABLE' },
      sold: { color: 'red', text: 'SOLD' },
      reserved: { color: 'orange', text: 'RESERVED' },
      under_construction: { color: 'blue', text: 'UNDER CONSTRUCTION' }
    };
    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getTypeTag = (type) => {
    const typeConfig = {
      residential: { color: 'blue', text: 'RESIDENTIAL' },
      commercial: { color: 'purple', text: 'COMMERCIAL' },
      industrial: { color: 'orange', text: 'INDUSTRIAL' },
      agricultural: { color: 'green', text: 'AGRICULTURAL' }
    };
    const config = typeConfig[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleZoomIn = () => {
    setMapSettings(prev => ({
      ...prev,
      zoomLevel: Math.min(prev.zoomLevel + 1, 20)
    }));
  };

  const handleZoomOut = () => {
    setMapSettings(prev => ({
      ...prev,
      zoomLevel: Math.max(prev.zoomLevel - 1, 1)
    }));
  };

  const handleCurrentLocation = () => {
    // This would center map on user's current location
    console.log('Centering on current location');
  };

  const MapContainer = () => (
    <div 
      ref={mapRef}
      className="w-full h-full rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
    >
      {/* Mock Map Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <React.Fragment key={i}>
              <div 
                className="absolute w-full h-px bg-gray-400"
                style={{ top: `${(i + 1) * 5}%` }}
              />
              <div 
                className="absolute h-full w-px bg-gray-400"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Plot Markers */}
        {filteredPlots.map((plot, index) => (
          <Tooltip key={plot.id} title={`Plot ${plot.plotNumber} - ${plot.owner}`}>
            <div
              className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 ${
                plot.status === 'available' ? 'bg-green-500 border-green-700' :
                plot.status === 'sold' ? 'bg-red-500 border-red-700' :
                'bg-orange-500 border-orange-700'
              } ${selectedPlot?.id === plot.id ? 'ring-4 ring-blue-400 scale-150' : ''}`}
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 10) % 40}%`
              }}
              onClick={() => handlePlotClick(plot)}
            >
              <div className="text-white text-xs font-bold flex items-center justify-center h-full">
                {plot.plotNumber.split('-')[1]}
              </div>
            </div>
          </Tooltip>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
          <Text strong className="block mb-2">Legend</Text>
          <Space direction="vertical" size="small">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <Text className="text-xs">Available</Text>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <Text className="text-xs">Sold</Text>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <Text className="text-xs">Reserved</Text>
            </div>
          </Space>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Tooltip title="Zoom In">
            <Button 
              icon={<ZoomInOutlined />} 
              size="small" 
              onClick={handleZoomIn}
              className="bg-white shadow"
            />
          </Tooltip>
          <Tooltip title="Zoom Out">
            <Button 
              icon={<ZoomOutOutlined />} 
              size="small" 
              onClick={handleZoomOut}
              className="bg-white shadow"
            />
          </Tooltip>
          <Tooltip title="My Location">
            <Button 
              icon={<MyLocationOutlined />} 
              size="small" 
              onClick={handleCurrentLocation}
              className="bg-white shadow"
            />
          </Tooltip>
          <Tooltip title="Map Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small" 
              onClick={() => setShowSettings(true)}
              className="bg-white shadow"
            />
          </Tooltip>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow border">
          <Text className="text-sm">Zoom: {mapSettings.zoomLevel}</Text>
        </div>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <Spin size="large" tip="Loading Map..." />
        </div>
      )}
    </div>
  );

  const PlotDetails = () => {
    if (!selectedPlot) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <EnvironmentOutlined className="text-4xl mb-4 text-gray-300" />
            <Text>Select a plot to view details</Text>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Title level={4} className="!mb-1">
              Plot {selectedPlot.plotNumber}
            </Title>
            <Text type="secondary">{selectedPlot.description}</Text>
          </div>
          <Badge 
            status={
              selectedPlot.status === 'available' ? 'success' :
              selectedPlot.status === 'sold' ? 'error' : 'warning'
            } 
            text={selectedPlot.status.toUpperCase()}
          />
        </div>

        <Divider className="!my-4" />

        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex justify-between">
            <Text strong>Type:</Text>
            {getTypeTag(selectedPlot.type)}
          </div>
          <div className="flex justify-between">
            <Text strong>Area:</Text>
            <Text>{selectedPlot.area}</Text>
          </div>
          <div className="flex justify-between">
            <Text strong>Price:</Text>
            <Text className="text-green-600 font-semibold">{selectedPlot.price}</Text>
          </div>
          <div className="flex justify-between">
            <Text strong>Owner:</Text>
            <Text>{selectedPlot.owner}</Text>
          </div>
          <div className="flex justify-between">
            <Text strong>Category:</Text>
            <Tag color={selectedPlot.category === 'premium' ? 'gold' : 'blue'}>
              {selectedPlot.category.toUpperCase()}
            </Tag>
          </div>
        </Space>

        <Divider className="!my-4" />

        <Space direction="vertical" size="small" className="w-full">
          <Text strong>Coordinates:</Text>
          <Text code>
            {selectedPlot.coordinates.lat.toFixed(4)}, {selectedPlot.coordinates.lng.toFixed(4)}
          </Text>
        </Space>

        <div className="pt-4">
          <Space>
            <Button type="primary" icon={<EyeOutlined />}>
              View Details
            </Button>
            <Button icon={<InfoCircleOutlined />}>
              More Info
            </Button>
          </Space>
        </div>
      </div>
    );
  };

  const MapSettingsModal = () => (
    <Modal
      title="Map Settings"
      open={showSettings}
      onCancel={() => setShowSettings(false)}
      footer={[
        <Button key="cancel" onClick={() => setShowSettings(false)}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={() => setShowSettings(false)}>
          Save Settings
        </Button>,
      ]}
      width={500}
    >
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex justify-between items-center">
          <Text>Show Plot Labels</Text>
          <Switch 
            checked={mapSettings.showLabels} 
            onChange={(checked) => setMapSettings(prev => ({ ...prev, showLabels: checked }))}
          />
        </div>
        <div className="flex justify-between items-center">
          <Text>Show Grid Lines</Text>
          <Switch 
            checked={mapSettings.showGrid} 
            onChange={(checked) => setMapSettings(prev => ({ ...prev, showGrid: checked }))}
          />
        </div>
        <div className="flex justify-between items-center">
          <Text>Show All Plots</Text>
          <Switch 
            checked={mapSettings.showPlots} 
            onChange={(checked) => setMapSettings(prev => ({ ...prev, showPlots: checked }))}
          />
        </div>
        
        <Divider />
        
        <div>
          <Text strong>Zoom Level</Text>
          <Slider
            min={1}
            max={20}
            value={mapSettings.zoomLevel}
            onChange={(value) => setMapSettings(prev => ({ ...prev, zoomLevel: value }))}
          />
        </div>
        
        <div>
          <Text strong>Map Style</Text>
          <Select
            value={mapSettings.mapStyle}
            onChange={(value) => setMapSettings(prev => ({ ...prev, mapStyle: value }))}
            className="w-full mt-2"
          >
            <Option value="standard">Standard</Option>
            <Option value="satellite">Satellite</Option>
            <Option value="terrain">Terrain</Option>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>
        </div>
      </Space>
    </Modal>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading Map Viewer..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title level={2} className="!mb-2">
            <EnvironmentOutlined className="text-green-500 mr-3" />
            Association Map
          </Title>
          <Text className="text-gray-600">
            Interactive map view of all plots and properties
          </Text>
        </div>
        <Space>
          <Button icon={<AppstoreOutlined />}> {/* Changed from LayersOutlined */}
            Layer Manager
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Plot
          </Button>
        </Space>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm border-0">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search plots by number, owner..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Plot Type"
              value={filters.plotType}
              onChange={(value) => handleFilterChange('plotType', value)}
              className="w-full"
              size="large"
            >
              <Option value="all">All Types</Option>
              <Option value="residential">Residential</Option>
              <Option value="commercial">Commercial</Option>
              <Option value="industrial">Industrial</Option>
              <Option value="agricultural">Agricultural</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              className="w-full"
              size="large"
            >
              <Option value="all">All Status</Option>
              <Option value="available">Available</Option>
              <Option value="sold">Sold</Option>
              <Option value="reserved">Reserved</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Category"
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
              className="w-full"
              size="large"
            >
              <Option value="all">All Categories</Option>
              <Option value="premium">Premium</Option>
              <Option value="standard">Standard</Option>
              <Option value="economic">Economic</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button 
              icon={<FilterOutlined />}
              onClick={() => setFilters({ plotType: 'all', status: 'all', category: 'all' })}
              className="w-full"
              size="large"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Stats Alert */}
      <Alert
        message={`Showing ${filteredPlots.length} of ${plots.length} plots`}
        description={`${plots.filter(p => p.status === 'available').length} plots available for purchase`}
        type="info"
        showIcon
        closable
      />

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Map Container */}
        <Col xs={24} lg={16}>
          <Card className="shadow-sm border-0 h-full">
            <div className="h-96 lg:h-[500px]">
              <MapContainer />
            </div>
          </Card>
        </Col>

        {/* Plot Details Sidebar */}
        <Col xs={24} lg={8}>
          <Card 
            title="Plot Details" 
            className="shadow-sm border-0 h-full"
            extra={
              selectedPlot && (
                <Button 
                  type="text" 
                  icon={<EyeInvisibleOutlined />} 
                  onClick={() => setSelectedPlot(null)}
                  size="small"
                >
                  Clear
                </Button>
              )
            }
          >
            <div className="h-96 lg:h-[500px] overflow-y-auto">
              <PlotDetails />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Plots List */}
      <Card title="All Plots" className="shadow-sm border-0">
        <Row gutter={[16, 16]}>
          {filteredPlots.map(plot => (
            <Col xs={24} sm={12} md={8} lg={6} key={plot.id}>
              <Card 
                size="small" 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlot?.id === plot.id ? 'border-blue-500 border-2' : ''
                }`}
                onClick={() => handlePlotClick(plot)}
              >
                <div className="flex justify-between items-start mb-2">
                  <Text strong>Plot {plot.plotNumber}</Text>
                  {getStatusTag(plot.status)}
                </div>
                <Text type="secondary" className="text-xs block mb-2">
                  {plot.area} • {plot.type}
                </Text>
                <Text className="text-green-600 font-semibold block">
                  {plot.price}
                </Text>
                <Text className="text-xs text-gray-500 block mt-1">
                  {plot.owner}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredPlots.length === 0 && (
          <div className="text-center py-8">
            <EnvironmentOutlined className="text-4xl text-gray-300 mb-4" />
            <Text type="secondary">No plots found matching your criteria</Text>
          </div>
        )}
      </Card>

      {/* Settings Modal */}
      <MapSettingsModal />
    </div>
  );
};

export default ViewMap;














