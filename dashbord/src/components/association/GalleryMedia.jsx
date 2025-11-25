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
  Image,
  Modal,
  List,
  Tag,
  Divider,
  Input,
  Select,
  DatePicker,
  Form,
  Popconfirm,
  App,
} from 'antd';
import {
  PictureOutlined,
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImgCrop from 'antd-img-crop';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const GalleryMedia = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [addAlbumModal, setAddAlbumModal] = useState(false);
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [albumForm] = Form.useForm();
   const { message } = App.useApp();

  useEffect(() => {
    fetchMediaItems();
    fetchAlbums();
  }, [selectedCategory, searchText]);

  const fetchMediaItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/association/gallery', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          category: selectedCategory === 'all' ? '' : selectedCategory,
          search: searchText,
        },
      });

      if (response.data.success) {
        setMediaItems(response.data.mediaItems || []);
      }
    } catch (error) {
      message.error('Failed to fetch media items');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbums = async () => {
    // This would fetch album data from the API
    // For now, we'll use static data
  };

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('category', selectedCategory === 'all' ? 'general' : selectedCategory);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/association/gallery/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success('Media uploaded successfully');
        onSuccess(response.data);
        fetchMediaItems();
      }
    } catch (error) {
      message.error('Failed to upload media');
      onError(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/association/gallery/${mediaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Media deleted successfully');
        fetchMediaItems();
      }
    } catch (error) {
      message.error('Failed to delete media');
    }
  };

  const handlePreview = (item) => {
    setPreviewImage(item.url);
    setPreviewVisible(true);
  };

  const handleCreateAlbum = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/association/gallery/albums',
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success('Album created successfully');
        setAddAlbumModal(false);
        albumForm.resetFields();
        fetchAlbums();
      }
    } catch (error) {
      message.error('Failed to create album');
    }
  };

  const uploadProps = {
    customRequest: handleUpload,
    multiple: true,
    listType: 'picture-card',
    onPreview: (file) => handlePreview({ url: file.url || file.thumbUrl }),
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        message.error('You can only upload image or video files!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      
      return true;
    },
    accept: 'image/*,video/*',
    showUploadList: true,
  };

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  const categories = [
    { value: 'all', label: 'All Media', color: 'blue' },
    { value: 'events', label: 'Events', color: 'green' },
    { value: 'meetings', label: 'Meetings', color: 'orange' },
    { value: 'infrastructure', label: 'Infrastructure', color: 'purple' },
    { value: 'committee', label: 'Committee', color: 'cyan' },
    { value: 'general', label: 'General', color: 'default' },
  ];

  const getMediaTypeIcon = (type) => {
    if (type.startsWith('image')) return <PictureOutlined />;
    if (type.startsWith('video')) return <VideoCameraOutlined />;
    return <FileTextOutlined />;
  };

  const getMediaTypeTag = (type) => {
    if (type.startsWith('image')) return <Tag color="blue">Image</Tag>;
    if (type.startsWith('video')) return <Tag color="red">Video</Tag>;
    return <Tag>File</Tag>;
  };

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`} loading={loading}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
              <PictureOutlined className="mr-3" />
              Gallery & Media
            </Title>
            <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Manage association photos, videos, and media files
            </Text>
          </div>
          <Space>
            <Button 
              icon={<PlusOutlined />}
              onClick={() => setAddAlbumModal(true)}
            >
              Create Album
            </Button>
          </Space>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Search media..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Select
                placeholder="Filter by category"
                style={{ width: '100%' }}
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                {categories.map(category => (
                  <Option key={category.value} value={category.value}>
                    <Tag color={category.color}>{category.label}</Tag>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={8} lg={12}>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Tag
                    key={category.value}
                    color={selectedCategory === category.value ? category.color : 'default'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Tag>
                ))}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Upload Section */}
        <Card title="Upload Media" className="mb-6">
          <div className="text-center">
            <ImgCrop rotationSlider quality={1} modalTitle="Edit Image">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} loading={uploading} size="large">
                  Click to Upload
                </Button>
              </Upload>
            </ImgCrop>
            <Text type="secondary" className="block mt-2">
              Support for images and videos. Maximum file size: 10MB
            </Text>
          </div>
        </Card>

        {/* Media Grid */}
        <Card title={`Media Library (${mediaItems.length} items)`}>
          {mediaItems.length === 0 ? (
            <div className="text-center py-12">
              <PictureOutlined className="text-4xl text-gray-400 mb-4" />
              <Title level={4} className="text-gray-500">No Media Files</Title>
              <Text className="text-gray-400">
                Upload your first media file to get started
              </Text>
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {mediaItems.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                  <Card
                    size="small"
                    cover={
                      item.type.startsWith('image') ? (
                        <Image
                          alt={item.title}
                          src={item.url}
                          height={160}
                          style={{ objectFit: 'cover' }}
                          preview={false}
                          onClick={() => handlePreview(item)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <div 
                          className="w-full h-40 bg-gray-200 flex items-center justify-center cursor-pointer"
                          onClick={() => handlePreview(item)}
                        >
                          <VideoCameraOutlined className="text-3xl text-gray-600" />
                        </div>
                      )
                    }
                    actions={[
                      <EyeOutlined key="view" onClick={() => handlePreview(item)} />,
                      <Popconfirm
                        key="delete"
                        title="Delete Media"
                        description="Are you sure you want to delete this media file?"
                        onConfirm={() => handleDeleteMedia(item._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined />
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Text ellipsis={{ tooltip: item.title }}>
                          {item.title || 'Untitled'}
                        </Text>
                      }
                      description={
                        <Space direction="vertical" size={0}>
                          {getMediaTypeTag(item.type)}
                          <Tag color={categories.find(c => c.value === item.category)?.color}>
                            {item.category}
                          </Tag>
                          <Text type="secondary" className="text-xs">
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </Text>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card>

        {/* Recent Albums */}
        <Card title="Recent Albums" className="mt-6">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={[
              { id: 1, title: 'Annual Meeting 2024', count: 24, cover: '' },
              { id: 2, title: 'Infrastructure Development', count: 18, cover: '' },
              { id: 3, title: 'Community Events', count: 32, cover: '' },
              { id: 4, title: 'Committee Activities', count: 15, cover: '' },
            ]}
            renderItem={album => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                      <PictureOutlined className="text-2xl text-gray-400" />
                    </div>
                  }
                >
                  <Card.Meta
                    title={album.title}
                    description={`${album.count} photos`}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Card>

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        title="Media Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80vw"
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {/* Create Album Modal */}
      <Modal
        title="Create New Album"
        open={addAlbumModal}
        onCancel={() => {
          setAddAlbumModal(false);
          albumForm.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form
          form={albumForm}
          layout="vertical"
          onFinish={handleCreateAlbum}
        >
          <Form.Item
            label="Album Title"
            name="title"
            rules={[{ required: true, message: 'Please enter album title' }]}
          >
            <Input placeholder="Enter album title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea 
              rows={3}
              placeholder="Enter album description"
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            initialValue="general"
          >
            <Select>
              {categories.filter(c => c.value !== 'all').map(category => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Event Date (Optional)"
            name="eventDate"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <div className="text-right">
            <Space>
              <Button onClick={() => setAddAlbumModal(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Album
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryMedia;