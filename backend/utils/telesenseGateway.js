// utils/telesenseGateway.js
class TeleSenseGateway {
  constructor() {
    this.baseURL = 'https://api.telesense.com/v1';
  }

  // Send SMS via TeleSense
  async sendSMS(phoneNumber, message) {
    try {
      const formattedNumber = this.formatBDNumber(phoneNumber);
      
      const response = await axios.post(`${this.baseURL}/sms/send`, {
        api_key: process.env.TELESENSE_API_KEY,
        api_secret: process.env.TELESENSE_API_SECRET,
        to: formattedNumber,
        from: process.env.TELESENSE_SMS_SENDER_ID,
        message: message,
        message_type: 'text'
      });

      return {
        success: response.data.status === 'success',
        messageId: response.data.message_id,
        cost: response.data.cost || 0.25, // ~0.25 BDT
        gateway: 'telesense',
        rawResponse: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        gateway: 'telesense'
      };
    }
  }

  // Make voice call via TeleSense
  async makeVoiceCall(phoneNumber, options = {}) {
    try {
      const formattedNumber = this.formatBDNumber(phoneNumber);
      
      const response = await axios.post(`${this.baseURL}/voice/call`, {
        api_key: process.env.TELESENSE_API_KEY,
        api_secret: process.env.TELESENSE_API_SECRET,
        to: formattedNumber,
        from: process.env.TELESENSE_VOICE_NUMBER,
        // Text-to-speech message
        tts_message: options.message || 'Hello from our service',
        language: options.language || 'en',
        voice: options.voice || 'female',
        // Call options
        max_duration: options.maxDuration || 300, // seconds
        retry: options.retry || false
      });

      return {
        success: response.data.status === 'success',
        callId: response.data.call_id,
        status: 'initiated',
        cost: response.data.cost || 0.50, // ~0.50 BDT per minute
        gateway: 'telesense',
        rawResponse: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        gateway: 'telesense'
      };
    }
  }

  // Get call status
  async getCallStatus(callId) {
    const response = await axios.get(`${this.baseURL}/voice/call-status`, {
      params: {
        api_key: process.env.TELESENSE_API_KEY,
        api_secret: process.env.TELESENSE_API_SECRET,
        call_id: callId
      }
    });

    return response.data;
  }

  formatBDNumber(phoneNumber) {
    let cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.startsWith('88')) return cleanNumber;
    if (cleanNumber.startsWith('01')) return '88' + cleanNumber;
    if (cleanNumber.startsWith('1')) return '880' + cleanNumber;
    
    return '880' + cleanNumber;
  }
}

module.exports = new TeleSenseGateway();