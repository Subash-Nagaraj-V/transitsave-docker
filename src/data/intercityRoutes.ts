export type IntercityMode = 'government-bus' | 'private-bus' | 'train-sleeper' | 'train-ac' | 'flight';

export interface IntercityRoute {
  id: string;
  from: string;
  to: string;
  distance: number; // in km
  modes: {
    mode: IntercityMode;
    fare: number;
    duration: string; // e.g., "5h 30m"
    frequency: string; // e.g., "Every 30 mins"
  }[];
}

export const intercityModeInfo: Record<IntercityMode, { 
  name: string; 
  nameKey: string;
  icon: string; 
  color: string;
  bgColor: string;
}> = {
  'government-bus': { 
    name: 'Govt Bus', 
    nameKey: 'intercity.govtBus',
    icon: '🚌', 
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10'
  },
  'private-bus': { 
    name: 'Private Bus', 
    nameKey: 'intercity.privateBus',
    icon: '🚐', 
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-500/10'
  },
  'train-sleeper': { 
    name: 'Train (Sleeper)', 
    nameKey: 'intercity.trainSleeper',
    icon: '🚃', 
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  'train-ac': { 
    name: 'Train (AC)', 
    nameKey: 'intercity.trainAC',
    icon: '🚄', 
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  },
  'flight': { 
    name: 'Flight', 
    nameKey: 'intercity.flight',
    icon: '✈️', 
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-500/10'
  },
};

// Intercity routes with 2026 estimated fares
export const intercityRoutes: IntercityRoute[] = [
  {
    id: 'trichy-chennai',
    from: 'Trichy',
    to: 'Chennai',
    distance: 330,
    modes: [
      { mode: 'government-bus', fare: 350, duration: '6h', frequency: 'Every 30 mins' },
      { mode: 'private-bus', fare: 550, duration: '5h 30m', frequency: 'Every 15 mins' },
      { mode: 'train-sleeper', fare: 250, duration: '5h 30m', frequency: '8 trains/day' },
      { mode: 'train-ac', fare: 650, duration: '4h 30m', frequency: '5 trains/day' },
      { mode: 'flight', fare: 3500, duration: '50m', frequency: '4 flights/day' },
    ]
  },
  {
    id: 'chennai-trichy',
    from: 'Chennai',
    to: 'Trichy',
    distance: 330,
    modes: [
      { mode: 'government-bus', fare: 350, duration: '6h', frequency: 'Every 30 mins' },
      { mode: 'private-bus', fare: 550, duration: '5h 30m', frequency: 'Every 15 mins' },
      { mode: 'train-sleeper', fare: 250, duration: '5h 30m', frequency: '8 trains/day' },
      { mode: 'train-ac', fare: 650, duration: '4h 30m', frequency: '5 trains/day' },
      { mode: 'flight', fare: 3500, duration: '50m', frequency: '4 flights/day' },
    ]
  },
  {
    id: 'trichy-bangalore',
    from: 'Trichy',
    to: 'Bangalore',
    distance: 342,
    modes: [
      { mode: 'government-bus', fare: 400, duration: '7h 30m', frequency: 'Every hour' },
      { mode: 'private-bus', fare: 700, duration: '7h', frequency: 'Every 30 mins' },
      { mode: 'train-sleeper', fare: 280, duration: '7h', frequency: '4 trains/day' },
      { mode: 'train-ac', fare: 750, duration: '6h', frequency: '3 trains/day' },
      { mode: 'flight', fare: 4000, duration: '50m', frequency: '3 flights/day' },
    ]
  },
  {
    id: 'bangalore-trichy',
    from: 'Bangalore',
    to: 'Trichy',
    distance: 342,
    modes: [
      { mode: 'government-bus', fare: 400, duration: '7h 30m', frequency: 'Every hour' },
      { mode: 'private-bus', fare: 700, duration: '7h', frequency: 'Every 30 mins' },
      { mode: 'train-sleeper', fare: 280, duration: '7h', frequency: '4 trains/day' },
      { mode: 'train-ac', fare: 750, duration: '6h', frequency: '3 trains/day' },
      { mode: 'flight', fare: 4000, duration: '50m', frequency: '3 flights/day' },
    ]
  },
  {
    id: 'chennai-bangalore',
    from: 'Chennai',
    to: 'Bangalore',
    distance: 350,
    modes: [
      { mode: 'government-bus', fare: 450, duration: '6h 30m', frequency: 'Every 20 mins' },
      { mode: 'private-bus', fare: 800, duration: '6h', frequency: 'Every 10 mins' },
      { mode: 'train-sleeper', fare: 300, duration: '5h 30m', frequency: '12 trains/day' },
      { mode: 'train-ac', fare: 800, duration: '5h', frequency: '8 trains/day' },
      { mode: 'flight', fare: 3000, duration: '55m', frequency: '15+ flights/day' },
    ]
  },
  {
    id: 'bangalore-chennai',
    from: 'Bangalore',
    to: 'Chennai',
    distance: 350,
    modes: [
      { mode: 'government-bus', fare: 450, duration: '6h 30m', frequency: 'Every 20 mins' },
      { mode: 'private-bus', fare: 800, duration: '6h', frequency: 'Every 10 mins' },
      { mode: 'train-sleeper', fare: 300, duration: '5h 30m', frequency: '12 trains/day' },
      { mode: 'train-ac', fare: 800, duration: '5h', frequency: '8 trains/day' },
      { mode: 'flight', fare: 3000, duration: '55m', frequency: '15+ flights/day' },
    ]
  },
];

export const cities = ['Chennai', 'Trichy', 'Bangalore'] as const;
export type City = typeof cities[number];