const amqp = require('amqplib');

let channel;
const QUEUE_NAME = 'notifications';

async function connectQueue() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
  } catch (error) {
    console.error('Queue connection error:', error);
  }
}

connectQueue();

exports.publishNotification = async (notification) => {
  try {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notification)));
  } catch (error) {
    console.error('Failed to publish message:', error);
  }
};
