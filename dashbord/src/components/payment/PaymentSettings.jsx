// components/payment/PaymentSettings.jsx
import React from 'react';
import { Card, Form, Input, InputNumber, Button, message, Row, Col, Typography } from 'antd';
import { DollarOutlined, BankOutlined, MobileOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PaymentSettings = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Save payment settings
      message.success('Payment settings updated successfully');
    } catch (error) {
      message.error('Failed to update settings');
    }
  };

  return (
    <div className="p-4">
      <Card>
        <Title level={2}>Payment Settings</Title>
        
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Subscription Settings */}
          <Card title="Subscription Settings" className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Monthly Subscription Amount"
                  name="monthlySubscriptionAmount"
                  initialValue={500}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    prefix="৳"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Due Date (Day of Month)"
                  name="dueDateDay"
                  initialValue={10}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={31}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Bank Accounts */}
          <Card title="Bank Accounts" className="mb-4">
            <Form.List name="bankAccounts">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'bankName']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Bank Name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'accountNumber']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Account Number" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'accountHolder']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Account Holder" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Button type="link" danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<BankOutlined />}>
                    Add Bank Account
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentSettings;