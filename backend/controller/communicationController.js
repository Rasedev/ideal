// controllers/bdCommunicationController.js
const TeleSenseGateway = require('../utils/telesenseGateway');
const WhatsAppGateway = require('../utils/whatsappGateway');
const PlivoBDGateway = require('../utils/plivoBDGateway');
const ViberGateway = require('../utils/viberGateway');

class communicationController {
  constructor() {
    this.gateways = {
      voice: {
        telesense: TeleSenseGateway,
        plivo: PlivoBDGateway,
        whatsapp: WhatsAppGateway
      },
      sms: {
        telesense: TeleSenseGateway,
        plivo: PlivoBDGateway,
        ssl: require('./sslWirelessGateway') // Your existing SSL gateway
      },
      chat: {
        whatsapp: WhatsAppGateway,
        viber: ViberGateway
      }
    };
  }

  // Smart communication router
  async sendMessage(req, res) {
    try {
      const { 
        phoneNumber, 
        message, 
        messageType = 'sms', // sms, voice, whatsapp, viber
        gateway = 'auto',
        options = {}
      } = req.body;

      let result;

      switch (messageType) {
        case 'sms':
          result = await this.sendSMS(phoneNumber, message, gateway);
          break;
        
        case 'voice':
          result = await this.makeVoiceCall(phoneNumber, message, gateway, options);
          break;
        
        case 'whatsapp':
          result = await this.sendWhatsApp(phoneNumber, message, options);
          break;
        
        case 'viber':
          result = await this.sendViber(phoneNumber, message, options);
          break;
        
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid message type'
          });
      }

      res.json({
        success: result.success,
        message: result.success ? 'Message sent successfully' : result.error,
        data: {
          messageId: result.messageId,
          gateway: result.gateway,
          cost: result.cost,
          type: messageType
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Communication failed',
        error: error.message
      });
    }
  }

  async sendSMS(phoneNumber, message, gateway = 'auto') {
    if (gateway === 'auto') {
      // Auto-select best SMS gateway for Bangladesh
      gateway = this.getBestSMSGateway(phoneNumber);
    }

    return await this.gateways.sms[gateway].sendSMS(phoneNumber, message);
  }

  async makeVoiceCall(phoneNumber, message, gateway = 'auto', options = {}) {
    if (gateway === 'auto') {
      gateway = this.getBestVoiceGateway(phoneNumber);
    }

    if (gateway === 'whatsapp') {
      // WhatsApp voice message (not real-time call)
      return await this.gateways.chat.whatsapp.sendVoiceMessage(
        phoneNumber, 
        options.audioUrl
      );
    }

    return await this.gateways.voice[gateway].makeVoiceCall(
      phoneNumber, 
      { ...options, message }
    );
  }

  async sendWhatsApp(phoneNumber, message, options = {}) {
    return await this.gateways.chat.whatsapp.sendMessage(
      phoneNumber, 
      message, 
      options.templateName
    );
  }

  async sendViber(phoneNumber, message, options = {}) {
    return await this.gateways.chat.viber.sendMessage(
      phoneNumber, 
      message, 
      options
    );
  }

  getBestSMSGateway(phoneNumber) {
    // Logic to determine best SMS gateway
    const isBD = this.isBangladeshiNumber(phoneNumber);
    
    if (isBD) {
      // Prefer local providers for BD numbers
      return 'telesense'; // or 'ssl'
    } else {
      return 'plivo'; // International numbers
    }
  }

  getBestVoiceGateway(phoneNumber) {
    const isBD = this.isBangladeshiNumber(phoneNumber);
    
    if (isBD) {
      return 'telesense'; // Local voice provider
    } else {
      return 'plivo'; // International voice
    }
  }

  isBangladeshiNumber(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return cleanNumber.startsWith('8801') || cleanNumber.startsWith('01');
  }

  // Get available gateways and their capabilities
  async getAvailableGateways(req, res) {
    const gateways = {
      voice: {
        telesense: {
          name: 'TeleSense',
          capabilities: ['voice_calls', 'sms', 'local_bd_numbers'],
          cost: { per_minute: 0.50, currency: 'BDT' }
        },
        plivo: {
          name: 'Plivo',
          capabilities: ['voice_calls', 'sms', 'international'],
          cost: { per_minute: 1.50, currency: 'BDT' }
        },
        whatsapp: {
          name: 'WhatsApp Business',
          capabilities: ['voice_messages', 'chat', 'broadcast'],
          cost: { per_message: 0.005, currency: 'USD' }
        }
      },
      sms: {
        telesense: {
          name: 'TeleSense',
          capabilities: ['sms', 'local_delivery'],
          cost: { per_sms: 0.25, currency: 'BDT' }
        },
        ssl: {
          name: 'SSL Wireless',
          capabilities: ['sms', 'fast_delivery'],
          cost: { per_sms: 0.30, currency: 'BDT' }
        },
        plivo: {
          name: 'Plivo',
          capabilities: ['sms', 'international'],
          cost: { per_sms: 0.35, currency: 'BDT' }
        }
      }
    };

    res.json({
      success: true,
      data: gateways
    });
  }
}

module.exports = new communicationController();