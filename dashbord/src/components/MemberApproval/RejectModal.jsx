import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const RejectModal = ({ visible, onCancel, onConfirm, reason, setReason }) => (
  <Modal
    title="Reject Member Registration"
    open={visible}
    onCancel={onCancel}
    footer={[
      <Button key="cancel" onClick={onCancel}>Cancel</Button>,
      <Button key="reject" danger onClick={onConfirm} disabled={!reason.trim()}>Reject Registration</Button>
    ]}
  >
    <Form layout="vertical">
      <Form.Item label="Rejection Reason" required>
        <TextArea rows={4} placeholder="Reason for rejection" value={reason} onChange={e => setReason(e.target.value)} />
      </Form.Item>
    </Form>
  </Modal>
);

export default RejectModal;
