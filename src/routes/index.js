const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Send a notification to a user
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, sms, in-app]
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification queued successfully
 *       500:
 *         description: Internal server error
 */
router.post('/notifications', notificationController.sendNotification);

/**
 * @swagger
 * /api/users/{id}/notifications:
 *   get:
 *     summary: Get all notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications
 *       500:
 *         description: Internal server error
 */
router.get('/users/:id/notifications', notificationController.getUserNotifications);

module.exports = router;
