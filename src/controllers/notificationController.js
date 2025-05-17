const Notification = require('../models/Notification');
const queueService = require('../queues/producer');

exports.sendNotification = async (req, res) => {
  const { userId, type, content } = req.body;
  try {
    const notification = new Notification({ userId, type, content, status: 'pending' });
    await notification.save();
    await queueService.publishNotification(notification);
    res.status(200).json({ message: 'Notification queued', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
