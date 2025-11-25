import { Table, Tag, Card, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const RecentOrdersTable = () => {
  const columns = [
    {
      title: 'Purchase ID',
      dataIndex: 'purchaseId',
      key: 'purchaseId',
      render: (text) => <Text strong>#{text}</Text>,
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text strong>${amount}</Text>,
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={
            status === 'Completed' ? 'green' : 
            status === 'Pending' ? 'orange' : 'blue'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <EyeOutlined className="text-blue-500 cursor-pointer" />
      ),
    },
  ];

  const data = [
    {
      key: '1',
      purchaseId: 'TB010338',
      customerName: 'Terry White',
      productName: 'Macbook Pro',
      amount: '658.00',
      orderDate: '28 Oct, 2022',
      vendor: 'Brazil',
      status: 'Completed',
    },
    {
      key: '2',
      purchaseId: 'TB010337',
      customerName: 'Terry White',
      productName: 'Macbook Pro',
      amount: '658.00',
      orderDate: '28 Oct, 2022',
      vendor: 'Brazil',
      status: 'Completed',
    },
    {
      key: '3',
      purchaseId: 'TB010336',
      customerName: 'Heather Jimenez',
      productName: 'Smart Watch for Man\'s',
      amount: '741.98',
      orderDate: '02 Nov, 2022',
      vendor: 'Spain',
      status: 'Pending',
    },
  ];

  return (
    <Card title="Recent Orders" className="shadow-sm">
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false}
        size="middle"
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default RecentOrdersTable;