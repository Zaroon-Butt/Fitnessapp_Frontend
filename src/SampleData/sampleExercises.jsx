import { WorkoutDetailImage ,Excercise, Excercise2, Excercise3, Excercise4, categories1, categories2, categories3, categories4, onboard3
 } from '../utils';

export const sampleExercises = [
  {
    id: '1',
    title: 'Simple Warm-Up Exercises',
    duration: '0:30',
    image: Excercise,
    type: 'warm-up',
    difficulty: 'easy',
    url: 'https://www.youtube.com/watch?v=wvdugigsM6I', // Warm Up Before Every Workout :contentReference[oaicite:3]{index=3}
  },
  {
    id: '2',
    title: 'Stability Training Basics',
    duration: '1:00',
    image: Excercise2,
    type: 'stability',
    difficulty: 'medium',
    url: 'https://www.youtube.com/watch?v=aXsDTSdTIms', // Mobility Routine Before Every Workout :contentReference[oaicite:4]{index=4}
  },
  {
    id: '3',
    title: 'Core Strengthening',
    duration: '0:45',
    image: Excercise3,
    type: 'strength',
    difficulty: 'medium',
    url: 'https://www.youtube.com/watch?v=aXsDTSdTIms', // Mobility also supports strength/stability :contentReference[oaicite:5]{index=5}
  },
  {
    id: '4',
    title: 'Flexibility Stretches',
    duration: '0:15',
    image: Excercise4,
    type: 'flexibility',
    difficulty: 'easy',
    url: 'https://www.youtube.com/watch?v=2CnKciYLKZA', // Stretch & Flexibility Routine :contentReference[oaicite:6]{index=6}
  },
  {
    id: '5',
    title: 'Cool Down Routine',
    duration: '0:20',
    image: onboard3,
    type: 'cool-down',
    difficulty: 'easy',
    url: 'https://www.youtube.com/watch?v=2CnKciYLKZA', // Flexibility/Stretch fits cool-down :contentReference[oaicite:7]{index=7}
  },
];

