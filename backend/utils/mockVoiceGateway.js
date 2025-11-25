// utils/mockVoiceGateway.js
class MockVoiceGateway {
  constructor() {
    this.answerRates = {
      local: 0.65, // 65% answer rate for local
      domestic: 0.60, // 60% for domestic
      international: 0.40 // 40% for international
    };
  }

  async makeCall(phoneNumber, options = {}) {
    const numberType = this.detectNumberType(phoneNumber);
    const willAnswer = Math.random() < this.answerRates[numberType];
    
    console.log(`📞 [MOCK VOICE] Calling ${phoneNumber} (${numberType})`);
    
    const callId = `mock_call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate call initiation
    await this.simulateNetworkDelay(2000);
    
    if (!willAnswer) {
      const failureReasons = [
        { status: 'no-answer', message: 'No answer' },
        { status: 'busy', message: 'Line busy' },
        { status: 'failed', message: 'Call failed' },
        { status: 'canceled', message: 'Call canceled' }
      ];
      
      const failure = failureReasons[Math.floor(Math.random() * failureReasons.length)];
      
      console.log(`❌ [MOCK VOICE] Call to ${phoneNumber} failed: ${failure.message}`);
      
      return {
        success: false,
        callId,
        status: failure.status,
        error: failure.message,
        duration: 0,
        cost: 0,
        gateway: "mock"
      };
    }

    // Call answered - simulate conversation
    console.log(`✅ [MOCK VOICE] Call to ${phoneNumber} answered`);
    
    // Simulate call duration (30 seconds to 5 minutes)
    const duration = Math.floor(Math.random() * 270) + 30; // 30-300 seconds
    await this.simulateNetworkDelay(1000); // Simulate call time
    
    const cost = this.calculateCallCost(duration, numberType);

    console.log(`💰 [MOCK VOICE] Call completed: ${duration}s, Cost: $${cost.toFixed(3)}`);

    return {
      success: true,
      callId,
      status: 'completed',
      duration,
      cost,
      gateway: "mock",
      recordingUrl: options.record ? `https://mock-recordings.com/${callId}.mp3` : null,
      rawResponse: {
        sid: callId,
        status: 'completed',
        duration,
        price: cost,
        from: process.env.TWILIO_PHONE_NUMBER || '+15005550000',
        to: phoneNumber
      }
    };
  }

  detectNumberType(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.startsWith('1')) return 'domestic';
    if (cleanNumber.startsWith('88')) return 'local';
    if (cleanNumber.length > 10) return 'international';
    
    return 'domestic';
  }

  calculateCallCost(duration, numberType) {
    const rates = {
      local: 0.013, // $0.013 per minute
      domestic: 0.020, // $0.020 per minute  
      international: 0.150 // $0.150 per minute
    };
    
    const minutes = duration / 60;
    return parseFloat((minutes * rates[numberType]).toFixed(3));
  }

  async simulateNetworkDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simulate conference call
  async makeConferenceCall(participants, options = {}) {
    console.log(`👥 [MOCK CONFERENCE] Starting conference with ${participants.length} participants`);
    
    const conferenceId = `mock_conf_${Date.now()}`;
    const results = [];

    for (const participant of participants) {
      const result = await this.makeCall(participant.phone, {
        ...options,
        callType: 'conference'
      });
      
      results.push({
        participant: participant.name || participant.phone,
        ...result
      });
      
      // Small delay between initiating participant calls
      await this.simulateNetworkDelay(1000);
    }

    const summary = {
      conferenceId,
      totalParticipants: participants.length,
      connected: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      totalCost: results.reduce((sum, r) => sum + r.cost, 0),
      averageDuration: results.filter(r => r.success).reduce((sum, r) => sum + r.duration, 0) / results.filter(r => r.success).length || 0
    };

    console.log(`📊 [MOCK CONFERENCE] Completed: ${summary.connected}/${summary.totalParticipants} connected`);
    
    return {
      success: summary.connected > 0,
      conferenceId,
      summary,
      participantResults: results
    };
  }
}

module.exports = new MockVoiceGateway();