
const amqp = require('amqplib');
const Notification = require('../models/Notification');
const sender = require('../senders/notificationSender');

const QUEUE_NAME = 'notifications';
const MAX_RETRIES = 5;

async function processNotification(msg, attempt = 1) {
  const data = JSON.parse(msg.content.toString());

  try {
    console.log(`Attempt ${attempt}: Sending ${data.type} notification to user ${data.userId}`);

    const sendFn = {
      email: sender.sendEmail,
      sms: sender.sendSMS,
      'in-app': sender.sendInApp,
    }[data.type];

    if (!sendFn) throw new Error(`Unsupported notification type: ${data.type}`);

    await sendFn(data.content);

    await Notification.findByIdAndUpdate(data._id, { status: 'sent' });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error(`Error on attempt ${attempt}: ${error.message}`);

    if (attempt < MAX_RETRIES) {
      const delay = Math.pow(2, attempt) * 1000; 
      console.log(`Retrying in ${delay / 1000} seconds...`);

      setTimeout(() => {
        processNotification(msg, attempt + 1);
      }, delay);
    } else {
    
      await Notification.findByIdAndUpdate(data._id, { status: 'failed' });
      console.error('Notification permanently failed after max retries');
    }
  }
}

async function consumeQueue() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    console.log('Consumer is running and waiting for messages...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        await processNotification(msg);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in consumer:', error);
  }
}

consumeQueue();
