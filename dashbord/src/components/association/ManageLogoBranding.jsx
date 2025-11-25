import React, { useState, useEffect } from 'react';
import {
  Card,
  Upload,
  Button,
  Space,
  Typography,
  message,
  Row,
  Col,
  Divider,
  Avatar,
  ColorPicker,
  Form,
  Input,
  Select,
  Modal,
} from 'antd';
import {
  SettingOutlined,
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImgCrop from 'antd-img-crop';

const { Title, Text } = Typography;
const { Option } = Select;

const ManageLogoBranding = () => {
  const [association, setAssociation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [brandSettings, setBrandSettings] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAssociationData();
    fetchBrandSettings();
  }, []);

  const fetchAssociationData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/association/logo', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAssociation(response.data.association);
        if (response.data.association.logo) {
          setFileList([{
            uid: '-1',
            name: 'association-logo',
            status: 'done',
            url: response.data.association.logo,
          }]);
        }
      }
    } catch (error) {
      message.error('Failed to fetch association data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/association/branding', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setBrandSettings(response.data.brandSettings);
        form.setFieldsValue(response.data.brandSettings);
      }
    } catch (error) {
      console.error('Failed to fetch brand settings');
    }
  };

  const handleUpload = async (options) => {
    const { file } = options;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('logo', file);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/association/logo/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success('Logo uploaded successfully');
        setFileList([{
          uid: '-1',
          name: 'association-logo',
          status: 'done',
          url: response.data.logoUrl,
        }]);
        fetchAssociationData();
      }
    } catch (error) {
      message.error('Failed to upload logo');
      setFileList([]);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:3000/api/v1/association/logo', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        message.success('Logo removed successfully');
        setFileList([]);
        fetchAssociationData();
      }
    } catch (error) {
      message.error('Failed to remove logo');
    }
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleSaveBrandSettings = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/api/v1/association/branding',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Brand settings updated successfully');
        setBrandSettings(values);
      }
    } catch (error) {
      message.error('Failed to update brand settings');
    }
  };

  const uploadProps = {
    customRequest: handleUpload,
    fileList,
    listType: 'picture-card',
    onPreview: handlePreview,
    onRemove: handleRemoveLogo,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }
      
      return true;
    },
    maxCount: 1,
    accept: 'image/*',
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const defaultColors = {
    primary: '#1890ff',
    secondary: '#52c41a',
    accent: '#faad14',
    text: '#000000',
    background: '#ffffff'
  };

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`} loading={loading}>
        {/* Header */}
        <div className="mb-6">
          <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
            <SettingOutlined className="mr-3" />
            Manage Logo & Branding
          </Title>
          <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Customize your association's visual identity and branding
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Logo Management */}
          <Col xs={24} lg={12}>
            <Card title="Logo Management" className="mb-6">
              <div className="text-center mb-6">
                <Text type="secondary" className="block mb-4">
                  Upload your association logo. Recommended size: 300x300px, PNG format with transparent background.
                </Text>
                
                <div className="flex justify-center mb-4">
                  <Avatar
                    size={120}
                    src={fileList[0]?.url}
                    icon={<SettingOutlined />}
                    className="border-2 border-dashed border-gray-300"
                  />
                </div>

                <ImgCrop rotationSlider aspect={1} quality={1} modalTitle="Edit Logo">
                  <Upload {...uploadProps}>
                    {fileList.length >= 1 ? null : (
                      <Button icon={<UploadOutlined />} loading={uploading}>
                        Upload Logo
                      </Button>
                    )}
                  </Upload>
                </ImgCrop>

                {fileList.length > 0 && (
                  <Space className="mt-4">
                    <Button 
                      icon={<EyeOutlined />}
                      onClick={() => handlePreview(fileList[0])}
                    >
                      Preview
                    </Button>
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveLogo}
                    >
                      Remove
                    </Button>
                  </Space>
                )}
              </div>

              <Divider />

              <div className="space-y-4">
                <Text strong>Logo Usage Guidelines:</Text>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use high-resolution images for best quality</li>
                  <li>PNG format with transparent background preferred</li>
                  <li>Maximum file size: 5MB</li>
                  <li>Square aspect ratio works best</li>
                  <li>Ensure logo is clearly visible on both light and dark backgrounds</li>
                </ul>
              </div>
            </Card>
          </Col>

          {/* Brand Colors */}
          <Col xs={24} lg={12}>
            <Card title="Brand Colors" className="mb-6">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSaveBrandSettings}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="Primary Color"
                      name="primaryColor"
                      tooltip="Main brand color used for buttons and important elements"
                    >
                      <ColorPicker
                        format="hex"
                        presets={[
                          {
                            label: 'Recommended Colors',
                            colors: [
                              '#1890ff',
                              '#52c41a',
                              '#faad14',
                              '#f5222d',
                              '#722ed1',
                              '#13c2c2',
                            ],
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Secondary Color"
                      name="secondaryColor"
                      tooltip="Secondary color for supporting elements"
                    >
                      <ColorPicker
                        format="hex"
                        presets={[
                          {
                            label: 'Recommended Colors',
                            colors: [
                              '#52c41a',
                              '#1890ff',
                              '#faad14',
                              '#f5222d',
                              '#722ed1',
                              '#13c2c2',
                            ],
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Accent Color"
                      name="accentColor"
                      tooltip="Color for highlights and call-to-action elements"
                    >
                      <ColorPicker
                        format="hex"
                        presets={[
                          {
                            label: 'Recommended Colors',
                            colors: [
                              '#faad14',
                              '#1890ff',
                              '#52c41a',
                              '#f5222d',
                              '#722ed1',
                              '#13c2c2',
                            ],
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Font Family"
                      name="fontFamily"
                      initialValue="Inter, sans-serif"
                    >
                      <Select>
                        <Option value="Inter, sans-serif">Inter</Option>
                        <Option value="Roboto, sans-serif">Roboto</Option>
                        <Option value="Open Sans, sans-serif">Open Sans</Option>
                        <Option value="Poppins, sans-serif">Poppins</Option>
                        <Option value="Montserrat, sans-serif">Montserrat</Option>
                        <Option value="Arial, sans-serif">Arial</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Brand Slogan"
                      name="slogan"
                    >
                      <Input.TextArea 
                        rows={2}
                        placeholder="Enter your association's slogan or tagline"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="text-right">
                  <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                    Save Brand Settings
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Brand Preview */}
        <Card title="Brand Preview" className="mt-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className="p-6 border rounded-lg" style={{ 
                backgroundColor: brandSettings.background || defaultColors.background,
                color: brandSettings.text || defaultColors.text 
              }}>
                <div className="flex items-center mb-4">
                  <Avatar
                    size={48}
                    src={fileList[0]?.url}
                    icon={<SettingOutlined />}
                    className="mr-3"
                  />
                  <div>
                    <Title level={4} style={{ 
                      color: brandSettings.primary || defaultColors.primary,
                      margin: 0 
                    }}>
                      {association?.associationName || 'Association Name'}
                    </Title>
                    <Text style={{ color: brandSettings.text || defaultColors.text }}>
                      {brandSettings.slogan || 'Your association slogan here'}
                    </Text>
                  </div>
                </div>
                
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    size="large"
                    style={{ 
                      backgroundColor: brandSettings.primary || defaultColors.primary,
                      borderColor: brandSettings.primary || defaultColors.primary
                    }}
                  >
                    Primary Action
                  </Button>
                  <Button 
                    size="large"
                    style={{ 
                      color: brandSettings.secondary || defaultColors.secondary,
                      borderColor: brandSettings.secondary || defaultColors.secondary
                    }}
                  >
                    Secondary Action
                  </Button>
                </Space>

                <div className="mt-4 p-3 rounded" style={{ 
                  backgroundColor: brandSettings.accent || defaultColors.accent,
                  color: '#000'
                }}>
                  <Text strong>Accent Highlight</Text>
                  <Text className="block">This is how accent color appears for highlights.</Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="space-y-4">
                <Text strong>Color Palette:</Text>
                <div className="flex space-x-2">
                  <div 
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: brandSettings.primary || defaultColors.primary }}
                    title="Primary Color"
                  />
                  <div 
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: brandSettings.secondary || defaultColors.secondary }}
                    title="Secondary Color"
                  />
                  <div 
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: brandSettings.accent || defaultColors.accent }}
                    title="Accent Color"
                  />
                </div>
                
                <div>
                  <Text strong className="block mb-2">Typography:</Text>
                  <div style={{ fontFamily: brandSettings.fontFamily }}>
                    <Text className="block text-2xl font-bold">Heading Example</Text>
                    <Text className="block text-lg">Subheading Example</Text>
                    <Text className="block">This is how body text will appear with the selected font family.</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Logo Usage Examples */}
        <Card title="Logo Usage Examples" className="mt-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <div className="text-center p-4 bg-white rounded border">
                <Avatar size={80} src={fileList[0]?.url} icon={<SettingOutlined />} />
                <Text className="block mt-2">Website Header</Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center p-4 bg-gray-100 rounded border">
                <Avatar size={80} src={fileList[0]?.url} icon={<SettingOutlined />} />
                <Text className="block mt-2">Document Header</Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center p-4 bg-blue-50 rounded border">
                <Avatar size={80} src={fileList[0]?.url} icon={<SettingOutlined />} />
                <Text className="block mt-2">Mobile App</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </Card>

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        title="Logo Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Logo Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ManageLogoBranding;