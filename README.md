## Notification_Service
A Node.js-based notification service that supports sending Email, SMS, and In-App notifications using a RabbitMQ queue for asynchronous processing with retry capabilities.

## Features

- Send notifications via Email, SMS, and In-App.
- REST API endpoints to create and fetch notifications.
- Uses RabbitMQ for reliable message queuing and processing.
- Implements retry logic with exponential backoff using RabbitMQ delayed retry queues.
- Stores notifications and their statuses in MongoDB.
- API documentation via Swagger UI.

## Deployed link
 ✅ Swagger UI:
👉 https://notification-service-xw5i.onrender.com/api-docs
(Should load the Swagger interface)

✅ Health Check (required by Render):
👉 https://notification-service-xw5i.onrender.com/healthz
Should return: OK

✅ Test an actual API route (e.g., /api/send, /api/notifications)
You’ll need to know the route names defined in your ./src/routes/ folder.


---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB instance (local or cloud)
- RabbitMQ server
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CSGayatri/notification_service.git
   cd notification_service
## Install dependencies:
npm install
## Create a .env file in the root directory and add your configuration variables:
- PORT=3000
- MONGO_URI=mongodb://localhost:27017/notifications
- RABBITMQ_URL=amqp://localhost

## Start the server:
npm start

## Access the API documentation:
Open http://localhost:3000/api-docs in your browser to view Swagger UI.

## API Endpoints
## end Notification
URL: /api/notifications
Method: POST
Body Parameters:

{
  "userId": "string",
  "type": "email | sms | in-app",
  "content": {
    // content varies based on type
  }
}
Description: Queues a notification to be sent.

Get User Notifications
URL: /api/users/{userId}/notifications

Method: GET

Description: Retrieves all notifications for a given user.

## Assumptions
- Notification content schema depends on the notification type.
- RabbitMQ and MongoDB are running and accessible via the URLs provided in .env.
- Retry delays are managed by RabbitMQ using delayed queues.
- No authentication/authorization is implemented.

## Future Improvements
- Add authentication to API endpoints.
- Support pagination and filtering on user notifications endpoint.
- Add more notification channels.
- Add unit and integration tests.
- Dockerize the app and infrastructure.

## License
This project is licensed under the MIT License.

