import {
  WorkoutImage,
  Excercise,
  Excercise2,
  Excercise3,
  Excercise4,
  onboard2,
  categories1,
  categories2,
  categories3,
  categories4,
} from '../utils';

export const sampleWorkouts = [
  {
    id: '1',
    title: 'Evening Cardio',
    subtitle: '45 min',
    category: 'cardio',
    difficulty: 'medium',
    calories: 350,
    image: categories1,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=8LX2qgk6pgA', // Complete 10 Min Full Body Workout | No Equipment Needed
  },
  {
    id: '2',
    title: 'HIIT Training',
    subtitle: '25 min',
    category: 'hiit',
    difficulty: 'hard',
    calories: 280,
    image: categories2,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=IJ_YwiA7ULo', // 6-Min 6-Pack ABS Workout (No Rest)
  },
  {
    id: '3',
    title: 'Strength Training',
    subtitle: '60 min',
    category: 'strength',
    difficulty: 'medium',
    calories: 420,
    image: categories3,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=3YL8Tfr73rE', // Complete 20 Min Full Body Workout | Follow Along
  },
  {
    id: '4',
    title: 'Pilates',
    subtitle: '35 min',
    category: 'flexibility',
    difficulty: 'easy',
    calories: 200,
    image: categories4,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=RD1XBGcJerA', // 7-Minute Morning Warm-Up Routine
  },
  {
    id: '5',
    title: 'Morning Run',
    subtitle: '40 min',
    category: 'cardio',
    difficulty: 'medium',
    calories: 380,
    image: categories3,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=8LX2qgk6pgA', // reuse cardio video
  },
  {
    id: '6',
    title: 'Core Blast',
    subtitle: '20 min',
    category: 'strength',
    difficulty: 'hard',
    calories: 150,
    image: categories1,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=3YL8Tfr73rE', // reuse strength video
  },
  {
    id: '7',
    title: 'Yoga Flow',
    subtitle: '50 min',
    category: 'flexibility',
    difficulty: 'easy',
    calories: 180,
    image:categories4,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=RD1XBGcJerA', // reuse flexibility video
  },
  {
    id: '8',
    title: 'CrossFit WOD',
    subtitle: '45 min',
    category: 'hiit',
    difficulty: 'hard',
    calories: 450,
    image: categories2,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=IJ_YwiA7ULo', // reuse HIIT video
  },
];

export const todayWorkout = {
  id: 'today-1',
  title: 'Morning Yoga',
  subtitle: '30 min',
  category: 'flexibility',
  difficulty: 'easy',
  calories: 120,
  image: WorkoutImage,
  Pro: false,
  url: 'https://www.youtube.com/watch?v=RD1XBGcJerA', // flexibility
};

export const newWorkout = [
  {
    id: 'new-1',
    title: 'Evening Stretch',
    subtitle: '15 min',
    category: 'flexibility',
    difficulty: 'easy',
    calories: 80,
    image: Excercise,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=RD1XBGcJerA', // flexibility
  },
  {
    id: 'new-2',
    title: 'Morning Yoga Flow',
    subtitle: '20 min',
    category: 'yoga',
    difficulty: 'easy',
    calories: 100,
    image: Excercise2,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE', // yoga
  },
  {
    id: 'new-3',
    title: 'Full Body HIIT Blast',
    subtitle: '25 min',
    category: 'cardio',
    difficulty: 'hard',
    calories: 300,
    image: Excercise3,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI', // cardio
  },
  {
    id: 'new-4',
    title: 'Core Crusher',
    subtitle: '10 min',
    category: 'strength',
    difficulty: 'medium',
    calories: 150,
    image: Excercise4,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=1919eTCoESo', // abs
  },
  {
    id: 'new-5',
    title: 'Leg Day Burnout',
    subtitle: '30 min',
    category: 'strength',
    difficulty: 'hard',
    calories: 350,
    image: onboard2,
    Pro: true,
    url: 'https://www.youtube.com/watch?v=xWOPyldTDL4', // legs
  },
  {
    id: 'new-6',
    title: 'Relax & Recover Stretch',
    subtitle: '12 min',
    category: 'flexibility',
    difficulty: 'easy',
    calories: 60,
    image: Excercise3,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=sTANio_2E0Q', // stretching
  },
  {
    id: 'new-7',
    title: 'Fat Burning Cardio Dance',
    subtitle: '18 min',
    category: 'cardio',
    difficulty: 'medium',
    calories: 220,
    image: Excercise,
    Pro: false,
    url: 'https://www.youtube.com/watch?v=ZWk19OVon2k', // dance cardio
  },
];
