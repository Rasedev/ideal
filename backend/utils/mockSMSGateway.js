// utils/mockSMSGateway.js
class MockSMSGateway {
  constructor() {
    this.deliveryTimes = {
      local: 1000, // 1 second for local numbers
      domestic: 3000, // 3 seconds for domestic
      international: 8000 // 8 seconds for international
    };
    
    this.successRates = {
      local: 0.98, // 98% success for local
      domestic: 0.95, // 95% success for domestic  
      international: 0.85 // 85% success for international
    };
  }

  // Detect phone number type
  detectNumberType(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.startsWith('1')) return 'domestic'; // US/Canada
    if (cleanNumber.startsWith('88')) return 'local'; // Bangladesh
    if (cleanNumber.length > 10) return 'international';
    
    return 'domestic';
  }

  // Simulate realistic SMS sending
  async sendSMS(phoneNumber, message, options = {}) {
    const numberType = this.detectNumberType(phoneNumber);
    const deliveryTime = this.deliveryTimes[numberType];
    const successRate = this.successRates[numberType];

    console.log(`📱 [MOCK SMS] Preparing to send to ${phoneNumber} (${numberType})`);
    
    // Simulate API delay
    await this.simulateNetworkDelay(deliveryTime);

    // Simulate success/failure based on realistic rates
    const isSuccess = Math.random() < successRate;
    const messageId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if (!isSuccess) {
      const errors = [
        { code: 'NUMBER_INVALID', message: 'The number is invalid or not reachable' },
        { code: 'INSUFFICIENT_CREDIT', message: 'Insufficient account credit' },
        { code: 'CARRIER_REJECTED', message: 'Message rejected by carrier' },
        { code: 'RATE_LIMITED', message: 'Rate limit exceeded' },
        { code: 'GATEWAY_TIMEOUT', message: 'Gateway timeout' }
      ];
      
      const error = errors[Math.floor(Math.random() * errors.length)];
      
      console.log(`❌ [MOCK SMS] Failed to send to ${phoneNumber}: ${error.message}`);
      
      return {
        success: false,
        error: error.message,
        code: error.code,
        gateway: "mock",
        messageId,
        cost: 0
      };
    }

    // Successful delivery
    console.log(`✅ [MOCK SMS] Successfully sent to ${phoneNumber}: "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}"`);
    
    const result = {
      success: true,
      messageId,
      status: "sent",
      cost: this.calculateCost(numberType, message.length),
      gateway: "mock",
      numberType,
      simulatedDeliveryTime: deliveryTime,
      rawResponse: {
        sid: messageId,
        status: "sent",
        to: phoneNumber,
        date_created: new Date().toISOString(),
        price: this.calculateCost(numberType, message.length)
      }
    };

    // Simulate delivery status updates
    this.simulateDeliveryUpdates(messageId, phoneNumber, numberType);
    
    return result;
  }

  // Calculate realistic costs
  calculateCost(numberType, messageLength) {
    const baseCosts = {
      local: 0.005,      // $0.005 for local
      domestic: 0.0075,  // $0.0075 for domestic
      international: 0.12 // $0.12 for international
    };
    
    // Additional cost for long messages (multiple segments)
    const segments = Math.ceil(messageLength / 160);
    const segmentMultiplier = segments > 1 ? segments * 0.75 : 1;
    
    return parseFloat((baseCosts[numberType] * segmentMultiplier).toFixed(4));
  }

  // Simulate network delay
  async simulateNetworkDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simulate delivery status updates (like real gateways)
  async simulateDeliveryUpdates(messageId, phoneNumber, numberType) {
    const statusFlow = [
      { status: 'sent', delay: 1000 },
      { status: 'delivered', delay: this.deliveryTimes[numberType] - 1000 }
    ];

    for (const step of statusFlow) {
      await this.simulateNetworkDelay(step.delay);
      
      // In real implementation, this would call your webhook endpoint
      console.log(`📱 [MOCK SMS] Status update for ${messageId}: ${step.status}`);
      
      // You can simulate webhook calls to your own API
      this.simulateWebhookCall(messageId, step.status, phoneNumber);
    }
  }

  // Simulate webhook calls to your application
  async simulateWebhookCall(messageId, status, phoneNumber) {
    try {
      // This would call your actual webhook endpoint in development
      const webhookData = {
        MessageSid: messageId,
        MessageStatus: status,
        To: phoneNumber,
        From: process.env.TWILIO_PHONE_NUMBER || '+15005550000',
        Timestamp: new Date().toISOString()
      };

      // In a real dev environment, you might want to actually call your webhook
      // await axios.post(`${process.env.API_BASE_URL}/webhooks/sms-status`, webhookData);
      
      console.log(`🔄 [MOCK WEBHOOK] Would call webhook with status: ${status}`);
    } catch (error) {
      console.log('⚠️ [MOCK WEBHOOK] Webhook simulation failed (expected in dev)');
    }
  }

  // Bulk SMS simulation with realistic failures
  async sendBulkSMS(recipients, message) {
    console.log(`📨 [MOCK BULK SMS] Sending to ${recipients.length} recipients`);
    
    const results = [];
    const BATCH_SIZE = 5; // Simulate rate limiting
    const BATCH_DELAY = 1000; // 1 second between batches

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE);
      console.log(`🔄 Processing batch ${Math.floor(i/BATCH_SIZE) + 1}`);
      
      const batchPromises = batch.map(async (recipient, index) => {
        // Stagger requests within batch
        await this.simulateNetworkDelay(index * 200);
        return this.sendSMS(recipient.phone, message);
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Delay between batches (rate limiting simulation)
      if (i + BATCH_SIZE < recipients.length) {
        await this.simulateNetworkDelay(BATCH_DELAY);
      }
    }

    const summary = {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      totalCost: results.reduce((sum, r) => sum + (r.cost || 0), 0)
    };

    console.log(`📊 [MOCK BULK SMS] Completed: ${summary.successful}/${summary.total} successful, Cost: $${summary.totalCost.toFixed(2)}`);
    
    return {
      success: true,
      summary,
      results
    };
  }
}

module.exports = new MockSMSGateway();