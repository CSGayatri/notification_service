const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.model');

// Get all notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
