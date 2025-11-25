import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Tag,
  Typography,
  Descriptions,
  Spin,
  Upload,
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  ImFacebook,
  BiLogoTelegram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/all";
import moment from "moment";

const { Title, Text } = Typography;

const BASE_URL = "http://localhost:3000/api/v1";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "green";
    case "pending":
      return "orange";
    case "inactive":
      return "red";
    default:
      return "gray";
  }
};

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = res.data?.profile || res.data;
      setAdmin({
        ...profile,
        social: {
          facebook: "https://facebook.com/admin",
          twitter: "https://twitter.com/admin",
          linkedin: "https://linkedin.com/in/admin",
          telegram: "https://t.me/admin",
        },
      });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      message.error("Failed to load profile. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle photo upload
  const handlePhotoUpload = async (file) => {
    if (!file || !admin?.id) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${BASE_URL}/admin/profilephoto/${admin.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.imageUrl) {
        setAdmin((prev) => ({ ...prev, profilePhoto: res.data.imageUrl }));
        message.success("Profile photo updated successfully!");
      }
    } catch (error) {
      console.error("Photo upload error:", error);
      message.error("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="text-center text-gray-500 mt-3">
        <UserOutlined style={{ fontSize: "50px", marginBottom: "16px" }} />
        <p>No admin profile found. Please log in again.</p>
      </div>
    );
  }

  const social = admin.social || {};

  return (
    <div className="flex flex-col items-center font-railway my-6">
      {/* Profile Avatar */}
      <Avatar
        size={110}
        src={admin.profilePhoto}
        icon={!admin.profilePhoto && <UserOutlined />}
        alt={admin.fullName}
        className="mb-3"
      />
      <Upload
        showUploadList={false}
        customRequest={({ file }) => handlePhotoUpload(file)}
      >
        <Button
          type="primary"
          icon={<UploadOutlined />}
          loading={uploading}
          className="mb-5"
        >
          Upload New Photo
        </Button>
      </Upload>

      {/* Basic Info */}
      <Title level={4} className="text-center mb-0 font-railway">
        {admin.fullName}
        <br />
        <Text type="secondary">{admin.role || "Administrator"}</Text>
      </Title>

      {/* Details */}
      <Descriptions
        bordered
        column={1}
        size="small"
        className="w-full text-left mt-5 font-railway"
      >
        <Descriptions.Item label="Email">
          <MailOutlined className="mr-2 text-gray-500" />
          {admin.email || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Phone">
          <PhoneOutlined className="mr-2 text-gray-500" />
          {admin.phone || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Department">
          {admin.department || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <Tag color={getStatusColor(admin.status)}>
            {admin.status?.toUpperCase() || "UNKNOWN"}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Joined On">
          {admin.dateOfJoining
            ? moment(admin.dateOfJoining).format("YYYY-MM-DD")
            : "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Last Login">
          {admin.lastLogin
            ? moment(admin.lastLogin).format("YYYY-MM-DD HH:mm")
            : "N/A"}
        </Descriptions.Item>
      </Descriptions>

      {/* Social Links */}
      <div className="flex justify-between items-center font-railway gap-5 mt-8">
        <h5 className="text-lg font-semibold text-gray-600">Social</h5>
        {Object.values(social).some((link) => link) ? (
          <div className="flex space-x-3">
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <Button icon={<ImFacebook size={15} color="#3b5998" />} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <Button icon={<FaTwitter size={15} color="#1DA1F2" />} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <Button icon={<FaLinkedinIn size={15} color="#0077b5" />} />
              </a>
            )}
            {social.telegram && (
              <a href={social.telegram} target="_blank" rel="noopener noreferrer">
                <Button icon={<BiLogoTelegram size={15} color="#0088cc" />} />
              </a>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No social links available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
