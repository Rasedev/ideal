// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Table,
//   Card,
//   Button,
//   Input,
//   Select,
//   Tag,
//   Space,
//   Modal,
//   Form,
//   message,
//   Popconfirm,
//   Tooltip,
//   DatePicker,
//   Row,
//   Col,
//   Statistic,
//   Divider,
//   Badge,
//   Avatar,
//   Dropdown,
//   Alert,
//   Spin,
//   Descriptions,
// } from "antd";
// import {
//   SearchOutlined,
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   FilterOutlined,
//   ExportOutlined,
//   ImportOutlined,
//   UserAddOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   MoreOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   ReloadOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import {
//   fetchAllMembers,
//   createMember,
//   updateMember,
//   deleteMember,
//   fetchMemberStats,
//   clearError,
//   setFilters,
//   clearFilters,
//   fetchMemberById,
// } from "../../components/slices/memberSlice";

// // Extend dayjs with relativeTime plugin
// dayjs.extend(relativeTime);

// const AllMembers = ({ mode = "view" }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get data from Redux store
//   const {
//     items: members,
//     stats,
//     loading,
//     error,
//     filters: reduxFilters,
//     currentMember,
//   } = useSelector((state) => state.members);

//   // Local State
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [membershipTypeFilter, setMembershipTypeFilter] = useState("all");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [form] = Form.useForm();
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [viewMember, setViewMember] = useState(null);
//   const [batchAction, setBatchAction] = useState("");
//   const [exportLoading, setExportLoading] = useState(false);
//   const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
//   const [memberToDelete, setMemberToDelete] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);

//   // Fetch members data on component mount
//   useEffect(() => {
//     loadMembers();
//   }, []);

//   // Update filtered members when members or filters change
//   useEffect(() => {
//     filterMembers();
//   }, [members, searchText, statusFilter, membershipTypeFilter]);

//   // Refresh member details when view modal opens
// useEffect(() => {
//   if (viewModalVisible && viewMember?._id) {
//     const refreshMemberDetails = async () => {
//       try {
//         setIsLoadingDetails(true);
//         await dispatch(fetchMemberById(viewMember._id)).unwrap();
//       } catch (error) {
//         console.error('Failed to refresh member details:', error);
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     };
    
//     refreshMemberDetails();
//   }
// }, [viewModalVisible, viewMember?._id, dispatch]);

//   const loadMembers = async () => {
//     try {
//       // Fetch members with current filters
//       await dispatch(fetchAllMembers(reduxFilters)).unwrap();

//       // Fetch member stats
//       await dispatch(fetchMemberStats()).unwrap();

//       // Clear any previous errors
//       dispatch(clearError());
//     } catch (error) {
//       console.error("Failed to load members:", error);
//       message.error("Failed to load members");
//     }
//   };

//   // Helper function to safely extract string values
//   const safeString = (value) => {
//     if (!value) return "N/A";

//     if (typeof value === "object") {
//       // Handle country object
//       if (value.name) return value.name;
//       if (value.country) return safeString(value.country);

//       try {
//         return JSON.stringify(value);
//       } catch {
//         return "[Object]";
//       }
//     }

//     return value.toString();
//   };

//   const filterMembers = () => {
//     let filtered = members;

//     // Search filter
//     if (searchText) {
//       const searchLower = searchText.toLowerCase();
//       filtered = filtered.filter((member) => {
//         const searchableFields = [
//           member.firstName,
//           member.lastName,
//           member.email,
//           member.phone,
//           member.membershipId,
//           member._id,
//           member.address,
//           member.city,
//           member.state,
//           safeString(member.country),
//         ].filter(Boolean);

//         return searchableFields.some((field) =>
//           field.toString().toLowerCase().includes(searchLower)
//         );
//       });
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       if (statusFilter === "active") {
//         filtered = filtered.filter((member) => member.isActive === true);
//       } else if (statusFilter === "inactive") {
//         filtered = filtered.filter((member) => member.isActive === false);
//       }
//     }

//     // Membership type filter (role filter)
//     if (membershipTypeFilter !== "all") {
//       filtered = filtered.filter(
//         (member) => member.role === membershipTypeFilter
//       );
//     }

//     setFilteredMembers(filtered);
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//   };

//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//   };

//   const handleMembershipTypeFilter = (value) => {
//     setMembershipTypeFilter(value);
//   };

//   const handleAddMember = () => {
//     navigate("/addmember");
//   };

//   const handleEditMember = (member) => {
//     // Close view modal if it's open
//     if (viewModalVisible) {
//       setViewModalVisible(false);
//     }

//     // Ensure we have the complete member object
//     const memberToEdit = member || getMemberDetails || viewMember;

//     if (!memberToEdit) {
//       message.error("No member data available for editing");
//       return;
//     }

//     setSelectedMember(memberToEdit);

//     // Safely extract form values
//     const formValues = {
//       firstName: memberToEdit.firstName || "",
//       lastName: memberToEdit.lastName || "",
//       email: memberToEdit.email || "",
//       phone: memberToEdit.phone || "",
//       role: memberToEdit.role || "Member",
//       isActive:
//         memberToEdit.isActive !== undefined ? memberToEdit.isActive : true,
//       address: memberToEdit.address || "",
//       membershipId: memberToEdit.membershipId || "",
//       country: safeString(memberToEdit.country),
//       city: memberToEdit.city || "",
//       state: memberToEdit.state || "",
//       postalCode: memberToEdit.postalCode || "",
//     };

//     if (memberToEdit.dateOfBirth) {
//       formValues.dateOfBirth = dayjs(memberToEdit.dateOfBirth);
//     }
//     if (memberToEdit.joinDate) {
//       formValues.joinDate = dayjs(memberToEdit.joinDate);
//     }

//     // Reset form and set values with a small delay to ensure DOM is ready
//     form.resetFields();
//     setTimeout(() => {
//       form.setFieldsValue(formValues);
//       setModalVisible(true);
//     }, 100);
//   };

//   // const handleViewMember = async (member) => {
//   //   try {
//   //     setIsLoadingDetails(true);

//   //     // Always fetch fresh data when viewing
//   //     await dispatch(fetchMemberById(member._id)).unwrap();

//   //     // Set view member from currentMember (fresh data from API)
//   //     setViewMember(member);
//   //     setViewModalVisible(true);
//   //   } catch (error) {
//   //     console.error("Failed to load member details:", error);
//   //     message.error("Failed to load member details");

//   //     // Fallback to local data if API fails
//   //     setViewMember(member);
//   //     setViewModalVisible(true);
//   //   } finally {
//   //     setIsLoadingDetails(false);
//   //   }
//   // };

//   const handleViewMember = async (member) => {
//   try {
//     setIsLoadingDetails(true);
    
//     // Always fetch fresh data when viewing
//     const result = await dispatch(fetchMemberById(member._id)).unwrap();
    
//     // Use the fresh data from the API response
//     setViewMember(result.payload || member);
//     setViewModalVisible(true);
//   } catch (error) {
//     console.error("Failed to load member details:", error);
//     message.error("Failed to load member details");
    
//     // Fallback to local data with a warning
//     setViewMember(member);
//     setViewModalVisible(true);
    
//     // Show warning about stale data
//     message.warning('Showing cached data. Some information may not be up to date.');
//   } finally {
//     setIsLoadingDetails(false);
//   }
// };
//   const handleDeleteMember = async (memberId) => {
//     try {
//       setMemberToDelete(memberId);
//       setDeleteConfirmVisible(true);
//     } catch (error) {
//       message.error("Error preparing delete confirmation");
//     }
//   };

//   const confirmDeleteMember = async () => {
//     if (!memberToDelete) return;

//     try {
//       setIsSubmitting(true);
//       await dispatch(deleteMember(memberToDelete)).unwrap();
//       message.success("Member deleted successfully");

//       // Refresh stats after deletion
//       await dispatch(fetchMemberStats()).unwrap();

//       // Clear selection if deleted member was selected
//       setSelectedRowKeys((keys) =>
//         keys.filter((key) => key !== memberToDelete)
//       );

//       // If the deleted member is being viewed, close the modal
//       if (viewMember && viewMember._id === memberToDelete) {
//         setViewModalVisible(false);
//       }
//     } catch (error) {
//       message.error(
//         "Failed to delete member: " + (error.message || "Unknown error")
//       );
//     } finally {
//       setDeleteConfirmVisible(false);
//       setMemberToDelete(null);
//       setIsSubmitting(false);
//     }
//   };

//   // const handleUpdateMember = async (values) => {
//   //   if (!selectedMember || !selectedMember._id) {
//   //     message.error("No member selected for update");
//   //     return;
//   //   }

//   //   try {
//   //     setIsSubmitting(true);

//   //     const updateData = {
//   //       firstName: values.firstName,
//   //       lastName: values.lastName,
//   //       email: values.email,
//   //       phone: values.phone,
//   //       role: values.role,
//   //       isActive: values.isActive,
//   //       address: values.address,
//   //       membershipId: values.membershipId,
//   //       country: values.country,
//   //       city: values.city,
//   //       state: values.state,
//   //       postalCode: values.postalCode,
//   //     };

//   //     if (values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)) {
//   //       updateData.dateOfBirth = values.dateOfBirth.toISOString();
//   //     }
//   //     if (values.joinDate && dayjs.isDayjs(values.joinDate)) {
//   //       updateData.joinDate = values.joinDate.toISOString();
//   //     }

//   //     // Update member in Redux
//   //     await dispatch(
//   //       updateMember({
//   //         id: selectedMember._id,
//   //         data: updateData,
//   //       })
//   //     ).unwrap();

//   //     message.success("Member updated successfully");

//   //     // IMPORTANT: Force refresh of current member data
//   //     await dispatch(fetchMemberById(selectedMember._id)).unwrap();

//   //     // If view modal was open, update the local state
//   //     if (viewMember && viewMember._id === selectedMember._id) {
//   //       setViewMember((prev) => ({
//   //         ...prev,
//   //         ...updateData,
//   //         updatedAt: new Date().toISOString(),
//   //       }));
//   //     }

//   //     // Close edit modal
//   //     setModalVisible(false);
//   //     setSelectedMember(null);
//   //     form.resetFields();

//   //     // Refresh the entire list
//   //     await loadMembers();

//   //     // If we were editing from view modal, automatically reopen it with updated data
//   //     if (viewModalVisible) {
//   //       // Close first
//   //       setViewModalVisible(false);
//   //       // Reopen with fresh data after a brief delay
//   //       setTimeout(async () => {
//   //         await dispatch(fetchMemberById(selectedMember._id)).unwrap();
//   //         setViewModalVisible(true);
//   //       }, 300);
//   //     }
//   //   } catch (error) {
//   //     message.error(
//   //       "Failed to update member: " + (error.message || "Unknown error")
//   //     );
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleUpdateMember = async (values) => {
//   if (!selectedMember || !selectedMember._id) {
//     message.error("No member selected for update");
//     return;
//   }

//   try {
//     setIsSubmitting(true);

//     const updateData = {
//       firstName: values.firstName,
//       lastName: values.lastName,
//       email: values.email,
//       phone: values.phone,
//       role: values.role,
//       isActive: values.isActive,
//       address: values.address,
//       membershipId: values.membershipId,
//       country: values.country,
//       city: values.city,
//       state: values.state,
//       postalCode: values.postalCode,
//     };

//     if (values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)) {
//       updateData.dateOfBirth = values.dateOfBirth.toISOString();
//     }
//     if (values.joinDate && dayjs.isDayjs(values.joinDate)) {
//       updateData.joinDate = values.joinDate.toISOString();
//     }

//     // Update member in Redux
//     await dispatch(
//       updateMember({
//         id: selectedMember._id,
//         data: updateData,
//       })
//     ).unwrap();

//     message.success("Member updated successfully");

//     // Force refresh of all members data
//     await loadMembers();

//     // Refresh the specific member details if view modal is open
//     if (viewModalVisible && viewMember?._id === selectedMember._id) {
//       try {
//         // Fetch fresh data for this specific member
//         await dispatch(fetchMemberById(selectedMember._id)).unwrap();
//       } catch (error) {
//         console.error('Failed to refresh member details:', error);
//       }
//     }

//     // Close edit modal
//     setModalVisible(false);
//     setSelectedMember(null);
//     form.resetFields();

//     // If we're in view mode, keep the view modal open with updated data
//     if (viewModalVisible) {
//       // Trigger a re-render by updating the viewMember state
//       setViewMember(prev => ({
//         ...prev,
//         ...updateData,
//         updatedAt: new Date().toISOString(),
//       }));
//     }

//   } catch (error) {
//     message.error(
//       "Failed to update member: " + (error.message || "Unknown error")
//     );
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleBatchAction = async (action) => {
//     if (selectedRowKeys.length === 0) {
//       message.warning("Please select members to perform this action");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       switch (action) {
//         case "activate":
//           for (const memberId of selectedRowKeys) {
//             await dispatch(
//               updateMember({
//                 id: memberId,
//                 data: { isActive: true },
//               })
//             ).unwrap();
//           }
//           message.success("Selected members activated successfully");
//           break;

//         case "suspend":
//           for (const memberId of selectedRowKeys) {
//             await dispatch(
//               updateMember({
//                 id: memberId,
//                 data: { isActive: false },
//               })
//             ).unwrap();
//           }
//           message.success("Selected members suspended successfully");
//           break;

//         case "delete":
//           // Ask for confirmation before batch delete
//           Modal.confirm({
//             title: "Delete Selected Members",
//             content: `Are you sure you want to delete ${selectedRowKeys.length} member(s)? This action cannot be undone.`,
//             okText: "Yes, Delete",
//             okType: "danger",
//             cancelText: "Cancel",
//             onOk: async () => {
//               for (const memberId of selectedRowKeys) {
//                 await dispatch(deleteMember(memberId)).unwrap();
//               }
//               message.success("Selected members deleted successfully");
//               setSelectedRowKeys([]);
//               await loadMembers();
//             },
//           });
//           return;

//         case "export":
//           setExportLoading(true);
//           // Implement export functionality
//           setTimeout(() => {
//             message.success("Members exported successfully");
//             setExportLoading(false);
//           }, 1000);
//           break;
//       }

//       // Refresh data after batch actions
//       await loadMembers();

//       // Clear selection
//       setSelectedRowKeys([]);
//     } catch (error) {
//       message.error(
//         `Failed to ${action} members: ${error.message || "Unknown error"}`
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApproveMember = async (memberId) => {
//     try {
//       setIsSubmitting(true);
//       await dispatch(
//         updateMember({
//           id: memberId,
//           data: { isActive: true },
//         })
//       ).unwrap();
//       message.success("Member approved successfully");

//       // Refresh data
//       await loadMembers();
//     } catch (error) {
//       message.error(
//         "Failed to approve member: " + (error.message || "Unknown error")
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusTag = (isActive) => (
//     <Tag color={isActive ? "green" : "red"}>
//       {isActive ? "Active" : "Inactive"}
//     </Tag>
//   );

//   const getRoleTag = (role) => {
//     const roleConfig = {
//       President: { color: "red", label: "President" },
//       VicePresident: { color: "volcano", label: "Vice President" },
//       GeneralSecretary: { color: "orange", label: "General Secretary" },
//       FinanceSecretary: { color: "gold", label: "Finance Secretary" },
//       ExecutiveMember: { color: "purple", label: "Executive" },
//       PlotOwner: { color: "blue", label: "Plot Owner" },
//       Member: { color: "green", label: "Member" },
//       default: { color: "default", label: role || "Unknown" },
//     };

//     const config = roleConfig[role] || roleConfig.default;
//     return <Tag color={config.color}>{config.label}</Tag>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return dayjs(dateString).format("DD MMM YYYY");
//     } catch {
//       return "Invalid Date";
//     }
//   };

//   const formatRelativeTime = (dateString) => {
//     if (!dateString) return "Never";
//     try {
//       return dayjs(dateString).fromNow();
//     } catch {
//       return "N/A";
//     }
//   };

//   const columns = [
//     {
//       title: "Member Info",
//       key: "info",
//       width: 250,
//       render: (_, record) => (
//         <Space>
//           <Avatar
//             size="small"
//             src={record.profilePhoto}
//             icon={<UserAddOutlined />}
//             className="bg-blue-500"
//           >
//             {record.firstName?.charAt(0) || record.email?.charAt(0)}
//           </Avatar>
//           <div>
//             <div className="font-medium">
//               {record.firstName} {record.lastName}
//             </div>
//             <div className="text-xs text-gray-500">
//               ID: {record._id ? record._id.substring(0, 8) + "..." : "No ID"}
//             </div>
//             <div className="text-xs text-gray-500">
//               Membership: {record.membershipId || "N/A"}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: "Contact",
//       key: "contact",
//       width: 200,
//       render: (_, record) => (
//         <div>
//           <div className="flex items-center text-xs">
//             <MailOutlined className="mr-1" />
//             {record.email || "N/A"}
//           </div>
//           {record.phone && (
//             <div className="flex items-center text-xs text-gray-500">
//               <PhoneOutlined className="mr-1" />
//               {record.phone}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//       width: 130,
//       render: getRoleTag,
//     },
//     {
//       title: "Status",
//       dataIndex: "isActive",
//       key: "status",
//       width: 100,
//       render: getStatusTag,
//     },
//     {
//       title: "Joined",
//       dataIndex: "createdAt",
//       key: "joined",
//       width: 120,
//       render: formatDate,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 200,
//       fixed: "right",
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => handleViewMember(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit Member">
//             <Button
//               size="small"
//               icon={<EditOutlined />}
//               type="primary"
//               onClick={() => handleEditMember(record)}
//             />
//           </Tooltip>

//           {!record.isActive && (
//             <Tooltip title="Approve Member">
//               <Button
//                 size="small"
//                 icon={<CheckCircleOutlined />}
//                 type="primary"
//                 onClick={() => handleApproveMember(record._id)}
//               />
//             </Tooltip>
//           )}

//           <Tooltip title="Delete Member">
//             <Popconfirm
//               title="Delete Member"
//               description="Are you sure you want to delete this member?"
//               onConfirm={() => handleDeleteMember(record._id)}
//               okText="Yes"
//               cancelText="No"
//               okType="danger"
//             >
//               <Button danger size="small" icon={<DeleteOutlined />} />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//     selections: [
//       Table.SELECTION_ALL,
//       Table.SELECTION_INVERT,
//       Table.SELECTION_NONE,
//     ],
//   };

//   const batchActions = [
//     {
//       key: "activate",
//       label: "Activate Selected",
//       icon: <CheckCircleOutlined />,
//       onClick: () => handleBatchAction("activate"),
//     },
//     {
//       key: "suspend",
//       label: "Suspend Selected",
//       icon: <CloseCircleOutlined />,
//       onClick: () => handleBatchAction("suspend"),
//     },
//     {
//       key: "delete",
//       label: "Delete Selected",
//       icon: <DeleteOutlined />,
//       onClick: () => handleBatchAction("delete"),
//     },
//     {
//       type: "divider",
//     },
//     {
//       key: "export",
//       label: "Export Selected",
//       icon: <ExportOutlined />,
//       onClick: () => handleBatchAction("export"),
//     },
//   ];

//   // Calculate dynamic stats
//   const calculatedStats = {
//     total: stats?.totalMembers || members.length,
//     active: stats?.activeMembers || members.filter((m) => m.isActive).length,
//     pending: members.filter((m) => !m.isActive).length,
//     premium: members.filter(
//       (m) => m.role === "PlotOwner" || m.role.includes("Secretary")
//     ).length,
//     basic: members.filter((m) => m.role === "Member").length,
//     executive:
//       stats?.executiveMembers ||
//       members.filter((m) => m.role === "ExecutiveMember").length,
//   };
//   const getMemberDetails = useMemo(() => {
//     if (!viewMember) return null;

//     // If we have currentMember from Redux (fresh API data), use it
//     if (currentMember && currentMember._id === viewMember._id) {
//       return currentMember;
//     }

// // If view modal is open and we have currentMember data, use it
//   if (viewModalVisible && currentMember) {
//     return currentMember;
//   }

//   // Otherwise use the viewMember data
//   return viewMember;
// }, [viewMember, currentMember, viewModalVisible]);

//   return (
//     <div className="space-y-6 px-2 md:px-6 lg:px-3">
//       {/* Error Alert */}
//       {error && (
//         <Alert
//           type="error"
//           message="Error"
//           description={typeof error === "string" ? error : "An error occurred"}
//           showIcon
//           closable
//           onClose={() => dispatch(clearError())}
//           style={{ marginBottom: 16 }}
//         />
//       )}

//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//         <div>
//           <h1 className="text-lg font-bold text-white">
//             Member Management
//           </h1>
//           <p className="text-gray-600">
//             Manage all members of Alamgir Hossain City Welfare Association
//             <span className="ml-2 text-sm">
//               ({calculatedStats.total} total members)
//             </span>
//           </p>
//         </div>

//         <Space>
//           <Tooltip title="Refresh Data">
//             {/* <Button
//               icon={<ReloadOutlined />}
//               onClick={loadMembers}
//               loading={loading}
//             /> */}

           
// <Button
//   key="refresh"
//   icon={<ReloadOutlined />}
//   onClick={async () => {
//     if (viewMember?._id) {
//       try {
//         setIsLoadingDetails(true);
//         await dispatch(fetchMemberById(viewMember._id)).unwrap();
//         message.success('Member details refreshed');
//       } catch (error) {
//         message.error('Failed to refresh details');
//       } finally {
//         setIsLoadingDetails(false);
//       }
//     }
//   }}
//   loading={isLoadingDetails}
// >
//   Refresh
// </Button>
//           </Tooltip>
//           <Button
//             icon={<ImportOutlined />}
//             onClick={() => handleBatchAction("export")}
//             loading={exportLoading || isSubmitting}
//           >
//             Export
//           </Button>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={handleAddMember}
//             loading={isSubmitting}
//           >
//             Add Member
//           </Button>
//         </Space>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]}>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Total Members"
//               value={calculatedStats.total}
//               prefix={<TeamOutlined className="text-blue-500" />}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Active"
//               value={calculatedStats.active}
//               valueStyle={{ color: "#52c41a" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Pending"
//               value={calculatedStats.pending}
//               valueStyle={{ color: "#fa8c16" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Plot Owners/Secretary"
//               value={calculatedStats.premium}
//               valueStyle={{ color: "#faad14" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Regular Members"
//               value={calculatedStats.basic}
//               valueStyle={{ color: "#1890ff" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Executive Members"
//               value={calculatedStats.executive}
//               valueStyle={{ color: "#722ed1" }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters and Search */}
//       <Card className="border-0 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
//             <Input
//               placeholder="Search members by name, email, membership ID..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="w-full sm:w-64"
//               allowClear
//             />

//             <Select
//               placeholder="Status"
//               value={statusFilter}
//               onChange={handleStatusFilter}
//               className="w-full sm:w-32"
//               allowClear
//             >
//               <Select.Option value="all">All Status</Select.Option>
//               <Select.Option value="active">Active</Select.Option>
//               <Select.Option value="inactive">Inactive</Select.Option>
//             </Select>

//             <Select
//               placeholder="Member Type"
//               value={membershipTypeFilter}
//               onChange={handleMembershipTypeFilter}
//               className="w-full sm:w-40"
//               allowClear
//             >
//               <Select.Option value="all">All Types</Select.Option>
//               <Select.Option value="Member">Regular Member</Select.Option>
//               <Select.Option value="PlotOwner">Plot Owner</Select.Option>
//               <Select.Option value="President">President</Select.Option>
//               <Select.Option value="VicePresident">
//                 Vice President
//               </Select.Option>
//               <Select.Option value="GeneralSecretary">
//                 General Secretary
//               </Select.Option>
//               <Select.Option value="FinanceSecretary">
//                 Finance Secretary
//               </Select.Option>
//               <Select.Option value="ExecutiveMember">
//                 Executive Member
//               </Select.Option>
//             </Select>
//           </div>

//           <div className="flex gap-2 w-full lg:w-auto">
//             {selectedRowKeys.length > 0 && (
//               <Dropdown menu={{ items: batchActions }} placement="bottomRight">
//                 <Button icon={<MoreOutlined />}>
//                   Actions ({selectedRowKeys.length})
//                 </Button>
//               </Dropdown>
//             )}

//             <Button
//               icon={<FilterOutlined />}
//               onClick={() => {
//                 setSearchText("");
//                 setStatusFilter("all");
//                 setMembershipTypeFilter("all");
//               }}
//             >
//               Clear Filters
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Members Table */}
//       <Card
//         title={`Members (${filteredMembers.length})`}
//         className="border-0 shadow-sm"
//         extra={
//           <div className="flex items-center gap-2">
//             <Badge count={selectedRowKeys.length} showZero={false} />
//             <span className="text-sm text-gray-500">
//               Showing {filteredMembers.length} of {members.length} members
//             </span>
//           </div>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredMembers}
//           rowSelection={rowSelection}
//           rowKey="_id"
//           loading={loading || isSubmitting}
//           pagination={{
//             total: filteredMembers.length,
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) =>
//               `${range[0]}-${range[1]} of ${total} members`,
//           }}
//           scroll={{ x: 1200 }}
//           locale={{
//             emptyText: loading ? <Spin /> : "No members found",
//           }}
//         />
//       </Card>

//       {/* Edit Member Modal */}
//       <Modal
//         title={selectedMember ? "Edit Member" : "Add New Member"}
//         open={modalVisible}
//         onCancel={() => {
//           setModalVisible(false);
//           setSelectedMember(null);
//           form.resetFields();
//         }}
//         footer={null}
//         width={700}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdateMember}>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[{ required: true, message: "Please enter first name" }]}
//               >
//                 <Input placeholder="Enter first name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={[{ required: true, message: "Please enter last name" }]}
//               >
//                 <Input placeholder="Enter last name" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                   { required: true, message: "Please enter email" },
//                   { type: "email", message: "Please enter a valid email" },
//                 ]}
//               >
//                 <Input placeholder="Enter email address" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="phone" label="Phone Number">
//                 <Input placeholder="Enter phone number" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="membershipId" label="Membership ID">
//                 <Input placeholder="Enter membership ID" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="role"
//                 label="Role"
//                 rules={[{ required: true, message: "Please select role" }]}
//               >
//                 <Select placeholder="Select role">
//                   <Select.Option value="Member">Regular Member</Select.Option>
//                   <Select.Option value="PlotOwner">Plot Owner</Select.Option>
//                   <Select.Option value="President">President</Select.Option>
//                   <Select.Option value="VicePresident">
//                     Vice President
//                   </Select.Option>
//                   <Select.Option value="GeneralSecretary">
//                     General Secretary
//                   </Select.Option>
//                   <Select.Option value="FinanceSecretary">
//                     Finance Secretary
//                   </Select.Option>
//                   <Select.Option value="ExecutiveMember">
//                     Executive Member
//                   </Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="isActive" label="Status" valuePropName="checked">
//                 <div className="flex items-center">
//                   <span className="mr-2">Active</span>
//                   <input
//                     type="checkbox"
//                     checked={form.getFieldValue("isActive")}
//                     onChange={(e) =>
//                       form.setFieldsValue({ isActive: e.target.checked })
//                     }
//                   />
//                 </div>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="dateOfBirth" label="Date of Birth">
//                 <DatePicker className="w-full" format="YYYY-MM-DD" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="country" label="Country">
//                 <Input placeholder="Enter country" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="city" label="City">
//                 <Input placeholder="Enter city" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item name="address" label="Address">
//             <Input.TextArea placeholder="Enter full address" rows={3} />
//           </Form.Item>

//           <Divider />

//           <div className="flex justify-end space-x-3">
//             <Button
//               onClick={() => {
//                 setModalVisible(false);
//                 setSelectedMember(null);
//                 form.resetFields();
//               }}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="primary" htmlType="submit" loading={isSubmitting}>
//               Update Member
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* View Member Details Modal */}
//       <Modal
//         title="Member Details"
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         footer={[
//           <Button
//             key="close"
//             onClick={() => setViewModalVisible(false)}
//             disabled={isSubmitting}
//           >
//             Close
//           </Button>,
//           <Button
//             key="edit"
//             type="primary"
//             onClick={() => {
//               // Close view modal and open edit modal
//               setViewModalVisible(false);
//               setTimeout(() => {
//                 // Use the current member data (which should be fresh from fetchMemberById)
//                 const memberToEdit = currentMember || getMemberDetails;
//                 if (memberToEdit) {
//                   handleEditMember(memberToEdit);
//                 }
//               }, 100);
//             }}
//             loading={isSubmitting || isLoadingDetails}
//           >
//             Edit Member
//           </Button>,
//         ]}
//         width={700}
//       >
//         {isLoadingDetails ? (
//           <div className="text-center py-8">
//             <Spin />
//             <p>Loading member details...</p>
//           </div>
//         ) : getMemberDetails ? (
//           <div className="space-y-6">
//             {/* Profile Header */}
//             <div className="flex items-center space-x-4">
//               <Avatar
//                 size={64}
//                 src={getMemberDetails.profilePhoto}
//                 icon={<UserAddOutlined />}
//                 className="bg-blue-500"
//               >
//                 {getMemberDetails.firstName?.charAt(0)}
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {safeString(getMemberDetails.firstName)}{" "}
//                   {safeString(getMemberDetails.lastName)}
//                 </h3>
//                 <p className="text-gray-600">
//                   ID: {getMemberDetails._id?.substring(0, 12)}...
//                 </p>
//                 <Space className="mt-2">
//                   {getStatusTag(getMemberDetails.isActive)}
//                   {getRoleTag(getMemberDetails.role)}
//                 </Space>
//               </div>
//             </div>

//             <Divider />

//             <Descriptions bordered column={2}>
//               <Descriptions.Item label="Email" span={2}>
//                 {safeString(getMemberDetails.email)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {safeString(getMemberDetails.phone)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Membership ID">
//                 {safeString(getMemberDetails.membershipId)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Date of Birth">
//                 {formatDate(getMemberDetails.dateOfBirth)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Address" span={2}>
//                 {safeString(getMemberDetails.address)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Country">
//                 {safeString(getMemberDetails.country)}
//               </Descriptions.Item>

//               <Descriptions.Item label="City">
//                 {safeString(getMemberDetails.city)}
//               </Descriptions.Item>

//               <Descriptions.Item label="State">
//                 {safeString(getMemberDetails.state)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Postal Code">
//                 {safeString(getMemberDetails.postalCode)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Join Date">
//                 {formatDate(getMemberDetails.createdAt)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Last Updated">
//                 {formatRelativeTime(getMemberDetails.updatedAt)}
//               </Descriptions.Item>

//               {getMemberDetails.description && (
//                 <Descriptions.Item label="Description" span={2}>
//                   {safeString(getMemberDetails.description)}
//                 </Descriptions.Item>
//               )}
//             </Descriptions>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-gray-500">No member details available</p>
//           </div>
//         )}
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         title="Delete Member"
//         open={deleteConfirmVisible}
//         onCancel={() => {
//           setDeleteConfirmVisible(false);
//           setMemberToDelete(null);
//         }}
//         footer={[
//           <Button
//             key="cancel"
//             onClick={() => {
//               setDeleteConfirmVisible(false);
//               setMemberToDelete(null);
//             }}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>,
//           <Button
//             key="delete"
//             type="primary"
//             danger
//             onClick={confirmDeleteMember}
//             loading={isSubmitting}
//           >
//             Delete
//           </Button>,
//         ]}
//       >
//         <div className="flex items-center space-x-3">
//           <ExclamationCircleOutlined
//             style={{ fontSize: 24, color: "#ff4d4f" }}
//           />
//           <div>
//             <p className="font-medium">
//               Are you sure you want to delete this member?
//             </p>
//             <p className="text-gray-600 text-sm mt-1">
//               This action cannot be undone. All member data including profile,
//               membership information, and related records will be permanently
//               deleted.
//             </p>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AllMembers;




import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
  Tooltip,
  DatePicker,
  Row,
  Col,
  Statistic,
  Divider,
  Badge,
  Avatar,
  Dropdown,
  Alert,
  Spin,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  UserAddOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  fetchAllMembers,
  updateMember,
  deleteMember,
  fetchMemberStats,
  clearError,
  fetchMemberById,
} from "../../components/slices/memberSlice";

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const AllMembers = ({ mode = "view" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const {
    items: members,
    stats,
    loading,
    error,
    filters: reduxFilters,
    currentMember,
  } = useSelector((state) => state.members);

  // Local State
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [membershipTypeFilter, setMembershipTypeFilter] = useState("all");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
   const [viewMember, setViewMember] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch members data on component mount
  useEffect(() => {
    loadMembers();
  }, []);

  // Update filtered members when members or filters change
  useEffect(() => {
    filterMembers();
  }, [members, searchText, statusFilter, membershipTypeFilter]);

  // Auto-refresh view modal data when open
  useEffect(() => {
    if (viewModalVisible && viewMember?._id) {
      const refreshMemberDetails = async () => {
        try {
          setIsLoadingDetails(true);
          await dispatch(fetchMemberById(viewMember._id)).unwrap();
        } catch (error) {
          console.error('Failed to refresh member details:', error);
        } finally {
          setIsLoadingDetails(false);
        }
      };
      
      refreshMemberDetails();
    }
  }, [viewModalVisible, viewMember?._id, dispatch]);

  const loadMembers = async () => {
    try {
      await dispatch(fetchAllMembers(reduxFilters)).unwrap();
      await dispatch(fetchMemberStats()).unwrap();
      dispatch(clearError());
    } catch (error) {
      console.error("Failed to load members:", error);
      message.error("Failed to load members");
    }
  };

  const safeString = (value) => {
    if (!value) return "N/A";

    if (typeof value === "object") {
      if (value.name) return value.name;
      if (value.country) return safeString(value.country);
      try {
        return JSON.stringify(value);
      } catch {
        return "[Object]";
      }
    }

    return value.toString();
  };

  const filterMembers = () => {
    let filtered = members;

    // Search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((member) => {
        const searchableFields = [
          member.firstName,
          member.lastName,
          member.email,
          member.phone,
          member.membershipId,
          member._id,
           member.address?.street,
        member.address?.city,
        member.address?.country,
        member.address?.postalCode,
          
        ].filter(Boolean);

        return searchableFields.some((field) =>
          field.toString().toLowerCase().includes(searchLower)
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => 
        statusFilter === "active" ? member.isActive === true : member.isActive === false
      );
    }

    // Membership type filter (role filter)
    if (membershipTypeFilter !== "all") {
      filtered = filtered.filter(
        (member) => member.role === membershipTypeFilter
      );
    }

    setFilteredMembers(filtered);
  };

  const handleAddMember = () => {
    navigate("/addmember");
  };

  const handleEditMember = async (member) => {
    try {
      // Close view modal if open
      if (viewModalVisible) {
        setViewModalVisible(false);
      }

      // Fetch fresh data before editing
      await dispatch(fetchMemberById(member._id)).unwrap();

      // Use the freshly fetched data from Redux
      const freshMember = currentMember || member;
      setSelectedMember(freshMember);

      // Prepare form values
      const formValues = {
        firstName: freshMember.firstName || "",
        lastName: freshMember.lastName || "",
        email: freshMember.email || "",
        phone: freshMember.phone || "",
        role: freshMember.role || "Member",
        isActive: freshMember.isActive !== undefined ? freshMember.isActive : true,
        membershipId: freshMember.membershipId || "",
        // address: freshMember.address || "",
        // country: safeString(freshMember.country),
        // city: freshMember.city || "",
        // state: freshMember.state || "",
        // postalCode: freshMember.postalCode || "",
        address: {
        street: freshMember.address?.street || "",
        city: freshMember.address?.city || "",
        state: freshMember.address?.state || "",
        country: freshMember.address?.country || "",
        postalCode: freshMember.address?.postalCode || "",
      }
      };

      if (freshMember.dateOfBirth) {
        formValues.dateOfBirth = dayjs(freshMember.dateOfBirth);
      }
      if (freshMember.joinDate) {
        formValues.joinDate = dayjs(freshMember.joinDate);
      }

      // Reset form and set values
      form.resetFields();
      setTimeout(() => {
        form.setFieldsValue(formValues);
        setModalVisible(true);
      }, 100);
    } catch (error) {
      console.error('Failed to fetch member data for editing:', error);
      message.error('Failed to load member data for editing');
    }
  };

  const handleViewMember = async (member) => {
    try {
      setIsLoadingDetails(true);
      await dispatch(fetchMemberById(member._id)).unwrap();
      setViewMember(member);
      setViewModalVisible(true);
    } catch (error) {
      console.error("Failed to load member details:", error);
      message.error("Failed to load member details");
      setViewMember(member);
      setViewModalVisible(true);
    } finally {
      setIsLoadingDetails(false);
    }
  };



  const handleDeleteMember = async (memberId) => {
    try {
      setMemberToDelete(memberId);
      setDeleteConfirmVisible(true);
    } catch (error) {
      message.error("Error preparing delete confirmation");
    }
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete) return;

    try {
      setIsSubmitting(true);
      await dispatch(deleteMember(memberToDelete)).unwrap();
      message.success("Member deleted successfully");

      await dispatch(fetchMemberStats()).unwrap();

      setSelectedRowKeys((keys) =>
        keys.filter((key) => key !== memberToDelete)
      );

      if (viewMember && viewMember._id === memberToDelete) {
        setViewModalVisible(false);
      }
    } catch (error) {
      message.error(
        "Failed to delete member: " + (error.message || "Unknown error")
      );
    } finally {
      setDeleteConfirmVisible(false);
      setMemberToDelete(null);
      setIsSubmitting(false);
    }
  };

  const handleUpdateMember = async (values) => {
    if (!selectedMember || !selectedMember._id) {
      message.error("No member selected for update");
      return;
    }

    try {
      setIsSubmitting(true);

      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
        isActive: values.isActive,
        membershipId: values.membershipId,
        // address: values.address,
        // country: values.country,
        // city: values.city,
        // state: values.state,
        // postalCode: values.postalCode,
        address: {
        street: values.address?.street || "",
        city: values.address?.city || "",
        state: values.address?.state || "",
        country: values.address?.country || "",
        postalCode: values.address?.postalCode || "",
      }
      };

      if (values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)) {
        updateData.dateOfBirth = values.dateOfBirth.toISOString();
      }
      if (values.joinDate && dayjs.isDayjs(values.joinDate)) {
        updateData.joinDate = values.joinDate.toISOString();
      }

      // Update member in Redux
      await dispatch(
        updateMember({
          id: selectedMember._id,
          data: updateData,
        })
      ).unwrap();

      message.success("Member updated successfully");

      // Force refresh of all data
      await loadMembers();

      // Refresh the specific member details if view modal is open
      if (viewModalVisible && viewMember?._id === selectedMember._id) {
        await dispatch(fetchMemberById(selectedMember._id)).unwrap();
      }

      // Close edit modal
      setModalVisible(false);
      setSelectedMember(null);
      form.resetFields();

    } catch (error) {
      message.error(
        "Failed to update member: " + (error.message || "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBatchAction = async (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select members to perform this action");
      return;
    }

    try {
      setIsSubmitting(true);

      switch (action) {
        case "activate":
          for (const memberId of selectedRowKeys) {
            await dispatch(
              updateMember({
                id: memberId,
                data: { isActive: true },
              })
            ).unwrap();
          }
          message.success("Selected members activated successfully");
          break;

        case "suspend":
          for (const memberId of selectedRowKeys) {
            await dispatch(
              updateMember({
                id: memberId,
                data: { isActive: false },
              })
            ).unwrap();
          }
          message.success("Selected members suspended successfully");
          break;

        case "delete":
          Modal.confirm({
            title: "Delete Selected Members",
            content: `Are you sure you want to delete ${selectedRowKeys.length} member(s)? This action cannot be undone.`,
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
              for (const memberId of selectedRowKeys) {
                await dispatch(deleteMember(memberId)).unwrap();
              }
              message.success("Selected members deleted successfully");
              setSelectedRowKeys([]);
              await loadMembers();
            },
          });
          return;

        case "export":
          setExportLoading(true);
          setTimeout(() => {
            message.success("Members exported successfully");
            setExportLoading(false);
          }, 1000);
          break;
      }

      await loadMembers();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error(
        `Failed to ${action} members: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveMember = async (memberId) => {
    try {
      setIsSubmitting(true);
      await dispatch(
        updateMember({
          id: memberId,
          data: { isActive: true },
        })
      ).unwrap();
      message.success("Member approved successfully");
      await loadMembers();
    } catch (error) {
      message.error(
        "Failed to approve member: " + (error.message || "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusTag = (isActive) => (
    <Tag color={isActive ? "green" : "red"}>
      {isActive ? "Active" : "Inactive"}
    </Tag>
  );

  const getRoleTag = (role) => {
    const roleConfig = {
      President: { color: "red", label: "President" },
      VicePresident: { color: "volcano", label: "Vice President" },
      GeneralSecretary: { color: "orange", label: "General Secretary" },
      FinanceSecretary: { color: "gold", label: "Finance Secretary" },
      ExecutiveMember: { color: "purple", label: "Executive" },
      PlotOwner: { color: "blue", label: "Plot Owner" },
      Member: { color: "green", label: "Member" },
      default: { color: "default", label: role || "Unknown" },
    };

    const config = roleConfig[role] || roleConfig.default;
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format("DD MMM YYYY");
    } catch {
      return "Invalid Date";
    }
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "Never";
    try {
      return dayjs(dateString).fromNow();
    } catch {
      return "N/A";
    }
  };

  const columns = [
    {
      title: "Member Info",
      key: "info",
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar
            size="small"
            src={record.profilePhoto}
            icon={<UserAddOutlined />}
            className="bg-blue-500"
          >
            {record.firstName?.charAt(0) || record.email?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-xs text-gray-500">
              ID: {record._id ? record._id.substring(0, 8) + "..." : "No ID"}
            </div>
            <div className="text-xs text-gray-500">
              Membership: {record.membershipId || "N/A"}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      width: 200,
      render: (_, record) => (
        <div>
          <div className="flex items-center text-xs">
            <MailOutlined className="mr-1" />
            {record.email || "N/A"}
          </div>
          {record.phone && (
            <div className="flex items-center text-xs text-gray-500">
              <PhoneOutlined className="mr-1" />
              {record.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 130,
      render: getRoleTag,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 100,
      render: getStatusTag,
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "joined",
      width: 120,
      render: formatDate,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewMember(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Member">
            <Button
              size="small"
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleEditMember(record)}
            />
          </Tooltip>

          {!record.isActive && (
            <Tooltip title="Approve Member">
              <Button
                size="small"
                icon={<CheckCircleOutlined />}
                type="primary"
                onClick={() => handleApproveMember(record._id)}
              />
            </Tooltip>
          )}

          <Tooltip title="Delete Member">
            <Popconfirm
              title="Delete Member"
              description="Are you sure you want to delete this member?"
              onConfirm={() => handleDeleteMember(record._id)}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <Button danger size="small" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const batchActions = [
    {
      key: "activate",
      label: "Activate Selected",
      icon: <CheckCircleOutlined />,
      onClick: () => handleBatchAction("activate"),
    },
    {
      key: "suspend",
      label: "Suspend Selected",
      icon: <CloseCircleOutlined />,
      onClick: () => handleBatchAction("suspend"),
    },
    {
      key: "delete",
      label: "Delete Selected",
      icon: <DeleteOutlined />,
      onClick: () => handleBatchAction("delete"),
    },
    {
      type: "divider",
    },
    {
      key: "export",
      label: "Export Selected",
      icon: <ExportOutlined />,
      onClick: () => handleBatchAction("export"),
    },
  ];

  // Calculate dynamic stats
  const calculatedStats = {
    total: stats?.totalMembers || members.length,
    active: stats?.activeMembers || members.filter((m) => m.isActive).length,
    pending: members.filter((m) => !m.isActive).length,
    premium: members.filter(
      (m) => m.role === "PlotOwner" || m.role.includes("Secretary")
    ).length,
    basic: members.filter((m) => m.role === "Member").length,
    executive:
      stats?.executiveMembers ||
      members.filter((m) => m.role === "ExecutiveMember").length,
  };

  const getMemberDetails = useMemo(() => {
    if (!viewMember) return null;

    // Always use currentMember from Redux (fresh API data) when available
    if (currentMember && currentMember._id === viewMember._id) {
      return currentMember;
    }

    // Fallback to viewMember data
    return viewMember;
  }, [viewMember, currentMember]);

  return (
    <div className="space-y-6 px-2 md:px-6 lg:px-3">
      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          message="Error"
          description={typeof error === "string" ? error : "An error occurred"}
          showIcon
          closable
          onClose={() => dispatch(clearError())}
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white">
            Member Management
          </h1>
          <p className="text-gray-600">
            Manage all members of Alamgir Hossain City Welfare Association
            <span className="ml-2 text-sm">
              ({calculatedStats.total} total members)
            </span>
          </p>
        </div>

        <Space>
          <Tooltip title="Refresh Data">
            <Button
              icon={<ReloadOutlined />}
              onClick={loadMembers}
              loading={loading}
            />
          </Tooltip>
          <Button
            icon={<ImportOutlined />}
            onClick={() => handleBatchAction("export")}
            loading={exportLoading || isSubmitting}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddMember}
            loading={isSubmitting}
          >
            Add Member
          </Button>
        </Space>
      </div>

      {/* Statistics Cards with Reduced Padding */}
      <Row gutter={[12, 12]}>
        {[
          { title: "Total Members", value: calculatedStats.total, icon: <TeamOutlined className="text-blue-500" /> },
          { title: "Active", value: calculatedStats.active, color: "#52c41a" },
          { title: "Pending", value: calculatedStats.pending, color: "#fa8c16" },
          { title: "Plot Owners/Secretary", value: calculatedStats.premium, color: "#faad14" },
          { title: "Regular Members", value: calculatedStats.basic, color: "#1890ff" },
          { title: "Executive Members", value: calculatedStats.executive, color: "#722ed1" },
        ].map((stat, index) => (
          <Col key={index} xs={12} sm={8} md={4}>
            <Card 
              className="text-center border-0 shadow-sm"
              bodyStyle={{ padding: '10px' }} 
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            <Input
              placeholder="Search members by name, email, membership ID..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-64"
              allowClear
            />

            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-32"
              allowClear
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>

            <Select
              placeholder="Member Type"
              value={membershipTypeFilter}
              onChange={setMembershipTypeFilter}
              className="w-full sm:w-40"
              allowClear
            >
              <Select.Option value="all">All Types</Select.Option>
              <Select.Option value="Member">Regular Member</Select.Option>
              <Select.Option value="PlotOwner">Plot Owner</Select.Option>
              <Select.Option value="President">President</Select.Option>
              <Select.Option value="VicePresident">
                Vice President
              </Select.Option>
              <Select.Option value="GeneralSecretary">
                General Secretary
              </Select.Option>
              <Select.Option value="FinanceSecretary">
                Finance Secretary
              </Select.Option>
              <Select.Option value="ExecutiveMember">
                Executive Member
              </Select.Option>
            </Select>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            {selectedRowKeys.length > 0 && (
              <Dropdown menu={{ items: batchActions }} placement="bottomRight">
                <Button icon={<MoreOutlined />}>
                  Actions ({selectedRowKeys.length})
                </Button>
              </Dropdown>
            )}

            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
                setMembershipTypeFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card
        title={`Members (${filteredMembers.length})`}
        className="border-0 shadow-sm"
        extra={
          <div className="flex items-center gap-2">
            <Badge count={selectedRowKeys.length} showZero={false} />
            <span className="text-sm text-gray-500">
              Showing {filteredMembers.length} of {members.length} members
            </span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowSelection={rowSelection}
          rowKey="_id"
          loading={loading || isSubmitting}
          pagination={{
            total: filteredMembers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} members`,
          }}
          scroll={{ x: 1200 }}
          locale={{
            emptyText: loading ? <Spin /> : "No members found",
          }}
        />
      </Card>

      {/* Edit Member Modal */}
      <Modal
        title={selectedMember ? "Edit Member" : "Add New Member"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedMember(null);
          form.resetFields();
        }}
        footer={null}
        width={700}
      
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateMember}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="membershipId" label="Membership ID">
                <Input placeholder="Enter membership ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select placeholder="Select role">
                  <Select.Option value="Member">Regular Member</Select.Option>
                  <Select.Option value="PlotOwner">Plot Owner</Select.Option>
                  <Select.Option value="President">President</Select.Option>
                  <Select.Option value="VicePresident">
                    Vice President
                  </Select.Option>
                  <Select.Option value="GeneralSecretary">
                    General Secretary
                  </Select.Option>
                  <Select.Option value="FinanceSecretary">
                    Finance Secretary
                  </Select.Option>
                  <Select.Option value="ExecutiveMember">
                    Executive Member
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="isActive" label="Status" valuePropName="checked">
                <div className="flex items-center">
                  <span className="mr-2">Active</span>
                  <input
                    type="checkbox"
                    checked={form.getFieldValue("isActive")}
                    onChange={(e) =>
                      form.setFieldsValue({ isActive: e.target.checked })
                    }
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item  name={["address", "country"]} label="Country">
                <Input placeholder="Enter country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
        name={["address", "city"]} 
        label="City"
      >
        <Input placeholder="Enter city" />
      </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
    <Col span={12}>
      <Form.Item 
        name={["address", "state"]} 
        label="State/Province"
      >
        <Input placeholder="Enter state/province" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item 
        name={["address", "postalCode"]} 
        label="Postal Code"
      >
        <Input placeholder="Enter postal code" />
      </Form.Item>
    </Col>
  </Row>

  <Form.Item 
    name={["address", "street"]} 
    label="Street Address"
  >
    <Input.TextArea placeholder="Enter street address" rows={3} />
  </Form.Item>

          {/* <Form.Item name="address" label="Address">
            <Input.TextArea placeholder="Enter full address" rows={3} />
          </Form.Item> */}

          <Divider />

          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => {
                setModalVisible(false);
                setSelectedMember(null);
                form.resetFields();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Update Member
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Member Details Modal */}
      <Modal
        title="Member Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button
            key="refresh"
            icon={<ReloadOutlined />}
            onClick={async () => {
              if (viewMember?._id) {
                try {
                  setIsLoadingDetails(true);
                  await dispatch(fetchMemberById(viewMember._id)).unwrap();
                  message.success('Member details refreshed');
                } catch (error) {
                  message.error('Failed to refresh details');
                } finally {
                  setIsLoadingDetails(false);
                }
              }
            }}
            loading={isLoadingDetails}
          >
            Refresh
          </Button>,
          <Button
            key="close"
            onClick={() => setViewModalVisible(false)}
            disabled={isSubmitting}
          >
            Close
          </Button>,
          // <Button
          //   key="edit"
          //   type="primary"
          //   onClick={() => {
          //     setViewModalVisible(false);
          //     setTimeout(() => {
          //       const memberToEdit = currentMember || getMemberDetails;
          //       if (memberToEdit) {
          //         handleEditMember(memberToEdit);
          //       }
          //     }, 100);
          //   }}
          //   loading={isSubmitting || isLoadingDetails}
          // >
          //   Edit Member
          // </Button>
          <Button
  type="primary"
  onClick={() => {
    setViewModalVisible(false);
    setTimeout(() => {
      handleEditMember(currentMember);
    }, 100);
  }}
>
  Edit Member
</Button>

          ,
        ]}
        width={700}
      >
        {isLoadingDetails ? (
          <div className="text-center py-8">
            <Spin />
            <p>Loading member details...</p>
          </div>
        ) : getMemberDetails ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <Avatar
                size={64}
                src={getMemberDetails.profilePhoto}
                icon={<UserAddOutlined />}
                className="bg-blue-500"
              >
                {getMemberDetails.firstName?.charAt(0)}
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {safeString(getMemberDetails.firstName)}{" "}
                  {safeString(getMemberDetails.lastName)}
                </h3>
                <p className="text-gray-600">
                  ID: {getMemberDetails._id?.substring(0, 12)}...
                </p>
                <Space className="mt-2">
                  {getStatusTag(getMemberDetails.isActive)}
                  {getRoleTag(getMemberDetails.role)}
                </Space>
              </div>
            </div>

            <Divider />

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Email" span={2}>
                {safeString(getMemberDetails.email)}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {safeString(getMemberDetails.phone)}
              </Descriptions.Item>
              <Descriptions.Item label="Membership ID">
                {safeString(getMemberDetails.membershipId)}
              </Descriptions.Item>

              <Descriptions.Item label="Date of Birth">
                {formatDate(getMemberDetails.dateOfBirth)}
              </Descriptions.Item>

              <Descriptions.Item label="Address" span={2}>
                {safeString(getMemberDetails.address)}
              </Descriptions.Item>

              <Descriptions.Item label="Country">
  {safeString(getMemberDetails?.address?.country)}
</Descriptions.Item>

              <Descriptions.Item label="City">
  {safeString(getMemberDetails?.address?.city)}
</Descriptions.Item>

          <Descriptions.Item label="Street Address" span={2}>
  {safeString(getMemberDetails?.address?.street)}
</Descriptions.Item>

              <Descriptions.Item label="Postal Code">
  {safeString(getMemberDetails?.address?.postalCode)}
</Descriptions.Item>

              <Descriptions.Item label="Join Date">
                {formatDate(getMemberDetails.createdAt)}
              </Descriptions.Item>

              <Descriptions.Item label="Last Updated">
                {formatRelativeTime(getMemberDetails.updatedAt)}
              </Descriptions.Item>

              {getMemberDetails.description && (
                <Descriptions.Item label="Description" span={2}>
                  {safeString(getMemberDetails.description)}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No member details available</p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Member"
        open={deleteConfirmVisible}
        onCancel={() => {
          setDeleteConfirmVisible(false);
          setMemberToDelete(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setDeleteConfirmVisible(false);
              setMemberToDelete(null);
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={confirmDeleteMember}
            loading={isSubmitting}
          >
            Delete
          </Button>,
        ]}
      >
        <div className="flex items-center space-x-3">
          <ExclamationCircleOutlined
            style={{ fontSize: 24, color: "#ff4d4f" }}
          />
          <div>
            <p className="font-medium">
              Are you sure you want to delete this member?
            </p>
            <p className="text-gray-600 text-sm mt-1">
              This action cannot be undone. All member data including profile,
              membership information, and related records will be permanently
              deleted.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllMembers;








///////////////////////latest Final///////////////////////////

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Table,
//   Card,
//   Button,
//   Input,
//   Select,
//   Tag,
//   Space,
//   Modal,
//   Form,
//   message,
//   Popconfirm,
//   Tooltip,
//   DatePicker,
//   Row,
//   Col,
//   Statistic,
//   Divider,
//   Badge,
//   Avatar,
//   Dropdown,
//   Alert,
//   Spin
// } from 'antd';
// import {
//   SearchOutlined,
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   FilterOutlined,
//   ExportOutlined,
//   ImportOutlined,
//   UserAddOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   MoreOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   ReloadOutlined,
//   ExclamationCircleOutlined
// } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import {
//   fetchAllMembers,
//   createMember,
//   updateMember,
//   deleteMember,
//   fetchMemberStats,
//   clearError,
//   setFilters,
//   clearFilters
// } from '../../components/slices/memberSlice';

// // Extend dayjs with relativeTime plugin
// dayjs.extend(relativeTime);

// const AllMembers = ({ mode = 'view' }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get data from Redux store
//   const {
//     items: members,
//     stats,
//     loading,
//     error,
//     filters: reduxFilters
//   } = useSelector((state) => state.members);

//   // Local State
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [membershipTypeFilter, setMembershipTypeFilter] = useState('all');
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [form] = Form.useForm();
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [viewMember, setViewMember] = useState(null);
//   const [batchAction, setBatchAction] = useState('');
//   const [exportLoading, setExportLoading] = useState(false);
//   const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
//   const [memberToDelete, setMemberToDelete] = useState(null);

//   // Fetch members data on component mount
//   useEffect(() => {
//     loadMembers();
//   }, []);

//   // Update filtered members when members or filters change
//   useEffect(() => {
//     filterMembers();
//   }, [members, searchText, statusFilter, membershipTypeFilter]);

//   const loadMembers = async () => {
//     try {
//       // Fetch members with current filters
//       await dispatch(fetchAllMembers(reduxFilters)).unwrap();

//       // Fetch member stats
//       await dispatch(fetchMemberStats()).unwrap();

//       // Clear any previous errors
//       dispatch(clearError());
//     } catch (error) {
//       console.error('Failed to load members:', error);
//     }
//   };

//   const filterMembers = () => {
//     let filtered = members;

//     // Search filter
//     if (searchText) {
//       const searchLower = searchText.toLowerCase();
//       filtered = filtered.filter(member => {
//         const searchableFields = [
//           member.firstName,
//           member.lastName,
//           member.email,
//           member.phone,
//           member.membershipId,
//           member._id,
//           member.address,
//           member.city,
//           member.state,
//           member.country?.name || member.country
//         ].filter(Boolean);

//         return searchableFields.some(field =>
//           field.toString().toLowerCase().includes(searchLower)
//         );
//       });
//     }

//     // Status filter
//     if (statusFilter !== 'all') {
//       if (statusFilter === 'active') {
//         filtered = filtered.filter(member => member.isActive === true);
//       } else if (statusFilter === 'inactive') {
//         filtered = filtered.filter(member => member.isActive === false);
//       }
//     }

//     // Membership type filter (role filter)
//     if (membershipTypeFilter !== 'all') {
//       filtered = filtered.filter(member => member.role === membershipTypeFilter);
//     }

//     setFilteredMembers(filtered);
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//   };

//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//   };

//   const handleMembershipTypeFilter = (value) => {
//     setMembershipTypeFilter(value);
//   };

//   const handleAddMember = () => {
//     // Navigate to the dedicated AddMember page
//     navigate('/addmember');
//   };

//   const handleEditMember = (member) => {
//     // Navigate to edit page or open edit modal
//     setSelectedMember(member);
//     form.setFieldsValue({
//       firstName: member.firstName,
//       lastName: member.lastName,
//       email: member.email,
//       phone: member.phone,
//       role: member.role,
//       isActive: member.isActive,
//       address: member.address,
//       membershipId: member.membershipId,
//       country: member.country?.name || member.country,
//       city: member.city,
//       state: member.state,
//       postalCode: member.postalCode,
//       dateOfBirth: member.dateOfBirth ? dayjs(member.dateOfBirth) : null,
//       joinDate: member.joinDate ? dayjs(member.joinDate) : null
//     });
//     setModalVisible(true);
//   };

//   const handleViewMember = (member) => {
//     setViewMember(member);
//     setViewModalVisible(true);
//   };

//   const handleDeleteMember = async (memberId) => {
//     try {
//       setMemberToDelete(memberId);
//       setDeleteConfirmVisible(true);
//     } catch (error) {
//       message.error('Error preparing delete confirmation');
//     }
//   };

//   const confirmDeleteMember = async () => {
//     if (!memberToDelete) return;

//     try {
//       await dispatch(deleteMember(memberToDelete)).unwrap();
//       message.success('Member deleted successfully');

//       // Refresh stats after deletion
//       await dispatch(fetchMemberStats()).unwrap();

//       // Clear selection if deleted member was selected
//       setSelectedRowKeys(keys => keys.filter(key => key !== memberToDelete));

//     } catch (error) {
//       message.error('Failed to delete member: ' + (error.message || 'Unknown error'));
//     } finally {
//       setDeleteConfirmVisible(false);
//       setMemberToDelete(null);
//     }
//   };

//   const handleUpdateMember = async (values) => {
//     if (!selectedMember || !selectedMember._id) {
//       message.error('No member selected for update');
//       return;
//     }

//     try {
//       const updateData = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         phone: values.phone,
//         role: values.role,
//         isActive: values.isActive,
//         address: values.address,
//         membershipId: values.membershipId,
//         country: values.country,
//         city: values.city,
//         state: values.state,
//         postalCode: values.postalCode,
//       };

//       if (values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)) {
//         updateData.dateOfBirth = values.dateOfBirth.toISOString();
//       }
//       if (values.joinDate && dayjs.isDayjs(values.joinDate)) {
//         updateData.joinDate = values.joinDate.toISOString();
//       }

//       await dispatch(updateMember({
//         id: selectedMember._id,
//         data: updateData
//       })).unwrap();

//       message.success('Member updated successfully');
//       setModalVisible(false);
//       setSelectedMember(null);
//       form.resetFields();

//     } catch (error) {
//       message.error('Failed to update member: ' + (error.message || 'Unknown error'));
//     }
//   };

//   const handleBatchAction = async (action) => {
//     if (selectedRowKeys.length === 0) {
//       message.warning('Please select members to perform this action');
//       return;
//     }

//     try {
//       switch (action) {
//         case 'activate':
//           // Activate selected members
//           for (const memberId of selectedRowKeys) {
//             await dispatch(updateMember({
//               id: memberId,
//               data: { isActive: true }
//             })).unwrap();
//           }
//           message.success('Selected members activated successfully');
//           break;

//         case 'suspend':
//           // Suspend selected members
//           for (const memberId of selectedRowKeys) {
//             await dispatch(updateMember({
//               id: memberId,
//               data: { isActive: false }
//             })).unwrap();
//           }
//           message.success('Selected members suspended successfully');
//           break;

//         case 'delete':
//           // Delete selected members
//           for (const memberId of selectedRowKeys) {
//             await dispatch(deleteMember(memberId)).unwrap();
//           }
//           message.success('Selected members deleted successfully');
//           break;

//         case 'export':
//           setExportLoading(true);
//           // Implement export functionality
//           setTimeout(() => {
//             message.success('Members exported successfully');
//             setExportLoading(false);
//           }, 1000);
//           break;
//       }

//       // Refresh data after batch actions
//       await dispatch(fetchAllMembers(reduxFilters)).unwrap();
//       await dispatch(fetchMemberStats()).unwrap();

//       // Clear selection
//       setSelectedRowKeys([]);

//     } catch (error) {
//       message.error(`Failed to ${action} members: ${error.message || 'Unknown error'}`);
//     }
//   };

//   const handleApproveMember = async (memberId) => {
//     try {
//       await dispatch(updateMember({
//         id: memberId,
//         data: { isActive: true }
//       })).unwrap();
//       message.success('Member approved successfully');

//       // Refresh data
//       await dispatch(fetchAllMembers(reduxFilters)).unwrap();
//       await dispatch(fetchMemberStats()).unwrap();

//     } catch (error) {
//       message.error('Failed to approve member: ' + (error.message || 'Unknown error'));
//     }
//   };

//   const handleRejectMember = async (memberId) => {
//     try {
//       await dispatch(deleteMember(memberId)).unwrap();
//       message.success('Member rejected successfully');

//       // Refresh data
//       await dispatch(fetchAllMembers(reduxFilters)).unwrap();
//       await dispatch(fetchMemberStats()).unwrap();

//     } catch (error) {
//       message.error('Failed to reject member: ' + (error.message || 'Unknown error'));
//     }
//   };

//   const getStatusTag = (isActive) => (
//     <Tag color={isActive ? 'green' : 'red'}>
//       {isActive ? 'Active' : 'Inactive'}
//     </Tag>
//   );

//   const getRoleTag = (role) => {
//     const roleConfig = {
//       President: { color: 'red', label: 'President' },
//       VicePresident: { color: 'volcano', label: 'Vice President' },
//       GeneralSecretary: { color: 'orange', label: 'General Secretary' },
//       FinanceSecretary: { color: 'gold', label: 'Finance Secretary' },
//       ExecutiveMember: { color: 'purple', label: 'Executive' },
//       PlotOwner: { color: 'blue', label: 'Plot Owner' },
//       Member: { color: 'green', label: 'Member' },
//       default: { color: 'default', label: role || 'Unknown' },
//     };

//     const config = roleConfig[role] || roleConfig.default;
//     return <Tag color={config.color}>{config.label}</Tag>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return dayjs(dateString).format('DD MMM YYYY');
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const formatRelativeTime = (dateString) => {
//     if (!dateString) return 'Never';
//     try {
//       return dayjs(dateString).fromNow();
//     } catch {
//       return 'N/A';
//     }
//   };

//   const columns = [
//     {
//       title: 'Member Info',
//       key: 'info',
//       width: 250,
//       render: (_, record) => (
//         <Space>
//           <Avatar
//             size="small"
//             src={record.profilePhoto}
//             icon={<UserAddOutlined />}
//             className="bg-blue-500"
//           >
//             {record.firstName?.charAt(0) || record.email?.charAt(0)}
//           </Avatar>
//           <div>
//             <div className="font-medium">{record.firstName} {record.lastName}</div>
//             <div className="text-xs text-gray-500">
//               ID: {record._id ? record._id.substring(0, 8) + '...' : 'No ID'}
//             </div>
//             <div className="text-xs text-gray-500">
//               Membership: {record.membershipId || 'N/A'}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       key: 'contact',
//       width: 200,
//       render: (_, record) => (
//         <div>
//           <div className="flex items-center text-xs">
//             <MailOutlined className="mr-1" />
//             {record.email || 'N/A'}
//           </div>
//           {record.phone && (
//             <div className="flex items-center text-xs text-gray-500">
//               <PhoneOutlined className="mr-1" />
//               {record.phone}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       width: 130,
//       render: getRoleTag,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'isActive',
//       key: 'status',
//       width: 100,
//       render: getStatusTag,
//     },
//     {
//       title: 'Joined',
//       dataIndex: 'createdAt',
//       key: 'joined',
//       width: 120,
//       render: formatDate,
//     },
//     {
//       title: 'Last Updated',
//       dataIndex: 'updatedAt',
//       key: 'updated',
//       width: 120,
//       render: formatRelativeTime,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 300,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => handleViewMember(record)}
//             >

//             </Button>
//           </Tooltip>
//           <Tooltip title="Edit Member">
//             <Button
//               size="small"
//               icon={<EditOutlined />}
//               type="primary"
//               onClick={() => handleEditMember(record)}
//             >

//             </Button>
//           </Tooltip>

//           {!record.isActive && (
//             <Tooltip title="Approve Member">
//               <Button
//                 size="small"
//                 icon={<CheckCircleOutlined />}
//                 type="primary"
//                 onClick={() => handleApproveMember(record._id)}
//               >
//                 Approve
//               </Button>
//             </Tooltip>
//           )}

//           <Tooltip title="Delete Member">
//             <Button
//               danger
//               size="small"
//               icon={<DeleteOutlined />}
//               onClick={() => handleDeleteMember(record._id)}
//             >
//               Delete
//             </Button>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//     selections: [
//       Table.SELECTION_ALL,
//       Table.SELECTION_INVERT,
//       Table.SELECTION_NONE,
//     ],
//   };

//   const batchActions = [
//     {
//       key: 'activate',
//       label: 'Activate Selected',
//       icon: <CheckCircleOutlined />,
//       onClick: () => handleBatchAction('activate')
//     },
//     {
//       key: 'suspend',
//       label: 'Suspend Selected',
//       icon: <CloseCircleOutlined />,
//       onClick: () => handleBatchAction('suspend')
//     },
//     {
//       key: 'delete',
//       label: 'Delete Selected',
//       icon: <DeleteOutlined />,
//       onClick: () => handleBatchAction('delete')
//     },
//     {
//       type: 'divider'
//     },
//     {
//       key: 'export',
//       label: 'Export Selected',
//       icon: <ExportOutlined />,
//       onClick: () => handleBatchAction('export')
//     }
//   ];

//   // Calculate dynamic stats
//   const calculatedStats = {
//     total: stats?.totalMembers || members.length,
//     active: stats?.activeMembers || members.filter(m => m.isActive).length,
//     pending: members.filter(m => !m.isActive).length,
//     premium: members.filter(m => m.role === 'PlotOwner' || m.role.includes('Secretary')).length,
//     basic: members.filter(m => m.role === 'Member').length,
//     executive: stats?.executiveMembers || members.filter(m => m.role === 'ExecutiveMember').length
//   };

//   return (
//     <div className="space-y-6 px-2 md:px-6 lg:px-3">
//       {/* Error Alert */}
//       {error && (
//         <Alert
//           type="error"
//           message="Error"
//           description={error}
//           showIcon
//           closable
//           onClose={() => dispatch(clearError())}
//           style={{ marginBottom: 16 }}
//         />
//       )}

//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
//           <p className="text-gray-600">
//             Manage all members of Alamgir Hossain City Welfare Association
//             <span className="ml-2 text-sm">
//               ({calculatedStats.total} total members)
//             </span>
//           </p>
//         </div>

//         <Space>
//           <Tooltip title="Refresh Data">
//             <Button
//               icon={<ReloadOutlined />}
//               onClick={loadMembers}
//               loading={loading}
//             />
//           </Tooltip>
//           <Button
//             icon={<ImportOutlined />}
//             onClick={() => handleBatchAction('export')}
//             loading={exportLoading}
//           >
//             Export
//           </Button>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={handleAddMember}
//           >
//             Add Member
//           </Button>
//         </Space>
//       </div>

//       {/* Statistics Cards */}
//       <Row gutter={[16, 16]}>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Total Members"
//               value={calculatedStats.total}
//               prefix={<TeamOutlined className="text-blue-500" />}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Active"
//               value={calculatedStats.active}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Pending"
//               value={calculatedStats.pending}
//               valueStyle={{ color: '#fa8c16' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Plot Owners/Secretary"
//               value={calculatedStats.premium}
//               valueStyle={{ color: '#faad14' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Regular Members"
//               value={calculatedStats.basic}
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Card>
//         </Col>
//         <Col xs={12} sm={8} md={4}>
//           <Card className="text-center border-0 shadow-sm">
//             <Statistic
//               title="Executive Members"
//               value={calculatedStats.executive}
//               valueStyle={{ color: '#722ed1' }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters and Search */}
//       <Card className="border-0 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
//             <Input
//               placeholder="Search members by name, email, membership ID..."
//               prefix={<SearchOutlined />}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="w-full sm:w-64"
//               allowClear
//             />

//             <Select
//               placeholder="Status"
//               value={statusFilter}
//               onChange={handleStatusFilter}
//               className="w-full sm:w-32"
//               allowClear
//             >
//               <Select.Option value="all">All Status</Select.Option>
//               <Select.Option value="active">Active</Select.Option>
//               <Select.Option value="inactive">Inactive</Select.Option>
//             </Select>

//             <Select
//               placeholder="Member Type"
//               value={membershipTypeFilter}
//               onChange={handleMembershipTypeFilter}
//               className="w-full sm:w-40"
//               allowClear
//             >
//               <Select.Option value="all">All Types</Select.Option>
//               <Select.Option value="Member">Regular Member</Select.Option>
//               <Select.Option value="PlotOwner">Plot Owner</Select.Option>
//               <Select.Option value="President">President</Select.Option>
//               <Select.Option value="VicePresident">Vice President</Select.Option>
//               <Select.Option value="GeneralSecretary">General Secretary</Select.Option>
//               <Select.Option value="FinanceSecretary">Finance Secretary</Select.Option>
//               <Select.Option value="ExecutiveMember">Executive Member</Select.Option>
//             </Select>
//           </div>

//           <div className="flex gap-2 w-full lg:w-auto">
//             {selectedRowKeys.length > 0 && (
//               <Dropdown
//                 menu={{ items: batchActions }}
//                 placement="bottomRight"
//               >
//                 <Button icon={<MoreOutlined />}>
//                   Actions ({selectedRowKeys.length})
//                 </Button>
//               </Dropdown>
//             )}

//             <Button
//               icon={<FilterOutlined />}
//               onClick={() => {
//                 setSearchText('');
//                 setStatusFilter('all');
//                 setMembershipTypeFilter('all');
//               }}
//             >
//               Clear Filters
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Members Table */}
//       <Card
//         title={`Members (${filteredMembers.length})`}
//         className="border-0 shadow-sm"
//         extra={
//           <div className="flex items-center gap-2">
//             <Badge count={selectedRowKeys.length} showZero={false} />
//             <span className="text-sm text-gray-500">
//               Showing {filteredMembers.length} of {members.length} members
//             </span>
//           </div>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredMembers}
//           rowSelection={rowSelection}
//           rowKey="_id"
//           loading={loading}
//           pagination={{
//             total: filteredMembers.length,
//             pageSize: 10,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             showTotal: (total, range) =>
//               `${range[0]}-${range[1]} of ${total} members`,
//           }}
//           scroll={{ x: 1200 }}
//           locale={{
//             emptyText: loading ? <Spin /> : 'No members found'
//           }}
//         />
//       </Card>

//       {/* Edit Member Modal */}
//       <Modal
//         title={selectedMember ? 'Edit Member' : 'Add New Member'}
//         open={modalVisible}
//         onCancel={() => {
//           setModalVisible(false);
//           setSelectedMember(null);
//           form.resetFields();
//         }}
//         footer={null}
//         width={700}
//         destroyOnClose
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleUpdateMember}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[{ required: true, message: 'Please enter first name' }]}
//               >
//                 <Input placeholder="Enter first name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={[{ required: true, message: 'Please enter last name' }]}
//               >
//                 <Input placeholder="Enter last name" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                   { required: true, message: 'Please enter email' },
//                   { type: 'email', message: 'Please enter a valid email' }
//                 ]}
//               >
//                 <Input placeholder="Enter email address" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="phone"
//                 label="Phone Number"
//               >
//                 <Input placeholder="Enter phone number" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="membershipId"
//                 label="Membership ID"
//               >
//                 <Input placeholder="Enter membership ID" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="role"
//                 label="Role"
//                 rules={[{ required: true, message: 'Please select role' }]}
//               >
//                 <Select placeholder="Select role">
//                   <Select.Option value="Member">Regular Member</Select.Option>
//                   <Select.Option value="PlotOwner">Plot Owner</Select.Option>
//                   <Select.Option value="President">President</Select.Option>
//                   <Select.Option value="VicePresident">Vice President</Select.Option>
//                   <Select.Option value="GeneralSecretary">General Secretary</Select.Option>
//                   <Select.Option value="FinanceSecretary">Finance Secretary</Select.Option>
//                   <Select.Option value="ExecutiveMember">Executive Member</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="isActive"
//                 label="Status"
//                 valuePropName="checked"
//               >
//                 <div>
//                   <span className="mr-2">Active</span>
//                   <input
//                     type="checkbox"
//                     checked={form.getFieldValue('isActive')}
//                     onChange={(e) => form.setFieldsValue({ isActive: e.target.checked })}
//                   />
//                 </div>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="dateOfBirth"
//                 label="Date of Birth"
//               >
//                 <DatePicker className="w-full" format="YYYY-MM-DD" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="country"
//                 label="Country"
//               >
//                 <Input placeholder="Enter country" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="city"
//                 label="City"
//               >
//                 <Input placeholder="Enter city" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="address"
//             label="Address"
//           >
//             <Input.TextArea placeholder="Enter full address" rows={3} />
//           </Form.Item>

//           <Divider />

//           <div className="flex justify-end space-x-3">
//             <Button onClick={() => {
//               setModalVisible(false);
//               setSelectedMember(null);
//               form.resetFields();
//             }}>
//               Cancel
//             </Button>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Update Member
//             </Button>
//           </div>
//         </Form>
//       </Modal>

//       {/* View Member Details Modal */}
//       <Modal
//         title="Member Details"
//         open={viewModalVisible}
//         onCancel={() => setViewModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setViewModalVisible(false)}>
//             Close
//           </Button>,
//           <Button
//             key="edit"
//             type="primary"
//             onClick={() => {
//               setViewModalVisible(false);
//               handleEditMember(viewMember);
//             }}
//           >
//             Edit Member
//           </Button>
//         ]}
//         width={600}
//       >
//         {viewMember ? (
//           <div className="space-y-6">
//             {/* Profile Header */}
//             <div className="flex items-center space-x-4">
//               <Avatar
//                 size={64}
//                 src={viewMember.profilePhoto}
//                 icon={<UserAddOutlined />}
//                 className="bg-blue-500"
//               >
//                 {viewMember.firstName?.charAt(0)}
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {viewMember.firstName} {viewMember.lastName}
//                 </h3>
//                 <p className="text-gray-600">
//                   ID: {viewMember._id?.substring(0, 12)}...
//                 </p>
//                 <Space className="mt-2">
//                   {getStatusTag(viewMember.isActive)}
//                   {getRoleTag(viewMember.role)}
//                 </Space>
//               </div>
//             </div>

//             <Divider />

//             {/* Contact Information */}
//             <div>
//               <h4 className="font-semibold mb-3">Contact Information</h4>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <div className="flex items-center space-x-2">
//                     <MailOutlined className="text-gray-400" />
//                     <span>{viewMember.email || 'N/A'}</span>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div className="flex items-center space-x-2">
//                     <PhoneOutlined className="text-gray-400" />
//                     <span>{viewMember.phone || 'N/A'}</span>
//                   </div>
//                 </Col>
//                 <Col span={24}>
//                   <div className="flex items-center space-x-2">
//                     <EnvironmentOutlined className="text-gray-400" />
//                     <span>{viewMember.address || 'N/A'}</span>
//                   </div>
//                 </Col>
//               </Row>
//             </div>

//             {/* Membership Details */}
//             <div>
//               <h4 className="font-semibold mb-3">Membership Details</h4>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Membership ID</div>
//                     <div>{viewMember.membershipId || 'N/A'}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Role</div>
//                     <div>{getRoleTag(viewMember.role)}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Join Date</div>
//                     <div>{formatDate(viewMember.createdAt)}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Last Updated</div>
//                     <div>{formatRelativeTime(viewMember.updatedAt)}</div>
//                   </div>
//                 </Col>
//               </Row>
//             </div>

//             {/* Location Information */}
//             <div>
//               <h4 className="font-semibold mb-3">Location</h4>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Country</div>
//                     <div>{viewMember.country?.name || viewMember.country || 'N/A'}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">City</div>
//                     <div>{viewMember.city || 'N/A'}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">State</div>
//                     <div>{viewMember.state || 'N/A'}</div>
//                   </div>
//                 </Col>
//                 <Col span={12}>
//                   <div>
//                     <div className="text-sm text-gray-500">Postal Code</div>
//                     <div>{viewMember.postalCode || 'N/A'}</div>
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <Spin />
//             <p>Loading member details...</p>
//           </div>
//         )}
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         title="Delete Member"
//         open={deleteConfirmVisible}
//         onCancel={() => {
//           setDeleteConfirmVisible(false);
//           setMemberToDelete(null);
//         }}
//         footer={[
//           <Button key="cancel" onClick={() => {
//             setDeleteConfirmVisible(false);
//             setMemberToDelete(null);
//           }}>
//             Cancel
//           </Button>,
//           <Button
//             key="delete"
//             type="primary"
//             danger
//             onClick={confirmDeleteMember}
//             loading={loading}
//           >
//             Delete
//           </Button>
//         ]}
//       >
//         <div className="flex items-center space-x-3">
//           <ExclamationCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
//           <div>
//             <p className="font-medium">Are you sure you want to delete this member?</p>
//             <p className="text-gray-600 text-sm mt-1">
//               This action cannot be undone. All member data including profile,
//               membership information, and related records will be permanently deleted.
//             </p>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AllMembers;





//////////////////////Final/////////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Card,
//   Table,
//   Button,
//   Space,
//   Tag,
//   Input,
//   Select,
//   Row,
//   Col,
//   Statistic,
//   message,
//   Modal,
//   Descriptions,
//   Avatar,
//   Alert,
// } from 'antd';
// import {
//   TeamOutlined,
//   UserAddOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SearchOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   UserOutlined,
//   ExclamationCircleOutlined,
//   ReloadOutlined,
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchAllMembers,
//   fetchMemberStats,
//   fetchMemberById,
//   deleteMember,
// } from '../slices/memberSlice';
// import { useNavigate } from 'react-router-dom';

// const { Option } = Select;
// const { confirm } = Modal;

// const AllMembers = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   /* ---------------- Redux State ---------------- */
//   const { items: members, stats, loading, error, currentMember } = useSelector(
//     (state) => state.members
//   );

//   /* ---------------- Local State ---------------- */
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [filters, setFilters] = useState({ search: '', role: '', status: '' });

//   /* ---------------- Data Load ---------------- */
//   const loadData = useCallback(() => {
//     dispatch(fetchAllMembers(filters));
//     dispatch(fetchMemberStats());
//   }, [dispatch, filters]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   /* ---------------- Handlers ---------------- */
//   const handleViewMember = async (id) => {
//     try {
//       await dispatch(fetchMemberById(id)).unwrap();
//       setDetailModalVisible(true);
//     } catch {
//       message.error('Failed to load member details');
//     }
//   };

//   const handleDeleteMember = (id) => {
//     confirm({
//       title: 'Delete this member?',
//       icon: <ExclamationCircleOutlined />,
//       content: 'This action cannot be undone.',
//       okType: 'danger',
//       onOk: async () => {
//         try {
//           await dispatch(deleteMember(id)).unwrap();
//           message.success('Member deleted');
//           loadData();
//         } catch {
//           message.error('Delete failed');
//         }
//       },
//     });
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value || '' }));
//   };

//   /* ---------------- UI Helpers ---------------- */
//   const getRoleTag = (role) => {
//     const colors = {
//       President: 'red',
//       VicePresident: 'volcano',
//       GeneralSecretary: 'orange',
//       FinanceSecretary: 'gold',
//       ExecutiveMember: 'purple',
//       PlotOwner: 'blue',
//       Member: 'green',
//     };
//     return <Tag color={colors[role] || 'default'}>{role || 'Unknown'}</Tag>;
//   };

//   const getStatusTag = (active) => (
//     <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
//   );

//   /* ---------------- Table Columns ---------------- */
//   const columns = [
//     {
//       title: 'Member',
//       key: 'member',
//       render: (_, record) => (
//         <Space>
//           {/* <Avatar src={record.profilePhoto} icon={<UserOutlined />} /> */}
//           <Avatar
//   size={48}
//   src={record.profilePhoto}
//   icon={<UserOutlined />}
//   style={{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#1677ff',
//     flexShrink: 0,
//   }}
//   imgProps={{
//     style: {
//       objectFit: 'cover',
//       width: '100%',
//       height: '100%',
//     },
//   }}
// />

//           {/* <div>
//             <strong>{record.firstName} {record.lastName}</strong>
//             <div style={{ fontSize: 12 }}>{record.membershipId || 'No ID'}</div>
//           </div> */}

//           <div>
//       <div style={{ fontWeight: 500 }}>
//         {record.firstName} {record.lastName}
//       </div>
//       <div style={{ fontSize: 12, color: '#888' }}>
//         {record.membershipId}
//       </div>
//     </div>

//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       render: (_, record) => (
//         <div>
//           <div><MailOutlined /> {record.email || 'N/A'}</div>
//           {record.phone && <div><PhoneOutlined /> {record.phone}</div>}
//         </div>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       render: getRoleTag,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'isActive',
//       render: getStatusTag,
//     },
//     {
//       title: 'Joined',
//       dataIndex: 'createdAt',
//       render: (d) => new Date(d).toLocaleDateString(),
//     },
//     {
//       // title: 'Actions',
//       // render: (_, record) => (
//       //   <Space>
//       //     <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewMember(record._id)} />
//       //     <Button size="small" icon={<EditOutlined />} onClick={() => navigate(`/members/edit/${record._id}`)} />
//       //     <Button danger size="small" icon={<DeleteOutlined />} onClick={() => handleDeleteMember(record._id)} />
//       //   </Space>
//       // ),
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button
//             size="small"
//             icon={<EyeOutlined />}
//             onClick={() => handleViewMember(record._id)}
//           >
//             View
//           </Button>
//           <Button
//             size="small"
//             icon={<EditOutlined />}
//             onClick={() => navigate(`/members/edit/${record._id}`)}
//           >
//             Edit
//           </Button>
//           <Button
//             size="small"
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDeleteMember(record._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   /* ---------------- Render ---------------- */
//   return (
//     <div className="p-4">
//       <Card>
//         <Row justify="space-between" align="middle" className="mb-4">
//           <h2><TeamOutlined /> Members</h2>
//           <Space>
//             <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading} />
//             <Button type="primary" icon={<UserAddOutlined />} onClick={() => navigate('/members/add')}>
//               Add Member
//             </Button>
//           </Space>
//         </Row>

//         {error && <Alert type="error" message={error} showIcon className="mb-4" />}

//         <Row gutter={16} className="mb-4">
//           <Col span={8}><Statistic title="Total" value={stats?.totalMembers || 0} /></Col>
//           <Col span={8}><Statistic title="Active" value={stats?.activeMembers || 0} /></Col>
//           <Col span={8}><Statistic title="Loaded" value={members.length} /></Col>
//         </Row>

//         <Card className="mb-4">
//           <Row gutter={16}>
//             <Col span={8}>
//               <Input
//                 prefix={<SearchOutlined />}
//                 placeholder="Search"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//               />
//             </Col>
//             <Col span={6}>
//               <Select placeholder="Role" allowClear onChange={(v) => handleFilterChange('role', v)}>
//                 <Option value="Member">Member</Option>
//                 <Option value="PlotOwner">Plot Owner</Option>
//                 <Option value="ExecutiveMember">Executive</Option>
//               </Select>
//             </Col>
//             <Col span={6}>
//               <Select placeholder="Status" allowClear onChange={(v) => handleFilterChange('status', v)}>
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//               </Select>
//             </Col>
//             <Col span={4}>
//               <Button block onClick={() => setFilters({ search: '', role: '', status: '' })}>
//                 Clear
//               </Button>
//             </Col>
//           </Row>
//         </Card>

//         <Table
//           rowKey="_id"
//           loading={loading}
//           columns={columns}
//           dataSource={members}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>

//       <Modal
//         title="Member Details"
//         open={detailModalVisible}
//         onCancel={() => setDetailModalVisible(false)}
//         footer={<Button onClick={() => setDetailModalVisible(false)}>Close</Button>}
//       >
//         {currentMember && (
//           <Descriptions bordered column={2}>
//             <Descriptions.Item label="Name" span={2}>
//               {currentMember.firstName} {currentMember.lastName}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">{currentMember.email}</Descriptions.Item>
//             <Descriptions.Item label="Phone">{currentMember.phone || 'N/A'}</Descriptions.Item>
//             <Descriptions.Item label="Role">{getRoleTag(currentMember.role)}</Descriptions.Item>
//             <Descriptions.Item label="Status">{getStatusTag(currentMember.isActive)}</Descriptions.Item>
//             <Descriptions.Item label="Joined">
//               {new Date(currentMember.createdAt).toLocaleString()}
//             </Descriptions.Item>
//           </Descriptions>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllMembers;










///////////////////First Complete///////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Card,
//   Table,
//   Button,
//   Space,
//   Tag,
//   Input,
//   Select,
//   Row,
//   Col,
//   Statistic,
//   message,
//   Modal,
//   Descriptions,
//   Avatar,
//   Alert,
//   Spin,
//   Tooltip,
//   Form,
//   Switch,
// } from 'antd';
// import {
//   TeamOutlined,
//   UserAddOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SearchOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   UserOutlined,
//   ExclamationCircleOutlined,
//   ReloadOutlined,
// } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchAllMembers,
//   fetchMemberStats,
//   fetchMemberById,
//   deleteMember,
//   updateMember,
// } from '../slices/memberSlice';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

// const { Option } = Select;
// const { confirm } = Modal;
// const { TextArea } = Input;

// const AllMembers = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   // Redux State
//   const {
//     items: members,
//     stats,
//     loading,
//     error,
//     currentMember
//   } = useSelector((state) => state.members);

//   // Local State
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);
//   const [filters, setFilters] = useState({
//     search: '',
//     role: '',
//     status: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [lastEditedId, setLastEditedId] = useState(null);

//   // Load Data
//   const loadData = useCallback(() => {
//     dispatch(fetchAllMembers(filters));
//     dispatch(fetchMemberStats());
//   }, [dispatch, filters]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // Refresh currentMember when lastEditedId changes
//   useEffect(() => {
//     if (lastEditedId && detailModalVisible) {
//       console.log('Refreshing current member data for ID:', lastEditedId);
//       dispatch(fetchMemberById(lastEditedId));
//     }
//   }, [lastEditedId, detailModalVisible, dispatch]);

//   // Helper function to safely render values
//   const safeRender = (value) => {
//     if (value === null || value === undefined || value === '') {
//       return 'N/A';
//     }

//     if (typeof value === 'object') {
//       if (Array.isArray(value)) {
//         return value.join(', ') || 'N/A';
//       }
//       try {
//         if (value.name) {
//           return value.name;
//         }
//         return JSON.stringify(value);
//       } catch {
//         return '[Object]';
//       }
//     }

//     return value;
//   };

//   // Handlers
//   const handleViewMember = async (id) => {
//     try {
//       setLastEditedId(id);
//       await dispatch(fetchMemberById(id)).unwrap();
//       setDetailModalVisible(true);
//     } catch (error) {
//       console.error('Failed to load member details:', error);
//       message.error('Failed to load member details');
//     }
//   };

//   const handleEditMember = async (id) => {
//     try {
//       console.log('Starting edit for member ID:', id);

//       let memberData = members.find(m => m._id === id);

//       if (!memberData) {
//         console.log('Member not found in local state, fetching from API...');
//         const result = await dispatch(fetchMemberById(id)).unwrap();
//         memberData = result;
//       }

//       if (!memberData) {
//         message.error('Member not found');
//         return;
//       }

//       console.log('Member data found:', memberData);

//       setEditingMember(memberData);

//       const formValues = {
//         firstName: memberData.firstName || '',
//         lastName: memberData.lastName || '',
//         email: memberData.email || '',
//         phone: memberData.phone || '',
//         role: memberData.role || 'Member',
//         isActive: memberData.isActive !== undefined ? memberData.isActive : true,
//         address: memberData.address || '',
//         membershipId: memberData.membershipId || '',
//         country: memberData.country?.name || memberData.country || '',
//         city: memberData.city || '',
//         state: memberData.state || '',
//         postalCode: memberData.postalCode || '',
//       };

//       if (memberData.dateOfBirth) {
//         formValues.dateOfBirth = moment(memberData.dateOfBirth);
//       }
//       if (memberData.joinDate) {
//         formValues.joinDate = moment(memberData.joinDate);
//       }

//       console.log('Setting form values:', formValues);

//       form.resetFields();
//       setTimeout(() => {
//         form.setFieldsValue(formValues);
//       }, 0);

//       setEditModalVisible(true);

//     } catch (error) {
//       console.error('Error in handleEditMember:', error);
//       message.error('Failed to load member for editing');
//     }
//   };

//   const handleUpdateMember = async (values) => {
//     console.log('Update form values:', values);
//     console.log('Editing member state:', editingMember);

//     if (!editingMember || !editingMember._id) {
//       console.error('No editingMember or no ID found:', editingMember);
//       message.error('No member selected for update. Please try again.');
//       return;
//     }

//     const memberId = editingMember._id;
//     console.log('Updating member with ID:', memberId);

//     setIsSubmitting(true);
//     try {
//       const updateData = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         phone: values.phone || '',
//         role: values.role,
//         isActive: values.isActive,
//         address: values.address || '',
//         membershipId: values.membershipId || '',
//         country: values.country || '',
//         city: values.city || '',
//         state: values.state || '',
//         postalCode: values.postalCode || '',
//       };

//       if (values.dateOfBirth && moment.isMoment(values.dateOfBirth)) {
//         updateData.dateOfBirth = values.dateOfBirth.toISOString();
//       }
//       if (values.joinDate && moment.isMoment(values.joinDate)) {
//         updateData.joinDate = values.joinDate.toISOString();
//       }

//       console.log('Sending update data:', updateData);

//       const result = await dispatch(updateMember({
//         id: memberId,
//         data: updateData
//       })).unwrap();

//       console.log('Update successful:', result);

//       // Store the updated member ID
//       setLastEditedId(memberId);

//       // If detail modal is open, refresh the currentMember data
//       if (detailModalVisible && currentMember?._id === memberId) {
//         console.log('Refreshing current member data after update');
//         await dispatch(fetchMemberById(memberId));
//       }

//       message.success('Member updated successfully');

//       // Close modal and reset
//       setEditModalVisible(false);
//       setEditingMember(null);
//       form.resetFields();

//       // Refresh the full members list
//       loadData();

//     } catch (error) {
//       console.error('Update failed:', error);
//       message.error('Failed to update member: ' + (error.message || 'Unknown error'));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteMember = (id) => {
//     confirm({
//       title: 'Are you sure you want to delete this member?',
//       icon: <ExclamationCircleOutlined />,
//       content: 'This action cannot be undone.',
//       okText: 'Yes, Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           await dispatch(deleteMember(id)).unwrap();
//           message.success('Member deleted successfully');
//           loadData();

//           // If the deleted member was being viewed, close the modal
//           if (currentMember?._id === id && detailModalVisible) {
//             setDetailModalVisible(false);
//           }
//         } catch (error) {
//           message.error('Failed to delete member');
//         }
//       },
//     });
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value || '' }));
//   };

//   const handleClearFilters = () => {
//     setFilters({ search: '', role: '', status: '' });
//   };

//   // UI Helpers
//   const getRoleTag = (role) => {
//     const roleConfig = {
//       President: { color: 'red', label: 'President' },
//       VicePresident: { color: 'volcano', label: 'Vice President' },
//       GeneralSecretary: { color: 'orange', label: 'General Secretary' },
//       FinanceSecretary: { color: 'gold', label: 'Finance Secretary' },
//       ExecutiveMember: { color: 'purple', label: 'Executive' },
//       PlotOwner: { color: 'blue', label: 'Plot Owner' },
//       Member: { color: 'green', label: 'Member' },
//       default: { color: 'default', label: role || 'Unknown' },
//     };

//     const config = roleConfig[role] || roleConfig.default;
//     return <Tag color={config.color}>{config.label}</Tag>;
//   };

//   const getStatusTag = (isActive) => (
//     <Tag color={isActive ? 'green' : 'red'}>
//       {isActive ? 'Active' : 'Inactive'}
//     </Tag>
//   );

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   // Table Columns
//   const columns = [
//     {
//       title: 'Member',
//       key: 'member',
//       width: 250,
//       render: (_, record) => (
//         <Space align="center">
//           <Avatar
//             size={48}
//             src={record.profilePhoto}
//             icon={<UserOutlined />}
//             style={{
//               backgroundColor: '#1890ff',
//               overflow: 'hidden',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             {record.firstName?.charAt(0) || record.email?.charAt(0) || 'U'}
//           </Avatar>
//           <div>
//             <div style={{ fontWeight: 500, fontSize: 14 }}>
//               {record.firstName} {record.lastName}
//             </div>
//             <div style={{ fontSize: 12, color: '#8c8c8c' }}>
//               ID: {record._id ? record._id.substring(0, 8) + '...' : 'No ID'}
//             </div>
//             <div style={{ fontSize: 11, color: '#999' }}>
//               Membership: {record.membershipId || 'N/A'}
//             </div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact',
//       key: 'contact',
//       width: 200,
//       render: (_, record) => (
//         <Space direction="vertical" size={0}>
//           <div style={{ fontSize: 12 }}>
//             <MailOutlined style={{ marginRight: 6 }} />
//             {record.email || 'N/A'}
//           </div>
//           {record.phone && (
//             <div style={{ fontSize: 12 }}>
//               <PhoneOutlined style={{ marginRight: 6 }} />
//               {record.phone}
//             </div>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       width: 130,
//       render: getRoleTag,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'isActive',
//       key: 'status',
//       width: 100,
//       render: getStatusTag,
//     },
//     {
//       title: 'Joined',
//       dataIndex: 'createdAt',
//       key: 'joined',
//       width: 120,
//       render: formatDate,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 300,
//       fixed: 'right',
//       render: (_, record) => (
//         <Space size="small">
//           <Tooltip title="View Details" >
//             <Button

//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => handleViewMember(record._id)}
//             >
//               View
//             </Button>
//           </Tooltip>
//           <Tooltip title="Edit Member">
//             <Button

//               size="small"
//               icon={<EditOutlined />}
//               type="primary"
//               onClick={() => handleEditMember(record._id)}
//             >
//               Edit
//             </Button>
//           </Tooltip>
//           <Tooltip title="Delete Member">
//             <Button
//               danger
//               size="small"
//               icon={<DeleteOutlined />}
//               onClick={() => handleDeleteMember(record._id)}
//             >
//               Delete
//             </Button>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 12 }}>
//       <div>
//         <Card

//           bordered={false}
//           style={{ marginBottom: 24 }}
//         >
//           <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
//           <Space align="center">
//             <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />
//             <h2 style={{ margin: 0 }}>Members Management</h2>
//           </Space>
//           <Space align="center">
//             <TeamOutlined style={{ fontSize: 24, color: '#667eea' }} />
//             <h2 style={{ margin: 0 }}>Filters</h2>
//           </Space>
//           <Space>
//             <Tooltip title="Refresh Data">
//               <Button
//                 icon={<ReloadOutlined />}
//                 onClick={loadData}
//                 loading={loading}
//               />
//             </Tooltip>
//             <button
//               type="primary"
//               icon={<UserAddOutlined />}
//               onClick={() => navigate('/members/add')}
//             >
//               Add New Member
//             </button>
//           </Space>
//         </Row>
//           <Row gutter={16} align="middle">
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Input
//                 prefix={<SearchOutlined />}
//                 placeholder="Search by name, email, or ID"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Select
//                 placeholder="Filter by Role"
//                 style={{ width: '100%' }}
//                 allowClear
//                 value={filters.role || null}
//                 onChange={(v) => handleFilterChange('role', v)}
//               >
//                 <Option value="Member">Member</Option>
//                 <Option value="PlotOwner">Plot Owner</Option>
//                 <Option value="ExecutiveMember">Executive Member</Option>
//                 <Option value="President">President</Option>
//                 <Option value="VicePresident">Vice President</Option>
//                 <Option value="GeneralSecretary">General Secretary</Option>
//                 <Option value="FinanceSecretary">Finance Secretary</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Select
//                 placeholder="Filter by Status"
//                 style={{ width: '100%' }}
//                 allowClear
//                 value={filters.status || null}
//                 onChange={(v) => handleFilterChange('status', v)}
//               >
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Button
//                 block
//                 onClick={handleClearFilters}
//                 disabled={!filters.search && !filters.role && !filters.status}
//               >
//                 Clear Filters
//               </Button>
//             </Col>
//           </Row>
//         </Card>
//         {/* <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
//           <Space align="center">
//             <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />
//             <h2 style={{ margin: 0 }}>Members Management</h2>
//           </Space>
//           <Space>
//             <Tooltip title="Refresh Data">
//               <Button
//                 icon={<ReloadOutlined />}
//                 onClick={loadData}
//                 loading={loading}
//               />
//             </Tooltip>
//             <Button
//               type="primary"
//               icon={<UserAddOutlined />}
//               onClick={() => navigate('/members/add')}
//             >
//               Add New Member
//             </Button>
//           </Space>
//         </Row> */}

//         {error && (
//           <Alert
//             type="error"
//             message="Error Loading Members"
//             description={error}
//             showIcon
//             closable
//             style={{ marginBottom: 16 }}
//           />
//         )}

//         <Row gutter={16} style={{ marginBottom: 24 }}>
//           <Col span={6}>
//             <Card bordered={false}>
//               <Statistic
//                 title="Total Members"
//                 value={stats?.totalMembers || 0}
//                 prefix={<TeamOutlined />}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered={false}>
//               <Statistic
//                 title="Active Members"
//                 value={stats?.activeMembers || 0}
//                 valueStyle={{ color: '#3f8600' }}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered={false}>
//               <Statistic
//                 title="Loaded"
//                 value={members.length}
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card bordered={false}>
//               <Statistic
//                 title="Executive Members"
//                 value={stats?.executiveMembers || 0}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* <Card
//           title="Filters"
//           bordered={false}
//           style={{ marginBottom: 24 }}
//         >
//           <Row gutter={16} align="middle">
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Input
//                 prefix={<SearchOutlined />}
//                 placeholder="Search by name, email, or ID"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//                 allowClear
//               />
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Select
//                 placeholder="Filter by Role"
//                 style={{ width: '100%' }}
//                 allowClear
//                 value={filters.role || null}
//                 onChange={(v) => handleFilterChange('role', v)}
//               >
//                 <Option value="Member">Member</Option>
//                 <Option value="PlotOwner">Plot Owner</Option>
//                 <Option value="ExecutiveMember">Executive Member</Option>
//                 <Option value="President">President</Option>
//                 <Option value="VicePresident">Vice President</Option>
//                 <Option value="GeneralSecretary">General Secretary</Option>
//                 <Option value="FinanceSecretary">Finance Secretary</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Select
//                 placeholder="Filter by Status"
//                 style={{ width: '100%' }}
//                 allowClear
//                 value={filters.status || null}
//                 onChange={(v) => handleFilterChange('status', v)}
//               >
//                 <Option value="active">Active</Option>
//                 <Option value="inactive">Inactive</Option>
//               </Select>
//             </Col>
//             <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
//               <Button
//                 block
//                 onClick={handleClearFilters}
//                 disabled={!filters.search && !filters.role && !filters.status}
//               >
//                 Clear Filters
//               </Button>
//             </Col>
//           </Row>
//         </Card> */}

//         <Card bordered={false}>
//           <Table
//             rowKey="_id"
//             loading={loading}
//             columns={columns}
//             dataSource={members}
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total) => `Total ${total} members`,
//             }}
//             scroll={{ x: 1000 }}
//             locale={{ emptyText: 'No members found' }}
//           />
//         </Card>
//       </div>

//       {/* VIEW MODAL */}
//       <Modal
//         title="Member Details"
//         open={detailModalVisible}
//         onCancel={() => setDetailModalVisible(false)}
//         footer={[
//           <Button
//             key="edit"
//             type="primary"
//             onClick={() => {
//               setDetailModalVisible(false);
//               if (currentMember?._id) {
//                 handleEditMember(currentMember._id);
//               }
//             }}
//           >
//             Edit Member
//           </Button>,
//           <Button
//             key="close"
//             onClick={() => setDetailModalVisible(false)}
//           >
//             Close
//           </Button>
//         ]}
//         width={700}
//       >
//         {!currentMember ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>
//             <Spin size="large" />
//           </div>
//         ) : (
//           <div>
//             <div style={{ textAlign: 'center', marginBottom: 24 }}>
//               <Avatar
//                 size={100}
//                 src={currentMember.profilePhoto}
//                 icon={<UserOutlined />}
//                 style={{
//                   backgroundColor: '#1890ff',
//                   marginBottom: 16,
//                   overflow: 'hidden',
//                 }}
//               >
//                 {currentMember.firstName?.charAt(0) || 'U'}
//               </Avatar>
//               <h3 style={{ marginBottom: 4 }}>
//                 {safeRender(currentMember.firstName)} {safeRender(currentMember.lastName)}
//               </h3>
//               <Tag color="blue">{safeRender(currentMember.membershipId) || 'No ID'}</Tag>
//             </div>

//             <Descriptions bordered column={2}>
//               <Descriptions.Item label="Email" span={2}>
//                 {safeRender(currentMember.email)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {safeRender(currentMember.phone)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Role">
//                 {getRoleTag(currentMember.role)}
//               </Descriptions.Item>
//               <Descriptions.Item label="Status">
//                 {getStatusTag(currentMember.isActive)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Address">
//                 {safeRender(currentMember.address)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Country">
//                 {safeRender(currentMember.country)}
//               </Descriptions.Item>

//               <Descriptions.Item label="City">
//                 {safeRender(currentMember.city)}
//               </Descriptions.Item>

//               <Descriptions.Item label="State">
//                 {safeRender(currentMember.state)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Postal Code">
//                 {safeRender(currentMember.postalCode)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Date of Birth">
//                 {formatDate(currentMember.dateOfBirth)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Joined Date">
//                 {formatDate(currentMember.createdAt)}
//               </Descriptions.Item>

//               <Descriptions.Item label="Last Updated">
//                 {formatDate(currentMember.updatedAt)}
//               </Descriptions.Item>
//             </Descriptions>
//           </div>
//         )}
//       </Modal>

//       {/* EDIT MODAL */}
//       <Modal
//         title={
//           <div>
//             <EditOutlined style={{ marginRight: 8 }} />
//             Edit Member: {editingMember ? `${editingMember.firstName} ${editingMember.lastName}` : 'Loading...'}
//           </div>
//         }
//         open={editModalVisible}
//         onCancel={() => {
//           setEditModalVisible(false);
//           setEditingMember(null);
//           form.resetFields();
//         }}
//         footer={null}
//         width={800}
//         destroyOnClose
//       >
//         {!editingMember ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>
//             <Spin size="large" />
//             <p>Loading member data...</p>
//           </div>
//         ) : (
//           <>
//             <div style={{ marginBottom: 16, textAlign: 'center' }}>
//               <Avatar
//                 size={64}
//                 src={editingMember.profilePhoto}
//                 icon={<UserOutlined />}
//                 style={{
//                   backgroundColor: '#1890ff',
//                   overflow: 'hidden',
//                 }}
//               >
//                 {editingMember.firstName?.charAt(0) || 'U'}
//               </Avatar>
//               <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
//                 ID: {editingMember._id?.substring(0, 12)}...
//               </div>
//             </div>

//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={handleUpdateMember}
//             >
//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="First Name"
//                     name="firstName"
//                     rules={[{ required: true, message: 'Please enter first name' }]}
//                   >
//                     <Input placeholder="Enter first name" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Last Name"
//                     name="lastName"
//                     rules={[{ required: true, message: 'Please enter last name' }]}
//                   >
//                     <Input placeholder="Enter last name" />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[
//                       { required: true, message: 'Please enter email' },
//                       { type: 'email', message: 'Please enter valid email' }
//                     ]}
//                   >
//                     <Input placeholder="Enter email address" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Phone"
//                     name="phone"
//                   >
//                     <Input placeholder="Enter phone number" />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Membership ID"
//                     name="membershipId"
//                   >
//                     <Input placeholder="Enter membership ID" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Role"
//                     name="role"
//                     rules={[{ required: true, message: 'Please select role' }]}
//                   >
//                     <Select placeholder="Select role">
//                       <Option value="Member">Member</Option>
//                       <Option value="PlotOwner">Plot Owner</Option>
//                       <Option value="ExecutiveMember">Executive Member</Option>
//                       <Option value="President">President</Option>
//                       <Option value="VicePresident">Vice President</Option>
//                       <Option value="GeneralSecretary">General Secretary</Option>
//                       <Option value="FinanceSecretary">Finance Secretary</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Country"
//                     name="country"
//                   >
//                     <Input placeholder="Enter country" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item
//                     label="City"
//                     name="city"
//                   >
//                     <Input placeholder="Enter city" />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item
//                     label="State"
//                     name="state"
//                   >
//                     <Input placeholder="Enter state" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item
//                     label="Postal Code"
//                     name="postalCode"
//                   >
//                     <Input placeholder="Enter postal code" />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Form.Item
//                 label="Address"
//                 name="address"
//               >
//                 <TextArea rows={3} placeholder="Enter full address" />
//               </Form.Item>

//               <Form.Item
//                 label="Active Status"
//                 name="isActive"
//                 valuePropName="checked"
//               >
//                 <Switch
//                   checkedChildren="Active"
//                   unCheckedChildren="Inactive"
//                 />
//               </Form.Item>

//               <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
//                 <Space>
//                   <Button
//                     onClick={() => {
//                       setEditModalVisible(false);
//                       setEditingMember(null);
//                       form.resetFields();
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     loading={isSubmitting}
//                   >
//                     Update Member
//                   </Button>
//                 </Space>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllMembers;
