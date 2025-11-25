// utils/viberGateway.js
class ViberGateway {
  constructor() {
    this.baseURL = 'https://chatapi.viber.com/pa';
  }

  // Send message via Viber
  async sendMessage(phoneNumber, message, options = {}) {
    try {
      // Viber requires user to initiate conversation first
      // This is for broadcast to subscribers
      const response = await axios.post(`${this.baseURL}/send_message`, {
        auth_token: process.env.VIBER_API_KEY,
        receiver: phoneNumber, // User's Viber ID
        type: 'text',
        text: message,
        sender: {
          name: process.env.VIBER_BOT_NAME,
          avatar: process.env.VIBER_AVATAR_URL
        }
      });

      return {
        success: response.data.status === 0,
        messageId: response.data.message_token,
        gateway: 'viber',
        cost: 0, // Free for bot messages
        rawResponse: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.status_message || error.message,
        gateway: 'viber'
      };
    }
  }

  // Broadcast message to multiple users
  async broadcastMessage(userIds, message) {
    const response = await axios.post(`${this.baseURL}/broadcast_message`, {
      auth_token: process.env.VIBER_API_KEY,
      broadcast_list: userIds,
      type: 'text',
      text: message,
      sender: {
        name: process.env.VIBER_BOT_NAME,
        avatar: process.env.VIBER_AVATAR_URL
      }
    });

    return response.data;
  }

  // Viber doesn't support initiated voice calls via API
  // But users can call your business number through Viber
}

module.exports = new ViberGateway();