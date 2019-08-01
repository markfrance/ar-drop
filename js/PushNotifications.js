import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const clashStarted = () => {
 PushNotification.localNotification({
   autoCancel: true,
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: "A clash you have joined is starting soon",
   subText: "This is a subText",
   color: "green",
   vibrate: true,
   vibration: 300,
   title: "Clash is starting",
   message: "Clash is starting",
   playSound: true,
   soundName: 'default',
   actions: '["Accept", "Reject"]',
 });
};

const clashEndedWinner = () => {
 PushNotification.localNotification({
   autoCancel: true,
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: "A clash you have joined has just ended",
   subText: "You have placed 1st",
   color: "green",
   vibrate: true,
   vibration: 300,
   title: "Clash has ended",
   message: "Clash has ended",
   playSound: true,
   soundName: 'default',
   actions: '["Accept", "Reject"]',
 });
};

export {
 configure,
 clashStarted,
 clashEndedWinner
};