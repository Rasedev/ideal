// utils/whatsappGateway.js
class WhatsAppGateway {
  constructor() {
    this.baseURL = 'https://graph.facebook.com/v17.0';
  }

  // Send WhatsApp message
  async sendMessage(phoneNumber, message, templateName = null) {
    try {
      const formattedNumber = this.formatWhatsAppNumber(phoneNumber);
      
      let payload = {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'text',
        text: { body: message }
      };

      // Use template if provided
      if (templateName) {
        payload = {
          messaging_product: 'whatsapp',
          to: formattedNumber,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' }
          }
        };
      }

      const response = await axios.post(
        `${this.baseURL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        messageId: response.data.messages[0].id,
        gateway: 'whatsapp',
        cost: 0.005, // WhatsApp Business pricing
        rawResponse: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message,
        gateway: 'whatsapp'
      };
    }
  }

  // Send voice message (audio file)
  async sendVoiceMessage(phoneNumber, audioUrl) {
    const formattedNumber = this.formatWhatsAppNumber(phoneNumber);
    
    const response = await axios.post(
      `${this.baseURL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'audio',
        audio: { link: audioUrl }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }

  // Make voice call (requires WhatsApp Business API premium)
  async initiateVoiceCall(phoneNumber, message) {
    // This requires WhatsApp Business API premium tier
    // Not available in basic tier
    console.log('Voice calls require WhatsApp Business API premium tier');
    return { success: false, message: 'Premium feature required' };
  }

  formatWhatsAppNumber(phoneNumber) {
    let cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.startsWith('88')) return cleanNumber;
    if (cleanNumber.startsWith('01')) return '88' + cleanNumber;
    
    return cleanNumber;
  }
}

module.exports = new WhatsAppGateway();