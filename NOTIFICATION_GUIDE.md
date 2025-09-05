# Appointment Notification System

This document explains how to use the notification system for appointment reminders in the FitnessApp.

## Overview

The notification system uses `@notifee/react-native` to schedule local notifications for appointment reminders. When a user books an appointment, two notifications are scheduled:

1. **Reminder Notification**: 30 minutes before the appointment
2. **Appointment Notification**: At the exact appointment time

## Features

- ⏰ Automatic reminder 30 minutes before appointment
- 🏃‍♀️ Notification at appointment time
- 📱 Cross-platform support (iOS & Android)
- 🎯 Personalized messages with trainer name and specialty
- 🔧 Configurable notification channels

## Files Modified/Created

### New Files
- `src/utils/NotificationService.js` - Main notification service

### Modified Files
- `src/Screens/TrainerScreens/AppointmentScreen.jsx` - Added notification integration
- `android/app/src/main/AndroidManifest.xml` - Added notification permissions

## How It Works

1. **User selects date and time** in AppointmentScreen
2. **User taps "Send" button**
3. **Notification service schedules** two notifications:
   - Reminder 30 minutes before
   - Alert at appointment time
4. **Success message** shows scheduled times
5. **User proceeds** to payment screen

## Usage Example

```javascript
import NotificationService from '../../utils/NotificationService';

// Schedule notification
const appointmentDetails = {
  date: 'Wed Sep 03 2025',
  time: '2:30 PM',
  trainer: {
    name: 'Jennifer James',
    specialty: 'Functional Strength'
  }
};

const result = await NotificationService.scheduleAppointmentNotification(appointmentDetails);
```

## Notification Service Methods

### `scheduleAppointmentNotification(appointmentDetails)`
Schedules appointment notifications based on provided details.

**Parameters:**
- `appointmentDetails.date` - Date string (format: "Wed Sep 03 2025")
- `appointmentDetails.time` - Time string (format: "2:30 PM")
- `appointmentDetails.trainer.name` - Trainer name
- `appointmentDetails.trainer.specialty` - Trainer specialty

**Returns:**
```javascript
{
  reminderTime: "9/3/2025, 2:00:00 PM",
  appointmentTime: "9/3/2025, 2:30:00 PM"
}
```

### Other Utility Methods
- `cancelAllNotifications()` - Cancel all scheduled notifications
- `getTriggerNotifications()` - Get list of scheduled notifications

## Setup Requirements

### Android Permissions (Already Added)
```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

### iOS (Automatic)
The notification service automatically requests permissions on iOS.

## Testing the Notifications

To test the notification system:

1. **Select a date and time** (you can select a time just 2-3 minutes in the future for testing)
2. **Book the appointment**
3. **Check that notifications appear** at the scheduled times

### Debug Methods
```javascript
// Check scheduled notifications
const notifications = await NotificationService.getTriggerNotifications();
console.log('Scheduled notifications:', notifications);

// Cancel all for testing
await NotificationService.cancelAllNotifications();
```

## Customization

### Modify Notification Content
Edit `src/utils/NotificationService.js`:

```javascript
// Change reminder message
title: '⏰ Custom Reminder Title',
body: `Custom message for ${trainer.name}`,

// Change appointment message  
title: '🏃‍♀️ Custom Appointment Title',
body: `Custom appointment message`,
```

### Change Reminder Time
Change the reminder offset (currently 30 minutes):

```javascript
// Change from 30 minutes to 60 minutes
const reminderTime = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000);
```

### Android Notification Channel
Modify channel settings in `createChannel()`:

```javascript
const channelId = await notifee.createChannel({
  id: 'appointment',
  name: 'Appointment Notifications',
  vibration: true,
  sound: 'default',
  importance: AndroidImportance.HIGH, // Add this for high priority
});
```

## Troubleshooting

### Notifications Not Appearing
1. Check device notification permissions
2. Ensure app has notification permissions
3. Check if device is in Do Not Disturb mode
4. Verify date/time parsing is correct

### Android Specific Issues
1. Check notification channels are created
2. Verify AndroidManifest.xml permissions
3. Test on different Android versions

### iOS Specific Issues
1. Check notification permissions
2. Test on device (not simulator)
3. Verify app is not backgrounded aggressively

## Production Considerations

1. **Error Handling**: Always wrap in try-catch blocks
2. **Fallback**: App should work even if notifications fail
3. **User Preferences**: Consider adding notification settings
4. **Battery Optimization**: Android may kill background processes
5. **Time Zones**: Consider time zone handling for global apps

## Next Steps

Consider adding:
- [ ] Multiple reminder options (15 min, 1 hour, 1 day before)
- [ ] Notification action buttons (Reschedule, Cancel)
- [ ] Persistent notification storage
- [ ] User notification preferences
- [ ] Rich notifications with images
