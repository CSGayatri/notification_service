// src/senders/notificationSender.js

module.exports = {
  sendEmail: async (content) => {
    console.log(`📧 Sending email: ${content}`);
    // Integrate Nodemailer/SendGrid here
    return true;
  },

  sendSMS: async (content) => {
    console.log(`📱 Sending SMS: ${content}`);
    // Integrate Twilio here
    return true;
  },

  sendInApp: async (content) => {
    console.log(`🖥️ Sending in-app notification: ${content}`);
    // Simulate in-app push
    return true;
  },
};
