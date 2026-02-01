



/////////////////  ALL FIXED VERSION//////////////////////////////

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  EditOutlined,
  SettingOutlined,
  DownOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { MdAirplaneTicket } from "react-icons/md";
import {
  Layout,
  Button,
  Space,
  Badge,
  Dropdown,
  Avatar,
  Input,
  AutoComplete,
  Spin,
} from "antd";
import { clearCurrentUser } from "../slices/userSlice";
import {
  setSearchQuery,
  setNotifications,
  setUserStats,
  markAllAsRead,
  markNotificationAsRead,
} from "../slices/headerSlice";
import { motion } from "framer-motion";
import { chatAPI, searchAPI, notificationAPI, userAPI } from '../../services/apiService';
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = ({ onToggle, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Redux state
  const { collapsed } = useSelector((state) => state.sidebar);
  const { currentTheme } = useSelector((state) => state.theme);
  const userData = useSelector((state) => state.user.value);
  const headerState = useSelector((state) => state.header);

  // Local state
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchNotifications();
    fetchUserStats();
  }, []);

  // Helper function to format time
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getNotifications({ limit: 50 });
      
      if (response.data.success) {
        const notifications = response.data.data.map(notification => ({
          id: notification._id,
          message: notification.message,
          time: formatTimeAgo(notification.createdAt),
          read: notification.read,
          type: notification.type
        }));
        
        dispatch(setNotifications(notifications));
      } else {
        throw new Error(response.data.message || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Fallback to mock data
      const mockNotifications = [
        {
          id: 1,
          message: "New message from John Doe",
          time: "2 min ago",
          read: false,
          type: "message",
        },
        {
          id: 2,
          message: "Payment received successfully",
          time: "1 hour ago",
          read: false,
          type: "payment",
        },
      ];
      dispatch(setNotifications(mockNotifications));
    } finally {
      setLoading(false);
    }
  };

// In your Header.jsx - Add request cancellation
const fetchUserStats = async () => {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
    console.log('⏰ Client-side request timeout');
  }, 8000); // 8 second timeout

  try {
    setLoading(true);
    
    const response = await userAPI.getUserStats({
      signal: abortController.signal
    });

    clearTimeout(timeoutId);

    if (response.data.success) {
      dispatch(
        setUserStats({
          bugsFixed: response.data.data.bugsFixed || "0",
          performance: response.data.data.performance || "100%",
          activity: response.data.data.activity || "Medium",
          profileComplete: response.data.data.profileComplete,
          accountAge: response.data.data.accountAge,
          loginStreak: response.data.data.loginStreak,
        })
      );
    }
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Don't show errors for aborted requests
    if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
      console.log('Request was aborted normally');
      return;
    }
    
    if (error.response?.status === 408) {
      console.log('Request timeout from server');
      return;
    }
    
    console.error("Failed to fetch user stats:", error);
    // Use basic fallback
    dispatch(
      setUserStats({
        bugsFixed: "0",
        performance: "100%",
        activity: "Medium",
        profileComplete: 0,
        accountAge: 0,
        loginStreak: 0,
      })
    );
  } finally {
    setLoading(false);
  }
};
  // Handle search with API integration
  const handleSearch = async (value) => {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const response = await searchAPI.globalSearch(value);
      
      if (response.data.success) {
        dispatch(setSearchQuery(value));
        antMessage.success(`Found ${response.data.totalResults} results`);
      } else {
        antMessage.error(response.data.message || "Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);
      antMessage.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Get search suggestions
  const handleSearchChange = async (value) => {
    setSearchValue(value);

    if (value.length < 2) {
      setSearchSuggestions([]);
      return;
    }

    try {
      const response = await searchAPI.getSuggestions(value);
      
      if (response.data.success) {
        setSearchSuggestions(response.data.data.recentSearches || []);
      }
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      setSearchSuggestions([]);
    }
  };

  // Handle chat navigation
  const handleChatNavigation = async () => {
    try {
      setLoading(true);
      
      // First, try to get user's existing chats
      const response = await chatAPI.getUserChats({ limit: 1 });
      
      if (response.data.success && response.data.data.length > 0) {
        // If user has existing chats, navigate to the most recent one
        const recentChat = response.data.data[0];
        navigate(`/chat/${recentChat._id}`);
      } else {
        // If no existing chats, navigate to general chat page
        navigate('/chat');
      }
      
    } catch (error) {
      console.error('Chat navigation error:', error);
      // Even if API fails, still navigate to chat page
      navigate('/chat');
    } finally {
      setLoading(false);
      setIsProfileOpen(false);
    }
  };

  // Handle profile actions
  const handleProfileAction = (action) => {
    switch (action) {
      case "profile":
        navigate("/settings/profile");
        break;
      case "settings":
        navigate("/settings/general");
        break;
      case "chat":
      case "message-inbox":
      case "open-messages":
        handleChatNavigation();
        break;
      case "recover-password":
        navigate("/forgot-password");
        break;
      case "my-account":
        navigate("/settings/profile");
        break;
      case "support-tickets":
        antMessage.info("Support tickets feature coming soon");
        break;
      case "edit-profile":
        navigate("/settings/profile");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
    antMessage.success("Logged out successfully");
  };

  // Handle notification actions
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    setIsNotificationOpen(false);
    antMessage.success("All notifications marked as read");
  };

  const handleNotificationClick = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
    const notification = headerState.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      switch (notification.type) {
        case "message":
          handleChatNavigation();
          break;
        case "payment":
          navigate("/paymentshistory");
          break;
        case "event":
          navigate("/events");
          break;
        default:
          break;
      }
    }
    setIsNotificationOpen(false);
  };

  // Notifications Dropdown Menu Items
  const notificationMenuItems = {
    items: [
      {
        key: "notifications-header",
        label: (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h4>
              <Button
                type="link"
                size="small"
                onClick={handleMarkAllAsRead}
                className="text-blue-600 dark:text-blue-400"
              >
                Mark all as read
              </Button>
            </div>
          </div>
        ),
        disabled: true,
      },
      {
        key: "notifications-list",
        label: (
          <div className="max-h-96 overflow-y-auto">
            {headerState.notifications.length > 0 ? (
              headerState.notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                    notification.read
                      ? "bg-white dark:bg-gray-800"
                      : "bg-blue-50 dark:bg-blue-900/20"
                  } hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 mt-2 rounded-full ${
                        notification.read ? "bg-gray-300" : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <BellOutlined className="text-4xl text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  No notifications
                </p>
              </div>
            )}
          </div>
        ),
        disabled: true,
      },
      {
        key: "notifications-footer",
        label: (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => navigate("/notifications")}
              className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View All Notifications
            </button>
          </div>
        ),
        disabled: true,
      },
    ],
  };

  // User Profile Dropdown Menu Items
  const userMenuItems = {
    items: [
      {
        key: "profile-header",
        label: (
          <div
            className="relative text-white w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(37,99,235,0.85), rgba(147,51,234,0.85)), url('/images/city3.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-6 flex items-center justify-between">
              {/* Avatar + Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <Avatar
                  size={56}
                  src={userData?.profilePhoto}
                  icon={<UserOutlined />}
                  className="border-4 border-white/40 shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate text-white">
                    {userData?.firstName} {userData?.lastName}
                  </h3>
                  <p className="text-blue-100 text-sm font-medium truncate">
                    {userData?.role} / Finance Secretary
                  </p>
                  <p className="text-blue-100/90 text-xs mt-1 opacity-80 truncate">
                    Empowering financial transparency
                  </p>
                </div>
              </div>

              {/* Logout */}
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProfileAction("logout");
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0 ml-2"
                title="Logout"
              />
            </div>
          </div>
        ),
        disabled: true,
      },
      {
        key: "activity-section",
        label: (
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Recent Activity
            </h4>
            <div className="space-y-3">
              {[
                {
                  icon: <WechatOutlined className="text-blue-600 text-lg" />,
                  label: "Chat",
                  action: "chat",
                  description: "Connect with your team",
                },
                {
                  icon: <CustomerServiceOutlined className="text-green-600 text-lg" />,
                  label: "Recover Password",
                  action: "recover-password",
                  description: "Reset your credentials",
                },
                {
                  icon: <UserOutlined className="text-purple-600 text-lg" />,
                  label: "My Account",
                  action: "my-account",
                  description: "Update profile info",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleProfileAction(item.action)}
                  className="flex items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {item.label}
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        disabled: true,
      },
      {
        key: "messages-section",
        label: (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Messages & Support
              </h4>
              <button
                onClick={() => handleProfileAction("message-inbox")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleProfileAction("message-inbox")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <MailOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                      Message Inbox
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      Check your messages
                    </span>
                  </div>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
                  {
                    headerState.notifications.filter(
                      (n) => n.type === "message" && !n.read
                    ).length
                  }
                </span>
              </button>

              <button
                onClick={() => handleProfileAction("support-tickets")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 transition-all bg-white dark:bg-gray-800 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-50 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                    <MdAirplaneTicket className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                      Support Tickets
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      Get help and support
                    </span>
                  </div>
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 ml-2">
                  {
                    headerState.notifications.filter(
                      (n) => n.type === "system" && !n.read
                    ).length
                  }
                </span>
              </button>

              <button
                onClick={() => handleProfileAction("open-messages")}
                className="w-full flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all shadow-sm hover:shadow-md mt-2"
              >
                <MessageOutlined className="mr-2 text-lg" />
                Open Messages
              </button>
            </div>
          </div>
        ),
        disabled: true,
      },
    ],
  };

  // Dropdown props for Ant Design v5
  const dropdownProps = {
    trigger: ["click"],
    placement: "bottomRight",
  };

  return (
    <AntHeader
      className={`
      transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
      ${
        currentTheme === "dark"
          ? "bg-gray-900 border-b border-gray-700 text-gray-100"
          : "bg-white border-b border-gray-200 text-gray-900"
      }
    `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-[1] min-w-0">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
        />

        {!isMobile && (
          <div className="truncate">
            <h1 className="text-lg font-semibold">
              Welcome back, {userData?.firstName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
              Here's what's happening with your association today.
            </p>
          </div>
        )}
      </div>

      {/* Center - Search Bar */}
      {!isMobile && (
        <div className="flex-[1] max-w-md mx-4">
          <div className="relative">
            <AutoComplete
              options={searchSuggestions.map((suggestion) => ({
                value: suggestion,
                label: suggestion,
              }))}
              onSelect={(value) => {
                setSearchValue(value);
                handleSearch(value);
              }}
              onSearch={handleSearchChange}
              value={searchValue}
              className="w-full"
            >
              <Input
                ref={searchRef}
                placeholder="Search messages, users, settings..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={() => handleSearch(searchValue)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="rounded-lg"
                suffix={loading ? <Spin size="small" /> : null}
              />
            </AutoComplete>

            {isSearchFocused && searchValue && (
              <div
                className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl border z-50 ${
                  currentTheme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Press Enter to search for "{searchValue}"
                  </div>
                  {searchSuggestions.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Recent Searches
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
                          onClick={() => {
                            setSearchValue(suggestion);
                            handleSearch(suggestion);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Actions */}
      <Space
        size="middle"
        className="flex items-center justify-center gap-3 flex-[1] min-w-0"
      >
        {/* Notifications */}
        <Dropdown
          {...dropdownProps}
          menu={notificationMenuItems}
          open={isNotificationOpen}
          onOpenChange={setIsNotificationOpen}
          getPopupContainer={(triggerNode) =>
            triggerNode?.parentElement || document.body
          }
          dropdownRender={(menu) => (
            <motion.div
              initial={{ opacity: 0, translateY: -8 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -6 }}
              transition={{ duration: 0.12 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="max-h-[70vh] overflow-y-auto"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {menu}
              </div>
            </motion.div>
          )}
        >
          <Badge count={headerState.unreadCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onMouseDown={(e) => e.preventDefault()}
            />
          </Badge>
        </Dropdown>

        {/* Help */}
        <Button
          type="text"
          icon={<QuestionCircleOutlined />}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={() => navigate("/help")}
        />

        {/* User Profile */}
        <div className="relative">
          <Dropdown
            {...dropdownProps}
            menu={userMenuItems}
            open={isProfileOpen}
            onOpenChange={setIsProfileOpen}
            getPopupContainer={(triggerNode) =>
              triggerNode?.parentElement || document.body
            }
            dropdownRender={(menu) => (
              <motion.div
                initial={{ opacity: 0, translateY: -8 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -6 }}
                transition={{ duration: 0.14 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="max-h-[80vh] overflow-y-auto"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {menu}
                </div>
              </motion.div>
            )}
          >
            <div
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
              role="button"
              tabIndex={-1}
            >
              <div className="w-[50px] h-[50px] rounded-full border-2 overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                  src={userData?.profilePhoto || "/default.png"}
                  alt="Profile"
                  className="w-full h-full object-cover object-[50%_30%]"
                />
              </div>
              {!isMobile && (
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    {userData?.firstName} {userData?.lastName}
                  </span>
                  <DownOutlined className="text-xs text-gray-400" />
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </Space>
    </AntHeader>
  );
};

export default Header;

// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
//   SearchOutlined,
//   LogoutOutlined,
//   UserOutlined,
//   MessageOutlined,
//   CustomerServiceOutlined,
//   EditOutlined,
//   SettingOutlined,
//   DownOutlined,
// } from "@ant-design/icons";
// import {
//   Layout,
//   Button,
//   Space,
//   Badge,
//   Dropdown,
//   Avatar,
//   Input,
//   AutoComplete,
//   Spin,
//   message as antMessage,
// } from "antd";
// import { clearCurrentUser } from "../slices/userSlice";
// import {
//   setSearchQuery,
//   setNotifications,
//   setUserStats,
//   markAllAsRead,
//   markNotificationAsRead,
// } from "../slices/headerSlice";
// import { motion } from "framer-motion";
// import { apiService } from '../../services/apiService';
// import "./Header.css";

// const { Header: AntHeader } = Layout;

// const Header = ({ onToggle, isMobile }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   // Redux state
//   const { collapsed } = useSelector((state) => state.sidebar);
//   const { currentTheme } = useSelector((state) => state.theme);
//   const userData = useSelector((state) => state.user.value);
//   const headerState = useSelector((state) => state.header);

//   // Local state
//   const [searchValue, setSearchValue] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Common dropdown props
//   const dropdownProps = {
//     trigger: ['click'],
//     placement: "bottomRight",
//   };

//   // Fetch initial data - RUNS ONLY ONCE
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch notifications
//         const notificationsResponse = await apiService.notification.getNotifications({ limit: 50 });
//         if (notificationsResponse.data.success) {
//           const notifications = notificationsResponse.data.data.map(notification => ({
//             id: notification._id,
//             message: notification.message,
//             time: formatTimeAgo(notification.createdAt),
//             read: notification.read,
//             type: notification.type
//           }));
//           dispatch(setNotifications(notifications));
//         }

//         // Fetch user stats
//         const userStatsResponse = await apiService.user.getUserStats();
//         if (userStatsResponse.data.success) {
//           dispatch(setUserStats({
//             bugsFixed: userStatsResponse.data.data.bugsFixed || "0",
//             performance: userStatsResponse.data.data.performance || "100%",
//             activity: userStatsResponse.data.data.activity || "Medium",
//           }));
//         }
//       } catch (error) {
//         console.error('Failed to fetch initial data:', error);
//         // Set fallback data
//         dispatch(setNotifications([
//           {
//             id: 1,
//             message: "Welcome to the platform!",
//             time: "Just now",
//             read: false,
//             type: "system"
//           }
//         ]));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [dispatch]); // Only depends on dispatch

//   // Helper function to format time
//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);
    
//     if (diffInSeconds < 60) return 'Just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour ago`;
//     return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   // Handle search
//   const handleSearch = async (value) => {
//     if (!value.trim()) return;

//     setLoading(true);
//     try {
//       const response = await apiService.search.globalSearch(value);
//       if (response.data.success) {
//         dispatch(setSearchQuery(value));
//         antMessage.success(`Found ${response.data.totalResults} results`);
//       }
//     } catch (error) {
//       antMessage.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get search suggestions
//   const handleSearchChange = async (value) => {
//     setSearchValue(value);
//     if (value.length < 2) {
//       setSearchSuggestions([]);
//       return;
//     }

//     try {
//       const response = await apiService.search.getSuggestions(value);
//       if (response.data.success) {
//         setSearchSuggestions(response.data.data.recentSearches || []);
//       }
//     } catch (error) {
//       setSearchSuggestions([]);
//     }
//   };

//   // Handle chat navigation
//   const handleChatNavigation = async () => {
//     try {
//       setLoading(true);
//       const response = await apiService.chat.getUserChats({ limit: 1 });
//       if (response.data.success && response.data.data.length > 0) {
//         navigate(`/chat/${response.data.data[0]._id}`);
//       } else {
//         navigate('/chat');
//       }
//     } catch (error) {
//       navigate('/chat');
//     } finally {
//       setLoading(false);
//       setIsProfileOpen(false);
//     }
//   };

//   // Handle profile actions
//   const handleProfileAction = (action) => {
//     switch (action) {
//       case "profile":
//       case "edit-profile":
//       case "my-account":
//         navigate("/settings/profile");
//         break;
//       case "settings":
//         navigate("/settings/general");
//         break;
//       case "chat":
//       case "messages":
//         handleChatNavigation();
//         break;
//       case "support-tickets":
//         antMessage.info("Support tickets feature coming soon");
//         break;
//       case "logout":
//         handleLogout();
//         break;
//       default:
//         break;
//     }
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(clearCurrentUser());
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//     antMessage.success("Logged out successfully");
//   };

//   // Handle notification actions
//   const handleMarkAllAsRead = () => {
//     dispatch(markAllAsRead());
//     setIsNotificationOpen(false);
//     antMessage.success("All notifications marked as read");
//   };

//   const handleNotificationClick = (notificationId) => {
//     dispatch(markNotificationAsRead(notificationId));
//     setIsNotificationOpen(false);
//   };

//   // Menu items definitions
//   const notificationMenuItems = {
//     items: [
//       {
//         key: 'header',
//         label: (
//           <div className="flex justify-between items-center p-2">
//             <span className="font-semibold">Notifications</span>
//             <Button 
//               type="link" 
//               size="small" 
//               onClick={handleMarkAllAsRead}
//             >
//               Mark all as read
//             </Button>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         type: 'divider',
//       },
//       ...(headerState.notifications.length > 0 ? headerState.notifications.map(notification => ({
//         key: notification.id,
//         label: (
//           <div 
//             className={`p-2 rounded-lg transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
//             onClick={() => handleNotificationClick(notification.id)}
//           >
//             <div className="flex justify-between items-start">
//               <span className="text-sm font-medium flex-1">{notification.message}</span>
//               <Badge dot={!notification.read} />
//             </div>
//             <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
//           </div>
//         ),
//       })) : [{
//         key: 'no-notifications',
//         label: (
//           <div className="text-center py-4 text-gray-500">
//             <BellOutlined className="text-2xl mb-2" />
//             <div>No notifications</div>
//           </div>
//         ),
//         disabled: true,
//       }]),
//     ],
//   };

//   const userMenuItems = {
//     items: [
//       {
//         key: 'user-info',
//         label: (
//           <div className="p-3 border-b border-gray-200 dark:border-gray-600">
//             <div className="flex items-center gap-3">
//               <Avatar 
//                 size={48} 
//                 src={userData?.profilePhoto} 
//                 icon={<UserOutlined />}
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="font-semibold text-sm truncate">
//                   {userData?.firstName} {userData?.lastName}
//                 </div>
//                 <div className="text-xs text-gray-500 truncate">
//                   {userData?.email}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ),
//         disabled: true,
//       },
//       {
//         key: 'profile',
//         icon: <UserOutlined />,
//         label: 'My Profile',
//         onClick: () => handleProfileAction('profile'),
//       },
//       {
//         key: 'edit-profile',
//         icon: <EditOutlined />,
//         label: 'Edit Profile',
//         onClick: () => handleProfileAction('edit-profile'),
//       },
//       {
//         key: 'settings',
//         icon: <SettingOutlined />,
//         label: 'Settings',
//         onClick: () => handleProfileAction('settings'),
//       },
//       {
//         type: 'divider',
//       },
//       {
//         key: 'messages',
//         icon: <MessageOutlined />,
//         label: 'Messages',
//         onClick: () => handleProfileAction('messages'),
//       },
//       {
//         key: 'support-tickets',
//         icon: <CustomerServiceOutlined />,
//         label: 'Support Tickets',
//         onClick: () => handleProfileAction('support-tickets'),
//       },
//       {
//         type: 'divider',
//       },
//       {
//         key: 'logout',
//         icon: <LogoutOutlined />,
//         label: 'Logout',
//         danger: true,
//         onClick: () => handleProfileAction('logout'),
//       },
//     ],
//   };

//   return (
//     <AntHeader
//       className={`
//       transition-all duration-300 shadow-sm px-4 flex items-center justify-start h-[90px]
//       ${
//         currentTheme === "dark"
//           ? "bg-gray-900 border-b border-gray-700 text-gray-100"
//           : "bg-white border-b border-gray-200 text-gray-900"
//       }
//     `}
//     >
//       {/* Left Section */}
//       <div className="flex items-center gap-4 flex-[1] min-w-0">
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={onToggle}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
//         />

//         {!isMobile && (
//           <div className="truncate">
//             <h1 className="text-lg font-semibold">
//               Welcome back, {userData?.firstName}!
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
//               Here's what's happening with your association today.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Center - Search Bar */}
//       {!isMobile && (
//         <div className="flex-[1] max-w-md mx-4">
//           <div className="relative">
//             <AutoComplete
//               options={searchSuggestions.map((suggestion) => ({
//                 value: suggestion,
//                 label: suggestion,
//               }))}
//               onSelect={(value) => {
//                 setSearchValue(value);
//                 handleSearch(value);
//               }}
//               onSearch={handleSearchChange}
//               value={searchValue}
//               className="w-full"
//             >
//               <Input
//                 ref={searchRef}
//                 placeholder="Search messages, users, settings..."
//                 prefix={<SearchOutlined className="text-gray-400" />}
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onPressEnter={() => handleSearch(searchValue)}
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
//                 className="rounded-lg"
//                 suffix={loading ? <Spin size="small" /> : null}
//               />
//             </AutoComplete>
//           </div>
//         </div>
//       )}

//       {/* Right Actions */}
//       <Space
//         size="middle"
//         className="flex items-center justify-center gap-3 flex-[1] min-w-0"
//       >
//         {/* Notifications */}
//         <Dropdown
//           {...dropdownProps}
//           menu={notificationMenuItems}
//           open={isNotificationOpen}
//           onOpenChange={setIsNotificationOpen}
//         >
//           <Badge count={headerState.unreadCount} size="small">
//             <Button
//               type="text"
//               icon={<BellOutlined />}
//               className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//             />
//           </Badge>
//         </Dropdown>

//         {/* Help */}
//         <Button
//           type="text"
//           icon={<QuestionCircleOutlined />}
//           className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//           onClick={() => navigate("/help")}
//         />

//         {/* User Profile */}
//         <Dropdown
//           {...dropdownProps}
//           menu={userMenuItems}
//           open={isProfileOpen}
//           onOpenChange={setIsProfileOpen}
//         >
//           <div
//             className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
//           >
//             <Avatar 
//               size={40}
//               src={userData?.profilePhoto} 
//               icon={<UserOutlined />}
//             />
//             {!isMobile && (
//               <div className="flex items-center gap-1">
//                 <span className="text-sm font-medium">
//                   {userData?.firstName} {userData?.lastName}
//                 </span>
//                 <DownOutlined className="text-xs text-gray-400" />
//               </div>
//             )}
//           </div>
//         </Dropdown>
//       </Space>
//     </AntHeader>
//   );
// };

// export default Header;


