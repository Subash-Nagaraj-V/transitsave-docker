// Chennai Metro Official Routes with Fares from Official Fare Chart
import { getMetroRoute, findMetroStation, allMetroStations } from './metroData';

export interface MetroRouteInfo {
  id: string;
  from: string;
  to: string;
  fare: number;
  duration: string;
  line?: 'blue' | 'green';
  routeType: 'same-line' | 'interchange';
  interchangeStation?: string;
}

// All stations from official Chennai Metro network
export const metroRoutes: MetroRouteInfo[] = [
  // BLUE LINE (Line 1) - Airport to Wimco Nagar Depot
  // Selected key metro routes with official fares

  // Airport routes
  { id: 'metro-1', from: 'Airport', to: 'Meenambakkam', fare: 10, duration: '5 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-2', from: 'Airport', to: 'Nanganallur Road', fare: 20, duration: '8 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-3', from: 'Airport', to: 'Arignar Anna Alandur Metro', fare: 20, duration: '10 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-4', from: 'Airport', to: 'Guindy', fare: 30, duration: '12 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-5', from: 'Airport', to: 'Little Mount', fare: 30, duration: '14 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-6', from: 'Airport', to: 'Saidapet', fare: 30, duration: '16 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-7', from: 'Airport', to: 'Nandanam', fare: 30, duration: '18 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-8', from: 'Airport', to: 'Teynampet', fare: 30, duration: '20 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-9', from: 'Airport', to: 'AG-DMS', fare: 40, duration: '22 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-10', from: 'Airport', to: 'Thousand Lights', fare: 40, duration: '24 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-11', from: 'Airport', to: 'LIC', fare: 40, duration: '26 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-12', from: 'Airport', to: 'Government Estate', fare: 40, duration: '28 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-13', from: 'Airport', to: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', fare: 40, duration: '30 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-14', from: 'Airport', to: 'High Court', fare: 40, duration: '32 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-15', from: 'Airport', to: 'Mannadi', fare: 40, duration: '34 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-16', from: 'Airport', to: 'Washermenpet', fare: 50, duration: '36 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-17', from: 'Airport', to: 'Thyagaraya College', fare: 50, duration: '38 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-18', from: 'Airport', to: 'Tondiarpet', fare: 50, duration: '40 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-19', from: 'Airport', to: 'New Washermenpet', fare: 50, duration: '42 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-20', from: 'Airport', to: 'Toll Gate', fare: 50, duration: '44 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-21', from: 'Airport', to: 'Kaladipet', fare: 50, duration: '46 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-22', from: 'Airport', to: 'Thiruvotriyur Theredi', fare: 50, duration: '48 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-23', from: 'Airport', to: 'Thiruvotriyur', fare: 50, duration: '50 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-24', from: 'Airport', to: 'Wimco Nagar', fare: 50, duration: '52 mins', line: 'blue', routeType: 'same-line' },
  { id: 'metro-25', from: 'Airport', to: 'Wimco Nagar Depot', fare: 50, duration: '54 mins', line: 'blue', routeType: 'same-line' },

  // Airport to Green Line (via interchange)
  { id: 'metro-26', from: 'Airport', to: 'St. Thomas Mount', fare: 30, duration: '25 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-27', from: 'Airport', to: 'Ekkattuthangal', fare: 30, duration: '27 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-28', from: 'Airport', to: 'Ashok Nagar', fare: 30, duration: '29 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-29', from: 'Airport', to: 'Vadapalani', fare: 30, duration: '31 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-30', from: 'Airport', to: 'Arumbakkam', fare: 30, duration: '33 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-31', from: 'Airport', to: 'Puratchi Thalaivi Dr.J.Jayalalitha CMBT Metro', fare: 40, duration: '35 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-32', from: 'Airport', to: 'Koyambedu', fare: 40, duration: '37 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-33', from: 'Airport', to: 'Thirumangalam', fare: 40, duration: '39 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-34', from: 'Airport', to: 'Anna Nagar Tower', fare: 40, duration: '41 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-35', from: 'Airport', to: 'Anna Nagar East', fare: 40, duration: '43 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-36', from: 'Airport', to: 'Shenoy Nagar', fare: 40, duration: '45 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-37', from: 'Airport', to: 'Pachiappas College', fare: 40, duration: '47 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-38', from: 'Airport', to: 'Kilpauk', fare: 50, duration: '49 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-39', from: 'Airport', to: 'Nehru Park', fare: 50, duration: '47 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
  { id: 'metro-40', from: 'Airport', to: 'Egmore', fare: 50, duration: '45 mins (incl interchange)', routeType: 'interchange', interchangeStation: 'Arignar Anna Alandur Metro' },
];

/**
 * Get metro route information between two stations
 * @param from - Starting station name
 * @param to - Destination station name
 * @returns MetroRouteInfo or null if no direct route exists
 */
export function getMetroRouteInfo(from: string, to: string): MetroRouteInfo | null {
  return metroRoutes.find(
    route =>
      route.from.toLowerCase() === from.toLowerCase() &&
      route.to.toLowerCase() === to.toLowerCase()
  ) || null;
}

/**
 * Get all available metro stations
 */
export function getAllMetroStations() {
  return allMetroStations.map(station => station.name);
}
