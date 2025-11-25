




import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./slices/userSlice";
import { 
  UploadOutlined, 
  BoldOutlined, 
  ItalicOutlined, 
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  UndoOutlined,
  RedoOutlined 
} from "@ant-design/icons";
import {
  Layout,
  Input,
  Select,
  Card,
  DatePicker,
  Button,
  Form,
  Row,
  Col,
  Upload,
  message,
  Typography,
  Space,
  Divider,
  Spin,
} from "antd";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;
const { Header } = Layout;

// Fixed extensions configuration - moved outside component to prevent re-creation
const getExtensions = () => [
  StarterKit.configure({
     link: false, 
    underline: false, // Disable built-in underline to avoid conflicts
  }),
  Underline.configure({
    HTMLAttributes: {
      class: 'underline',
    },
  }),
  Link.configure({ 
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      class: 'text-blue-500 underline',
    },
  }),
  Placeholder.configure({ 
    placeholder: "Write employee description...",
  }),
];

const AddEmployee = () => {
  const [storeOptions, setStoreOptions] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const userData = useSelector((state) => state.user?.value ?? []);
  const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');
  const [employmentHistory, setEmploymentHistory] = useState([
    { position: "", startDate: null, endDate: null },
  ]);
  const [editorReady, setEditorReady] = useState(false);

  // ---------- TIPTAP: Fixed editor initialization ----------
  const editor = useEditor({
    extensions: getExtensions(), // Use function to get fresh extensions
    content: "",
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-3',
      },
    },
    immediatelyRender: false,
    onCreate: () => {
      setEditorReady(true);
    },
    onDestroy: () => {
      setEditorReady(false);
    },
  });

  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      if (editor) {
        editor.destroy();
      }
      isMounted.current = false;
    };
  }, [editor]);

  // Fixed theme-aware editor styles
  useEffect(() => {
    if (editor && editorReady && editor.view?.dom) {
      const editorElement = editor.view.dom;
      const editorParent = editorElement.parentElement;
      
      if (editorParent) {
        if (currentTheme === 'dark') {
          editorParent.classList.add('bg-gray-800', 'text-white');
          editorParent.classList.remove('bg-white', 'text-gray-900');
          editorElement.classList.add('bg-gray-800', 'text-white');
          editorElement.classList.remove('bg-white', 'text-gray-900');
        } else {
          editorParent.classList.add('bg-white', 'text-gray-900');
          editorParent.classList.remove('bg-gray-800', 'text-white');
          editorElement.classList.add('bg-white', 'text-gray-900');
          editorElement.classList.remove('bg-gray-800', 'text-white');
        }
      }
    }
  }, [currentTheme, editor, editorReady]);

  // ---------------- employment helpers ----------------
  const handleEmploymentChange = (index, key, value) => {
    const updated = [...employmentHistory];
    updated[index][key] = value;
    setEmploymentHistory(updated);
  };

  const addEmploymentEntry = () =>
    setEmploymentHistory((s) => [...s, { position: "", startDate: null, endDate: null }]);

  const removeEmploymentEntry = (index) =>
    setEmploymentHistory((s) => s.filter((_, i) => i !== index));

  // ---------------- submit ----------------
  const handleSubmit = async (values) => {
    if (!editor || !editorReady) {
      message.error("Editor is not ready. Please wait...");
      return;
    }

    try {
      const descriptionHtml = editor.getHTML() || "";
      const formData = new FormData();

      // Append all form values
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (values[key] instanceof Object && 'format' in values[key]) {
            // Handle moment date objects
            formData.append(key, values[key].format("YYYY-MM-DD"));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      formData.append("description", descriptionHtml);
      
      // Safely stringify employment history
      const safeEmploymentHistory = employmentHistory.map((item) => ({
        position: item.position || "",
        startDate: item.startDate?.format?.("YYYY-MM-DD") || null,
        endDate: item.endDate?.format?.("YYYY-MM-DD") || null,
      }));
      
      formData.append("employmentHistory", JSON.stringify(safeEmploymentHistory));

      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/v1/employee/createemployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, message: successMsg, employee } = res.data || {};
      if (isMounted.current && success) {
        dispatch(setCurrentUser(employee));
        message.success(successMsg || "Employee created successfully!");
        form.resetFields();
        editor.commands.clearContent();
        setEmploymentHistory([{ position: "", startDate: null, endDate: null }]);
        setImage(null);
        setFileList([]);
      } else {
        message.error(successMsg || "Failed to create employee");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      console.error("Error creating employee:", errorMsg);
      message.error(`Error creating employee: ${errorMsg}`);
    }
  };

  const handleImageChange = ({ file, fileList: newFileList }) => {
    if (file) {
      // Validate file type
      const isValidType = file.type?.startsWith('image/');
      if (!isValidType) {
        message.error('You can only upload image files!');
        return;
      }
      
      setImage(file.originFileObj || file);
      setFileList(newFileList.slice(-1)); // Keep only the last file
    }
  };

  // ---------------- Improved toolbar component ----------------
  const ToolbarButton = ({ onClick, disabled, icon, active = false, title }) => (
    <Button
      type={active ? "primary" : "default"}
      size="small"
      icon={icon}
      onClick={onClick}
      disabled={disabled || !editorReady}
      title={title}
      className={`flex items-center justify-center ${active ? 'bg-blue-500 text-white' : ''}`}
    />
  );

  const Toolbar = () => (
    <div className={`border rounded-t-lg p-2 ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
      <Space wrap size="small">
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive('bold')}
          icon={<BoldOutlined />}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive('italic')}
          icon={<ItalicOutlined />}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          active={editor?.isActive('underline')}
          icon={<UnderlineOutlined />}
          title="Underline"
        />
        <Divider type="vertical" />
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive('bulletList')}
          icon={<UnorderedListOutlined />}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive('orderedList')}
          icon={<OrderedListOutlined />}
          title="Numbered List"
        />
        <Divider type="vertical" />
        <ToolbarButton
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          icon={<UndoOutlined />}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          icon={<RedoOutlined />}
          title="Redo"
        />
      </Space>
      {!editorReady && (
        <div className="text-xs text-yellow-600 mt-1 flex items-center">
          <Spin size="small" className="mr-2" />
          Editor initializing...
        </div>
      )}
    </div>
  );

  // Theme-aware styles
  const editorContainerClass = currentTheme === 'dark' 
    ? 'bg-gray-800 text-white border-gray-600' 
    : 'bg-white text-gray-900 border-gray-200';

  const cardClass = currentTheme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white';

  return (
    <Layout className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header className={`p-0 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <Title 
          level={3} 
          className={`text-center p-5 font-railway ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Add New Employee
        </Title>
      </Header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <Card className={`shadow-xl rounded-2xl p-8 ${cardClass}`}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={[16, 16]}>
              {/* Form fields */}
              {[
                { label: "Full Name", name: "firstName", placeholder: "Enter full name", required: true },
                { label: "Email", name: "email", type: "email", placeholder: "Enter email", required: true },
                { label: "Date of Birth", name: "dob", type: "date" },
                { label: "Job ID Card Number", name: "jobIdCardNumber", placeholder: "Enter Job ID Card Number" },
                { label: "Address", name: "address", placeholder: "Enter address" },
                { label: "Telephone", name: "telephone", placeholder: "Enter telephone" },
                { label: "Birthplace", name: "birthplace", placeholder: "Enter birthplace" },
                { label: "Father Name", name: "fatherName", placeholder: "Enter father name" },
                { label: "Educational Qualification", name: "educationalQualification", placeholder: "Enter qualification" },
              ].map(({ label, name, placeholder, type, required }, idx) => (
                <Col xs={24} sm={12} md={8} key={name || idx}>
                  <Form.Item 
                    label={label} 
                    name={name}
                    rules={required ? [{ required: true, message: `${label} is required` }] : []}
                  >
                    {type === "date" ? (
                      <DatePicker 
                        style={{ width: "100%" }} 
                        format="YYYY-MM-DD" 
                        className="w-full"
                      />
                    ) : (
                      <Input 
                        type={type || "text"} 
                        placeholder={placeholder} 
                        className="w-full"
                      />
                    )}
                  </Form.Item>
                </Col>
              ))}

              {/* Image Upload */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Upload Image" name="image">
                  <Upload
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    fileList={fileList}
                    accept="image/*"
                    maxCount={1}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Select Image</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            {/* Employment History */}
            <div className="mt-10">
              <h4 className={`text-lg font-semibold mb-4 ${
                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Employment History
              </h4>
              {employmentHistory.map((entry, index) => (
                <Row gutter={16} key={index} className="mb-4">
                  <Col xs={24} sm={6}>
                    <Input
                      placeholder="Position"
                      value={entry.position}
                      onChange={(e) => handleEmploymentChange(index, "position", e.target.value)}
                      className="w-full"
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <DatePicker
                      placeholder="Start Date"
                      value={entry.startDate}
                      onChange={(date) => handleEmploymentChange(index, "startDate", date)}
                      className="w-full"
                      format="YYYY-MM-DD"
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <DatePicker
                      placeholder="End Date"
                      value={entry.endDate}
                      onChange={(date) => handleEmploymentChange(index, "endDate", date)}
                      className="w-full"
                      format="YYYY-MM-DD"
                    />
                  </Col>
                  <Col xs={24} sm={6}>
                    {employmentHistory.length > 1 && (
                      <Button 
                        danger 
                        onClick={() => removeEmploymentEntry(index)}
                        className="w-full"
                      >
                        Remove
                      </Button>
                    )}
                  </Col>
                </Row>
              ))}

              <Row>
                <Col span={24} sm={8} md={6}>
                  <Button 
                    type="dashed" 
                    onClick={addEmploymentEntry} 
                    className="w-full"
                  >
                    + Add Employment Entry
                  </Button>
                </Col>
              </Row>
            </div>

            {/* Tiptap editor with improved styling */}
            <Form.Item label="Employee Description" className="mt-6">
              <Toolbar />
              <div className={`border border-t-0 rounded-b-lg ${editorContainerClass}`}>
                {editor ? (
                  <EditorContent 
                    editor={editor} 
                    className="min-h-[150px]"
                  />
                ) : (
                  <div className="min-h-[150px] flex items-center justify-center text-gray-500">
                    {/* <Spin size="large" tip="Loading editor..." /> */}
                    <Spin tip="Loading..." fullscreen />

                  </div>
                )}
              </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mt-10 flex justify-center">
              <Button 
                htmlType="submit" 
                type="primary" 
                size="large"
                className="px-8"
                disabled={!editorReady}
                loading={false}
              >
                {editorReady ? "Create Employee" : "Loading Editor..."}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default AddEmployee;






