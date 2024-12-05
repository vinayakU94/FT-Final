import  admin  from 'firebase-admin';
import { checkNullUndefined } from '../utils/tools.js';



const sendNotificationToFCM =  async (req, res) => {
    const { registrationToken , notificationTitle , notificationBody, action} = req.body;
  
    if (checkNullUndefined(registrationToken) || checkNullUndefined(notificationBody) || checkNullUndefined(notificationTitle)) {
      return res.status(400).json({ message: 'Registration token is required' });
    }
  
    const message = {
      notification: {
        title: notificationTitle,//'Game Update', // The title of the notification
        body: notificationBody //'You have a new score ', // The body of the notification
      },
      
      token: registrationToken,
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      if(checkNullUndefined(action)){

          res.status(200).json({ message: 'Notification sent successfully', response });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Error sending notification', error });
    }
  }



  export {
    sendNotificationToFCM
  }