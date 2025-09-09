import notifee, { TriggerType, RepeatFrequency } from '@notifee/react-native';
import { Platform } from 'react-native';

// ----------------------- CONSTANTS -----------------------
const CHANNEL_ID = 'appointment';
const WORKOUT_REMINDER_ID = 'workout-reminder';

// ----------------------- INITIALIZATION -----------------------
const initializeNotifications = async () => {
  try {
    await requestPermissions();

    if (Platform.OS === 'android') {
      await createChannel();
    }
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

const requestPermissions = async () => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === 1) {
    console.log('Permission granted:', settings);
  } else {
    console.warn('Notification permissions declined');
  }
};

const createChannel = async () => {
  return await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Appointment Notifications',
    vibration: true,
    sound: 'default',
  });
};

// ----------------------- APPOINTMENT NOTIFICATIONS -----------------------
const scheduleAppointmentNotification = async ({ date, time, trainer }) => {
  if (!date || !time || !trainer) {
    console.warn('Missing appointment details');
    return;
  }

  try {
    await initializeNotifications();

    const appointmentDateTime = parseDateTime(date, time);

    const reminderTime = new Date(
      appointmentDateTime.getTime() - 15 * 60 * 1000,
    );
    const appointmentTime = appointmentDateTime;

    // Reminder notification (28 mins before)
    await notifee.createTriggerNotification(
      buildNotification(
        '⏰ Appointment Reminder',
        `Your appointment with ${trainer.name} is starting in 15 minutes `,
      ),
      buildTrigger(reminderTime),
    );

    // Appointment notification (at exact time)
    await notifee.createTriggerNotification(
      buildNotification(
        '🏃‍♀️ Appointment Time!',
        `Your appointment with ${trainer.name} (${trainer.specialty}) is starting now!`,
      ),
      buildTrigger(appointmentTime),
    );

    console.log('Appointment notifications scheduled successfully');

    return {
      reminderTime: reminderTime.toLocaleString(),
      appointmentTime: appointmentTime.toLocaleString(),
    };
  } catch (error) {
    console.error('Error scheduling appointment notification:', error);
  }
};

// ----------------------- WORKOUT REMINDERS -----------------------
const scheduleWorkoutReminder = async (
  reminderMessage = 'Time to exercise! Stay active and healthy!',
) => {
  try {
    await initializeNotifications();

    // Cancel any existing workout reminders first
    await cancelWorkoutReminders();

    const firstTrigger = Date.now() + 10 * 1000;

    await notifee.createTriggerNotification(
      {
        id: WORKOUT_REMINDER_ID,
        ...buildNotification('💪 Workout Reminder', reminderMessage),
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: firstTrigger,
        repeatFrequency: RepeatFrequency.DAILY,
      },
    );

    return true;
  } catch (error) {
    console.error('Error scheduling workout reminder:', error);
    return false;
  }
};

const initializeWorkoutReminders = async isEnabled => {
  try {
    console.log('Initializing workout reminders, enabled:', isEnabled);

    const notifications = await notifee.getTriggerNotifications();
    const hasWorkoutReminder = notifications.some(
      n =>
        n.notification.id === WORKOUT_REMINDER_ID ||
        n.notification.title === '💪 Workout Reminder',
    );

    console.log('Existing workout reminder found:', hasWorkoutReminder);

    if (isEnabled && !hasWorkoutReminder) {
      const success = await scheduleWorkoutReminder();
      console.log('Workout reminder scheduling result:', success);
      return success;
    } else if (!isEnabled) {
      await cancelWorkoutReminders();
      return true;
    }

    return true;
  } catch (error) {
    console.error('Error initializing workout reminders:', error);
    return false;
  }
};

const cancelWorkoutReminders = async () => {
  try {
    await notifee.cancelTriggerNotification(WORKOUT_REMINDER_ID);

    const notifications = await notifee.getTriggerNotifications();
    for (const n of notifications) {
      if (n.notification.title === '💪 Workout Reminder') {
        await notifee.cancelTriggerNotification(n.notification.id);
      }
    }
    console.log('Workout reminders cancelled');
  } catch (error) {
    console.error('Error cancelling workout reminders:', error);
  }
};

// ----------------------- HELPERS -----------------------
const parseDateTime = (dateString, timeString) => {
  // Example: "Wed Sep 03 2025", "2:30 PM"
  const [_, monthName, day, year] = dateString.split(' ');
  const [timePart, period] = timeString.split(' ');
  const [hours, minutes] = timePart.split(':').map(Number);

  let hour24 = hours % 12;
  if (period === 'PM') hour24 += 12;

  return new Date(
    parseInt(year),
    getMonthNumber(monthName),
    parseInt(day),
    hour24,
    minutes,
  );
};

const getMonthNumber = month =>
  ({
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }[month] ?? 0);

const buildNotification = (title, body) => ({
  title,
  body,
  android: {
    channelId: CHANNEL_ID,
    smallIcon: 'ic_launcher',
    pressAction: { id: 'default' },
  },
  ios: { sound: 'default' },
});

const buildTrigger = date => ({
  type: TriggerType.TIMESTAMP,
  timestamp: date.getTime(),
});

// ----------------------- UTILITY EXPORTS -----------------------
const cancelAllNotifications = async () => {
  await notifee.cancelAllNotifications();
  console.log('All notifications cancelled');
};

const getTriggerNotifications = async () => {
  return await notifee.getTriggerNotifications();
};

// Test function to send immediate notification for debugging
// const sendTestNotification = async () => {
//   try {
//     await initializeNotifications();

//     await notifee.displayNotification(
//       buildNotification(
//         '🧪 Test Notification',
//         'This is a test notification to verify your setup!',
//       ),
//     );

//     console.log('Test notification sent');
//     return true;
//   } catch (error) {
//     console.error('Error sending test notification:', error);
//     return false;
//   }
// };

export {
  initializeNotifications,
  scheduleAppointmentNotification,
  scheduleWorkoutReminder,
  initializeWorkoutReminders,
  cancelWorkoutReminders,
  cancelAllNotifications,
  getTriggerNotifications,
  // sendTestNotification,
};
