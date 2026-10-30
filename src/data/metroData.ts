// Chennai Metro Rail - Official Data

export interface MetroStation {
  id: string;
  name: string;
  line: 'blue' | 'green';
  order: number;
  isInterchange: boolean;
}

export interface MetroRoute {
  fromStation: string;
  toStation: string;
  fare: number; // in rupees
  directRoute: boolean;
  routeType: 'same-line' | 'interchange';
  line?: 'blue' | 'green';
  interchangeStation?: string;
  error?: string;
}

// BLUE LINE STATIONS (Line 1)
export const blueLineStations: MetroStation[] = [
  { id: 'air', name: 'Airport', line: 'blue', order: 1, isInterchange: false },
  { id: 'mee', name: 'Meenambakkam', line: 'blue', order: 2, isInterchange: false },
  { id: 'nan', name: 'Nanganallur Road', line: 'blue', order: 3, isInterchange: false },
  { id: 'ala', name: 'Arignar Anna Alandur Metro', line: 'blue', order: 4, isInterchange: true },
  { id: 'gui', name: 'Guindy', line: 'blue', order: 5, isInterchange: false },
  { id: 'lim', name: 'Little Mount', line: 'blue', order: 6, isInterchange: false },
  { id: 'sai', name: 'Saidapet', line: 'blue', order: 7, isInterchange: false },
  { id: 'nan2', name: 'Nandanam', line: 'blue', order: 8, isInterchange: false },
  { id: 'tey', name: 'Teynampet', line: 'blue', order: 9, isInterchange: false },
  { id: 'agd', name: 'AG-DMS', line: 'blue', order: 10, isInterchange: false },
  { id: 'tho', name: 'Thousand Lights', line: 'blue', order: 11, isInterchange: false },
  { id: 'lic', name: 'LIC', line: 'blue', order: 12, isInterchange: false },
  { id: 'gov', name: 'Government Estate', line: 'blue', order: 13, isInterchange: false },
  { id: 'cen', name: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', line: 'blue', order: 14, isInterchange: false },
  { id: 'hic', name: 'High Court', line: 'blue', order: 15, isInterchange: false },
  { id: 'man', name: 'Mannadi', line: 'blue', order: 16, isInterchange: false },
  { id: 'was', name: 'Washermenpet', line: 'blue', order: 17, isInterchange: false },
  { id: 'thy', name: 'Thyagaraya College', line: 'blue', order: 18, isInterchange: false },
  { id: 'ton', name: 'Tondiarpet', line: 'blue', order: 19, isInterchange: false },
  { id: 'new', name: 'New Washermenpet', line: 'blue', order: 20, isInterchange: false },
  { id: 'tol', name: 'Toll Gate', line: 'blue', order: 21, isInterchange: false },
  { id: 'kal', name: 'Kaladipet', line: 'blue', order: 22, isInterchange: false },
  { id: 'tht', name: 'Thiruvotriyur Theredi', line: 'blue', order: 23, isInterchange: false },
  { id: 'thv', name: 'Thiruvotriyur', line: 'blue', order: 24, isInterchange: false },
  { id: 'wim', name: 'Wimco Nagar', line: 'blue', order: 25, isInterchange: false },
  { id: 'wimd', name: 'Wimco Nagar Depot', line: 'blue', order: 26, isInterchange: false },
];

// GREEN LINE STATIONS (Line 2)
export const greenLineStations: MetroStation[] = [
  { id: 'stm', name: 'St. Thomas Mount', line: 'green', order: 1, isInterchange: false },
  { id: 'ekk', name: 'Ekkattuthangal', line: 'green', order: 2, isInterchange: false },
  { id: 'ash', name: 'Ashok Nagar', line: 'green', order: 3, isInterchange: false },
  { id: 'vad', name: 'Vadapalani', line: 'green', order: 4, isInterchange: false },
  { id: 'aru', name: 'Arumbakkam', line: 'green', order: 5, isInterchange: false },
  { id: 'cmb', name: 'Puratchi Thalaivi Dr.J.Jayalalitha CMBT Metro', line: 'green', order: 6, isInterchange: false },
  { id: 'koy', name: 'Koyambedu', line: 'green', order: 7, isInterchange: false },
  { id: 'thi', name: 'Thirumangalam', line: 'green', order: 8, isInterchange: false },
  { id: 'ant', name: 'Anna Nagar Tower', line: 'green', order: 9, isInterchange: false },
  { id: 'ane', name: 'Anna Nagar East', line: 'green', order: 10, isInterchange: false },
  { id: 'she', name: 'Shenoy Nagar', line: 'green', order: 11, isInterchange: false },
  { id: 'pac', name: 'Pachiappas College', line: 'green', order: 12, isInterchange: false },
  { id: 'kil', name: 'Kilpauk', line: 'green', order: 13, isInterchange: false },
  { id: 'neh', name: 'Nehru Park', line: 'green', order: 14, isInterchange: false },
  { id: 'ego', name: 'Egmore', line: 'green', order: 15, isInterchange: false },
];

// All stations combined
export const allMetroStations: MetroStation[] = [...blueLineStations, ...greenLineStations];

// OFFICIAL FARE CHART - All fares from official Chennai Metro
export const metroFareChart: Record<string, number> = {
  'Airport→Meenambakkam': 10,
  'Airport→Nanganallur Road': 20,
  'Airport→Arignar Anna Alandur Metro': 20, // Replaced Alandur from old chart just to be safe
  'Airport→Guindy': 30,
  'Airport→Little Mount': 30,
  'Airport→Saidapet': 30,
  'Airport→Nandanam': 30,
  'Airport→Teynampet': 30,
  'Airport→AG-DMS': 40,
  'Airport→Thousand Lights': 40,
  'Airport→LIC': 40,
  'Airport→Government Estate': 40,
  'Airport→Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro': 40,
  'Airport→High Court': 40,
  'Airport→Mannadi': 40,
  'Airport→Washermenpet': 50,
  'Airport→Thyagaraya College': 50,
  'Airport→Tondiarpet': 50,
  'Airport→New Washermenpet': 50,
  'Airport→Toll Gate': 50,
  'Airport→Kaladipet': 50,
  'Airport→Thiruvotriyur Theredi': 50,
  'Airport→Thiruvotriyur': 50,
  'Airport→Wimco Nagar': 50,
  'Airport→Wimco Nagar Depot': 50,
  'Airport→St. Thomas Mount': 30,
  'Airport→Ekkattuthangal': 30,
  'Airport→Ashok Nagar': 30,
  'Airport→Vadapalani': 30,
  'Airport→Arumbakkam': 30,
  'Airport→Puratchi Thalaivi Dr.J.Jayalalitha CMBT Metro': 40, // Replaced CMBT
  'Airport→Koyambedu': 40,
  'Airport→Thirumangalam': 40,
  'Airport→Anna Nagar Tower': 40,
  'Airport→Anna Nagar East': 40,
  'Airport→Shenoy Nagar': 40,
  'Airport→Pachiappas College': 40,
  'Airport→Kilpauk': 50,
  'Airport→Nehru Park': 50,
  'Airport→Egmore': 50,
};

// Map old names if they appear in the original chart to strictly enforce 'Alandur' -> 'Arignar Anna Alandur Metro' in the chart keys mapping
const mapToOfficialStationName = (name: string): string => {
  if (name === 'Alandur') return 'Arignar Anna Alandur Metro';
  if (name === 'CMBT') return 'Puratchi Thalaivi Dr.J.Jayalalitha CMBT Metro';
  if (name === 'Central Metro') return 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro';
  return name;
};

// Helper function to get fare between two stations
export function getMetroFare(fromStation: string, toStation: string): number | null {
  const fName = mapToOfficialStationName(fromStation);
  const tName = mapToOfficialStationName(toStation);
  const key = `${fName}→${tName}`;
  const reverseKey = `${tName}→${fName}`;

  return metroFareChart[key] || metroFareChart[reverseKey] || null;
}

// Helper function to find station by name
export function findMetroStation(stationName: string): MetroStation | null {
  const mappedName = mapToOfficialStationName(stationName);
  return allMetroStations.find(
    station => station.name.toLowerCase() === mappedName.toLowerCase()
  ) || null;
}

// Helper function to get route between two stations
export function getMetroRoute(fromStationName: string, toStationName: string): MetroRoute | null {
  const fName = mapToOfficialStationName(fromStationName);
  const tName = mapToOfficialStationName(toStationName);

  const fromStation = findMetroStation(fName);
  const toStation = findMetroStation(tName);

  if (!fromStation || !toStation) {
    return {
      fromStation: fromStationName,
      toStation: toStationName,
      fare: 0,
      directRoute: false,
      routeType: 'same-line',
      error: "This station is not part of the Chennai Metro network. Please check the station name and try again."
    };
  }

  if (fromStation.id === toStation.id) {
    return null; // Same station
  }

  const fare = getMetroFare(fromStation.name, toStation.name);

  if (!fare) {
    return {
      fromStation: fromStation.name,
      toStation: toStation.name,
      fare: 0,
      directRoute: false,
      routeType: 'same-line', // fallback
      error: "No direct metro route available between these stations."
    };
  }

  // Same line route
  if (fromStation.line === toStation.line) {
    return {
      fromStation: fromStation.name,
      toStation: toStation.name,
      fare,
      directRoute: true,
      routeType: 'same-line',
      line: fromStation.line,
    };
  }

  // Different line - requires interchange at Arignar Anna Alandur Metro
  return {
    fromStation: fromStation.name,
    toStation: toStation.name,
    fare,
    directRoute: false,
    routeType: 'interchange',
    interchangeStation: 'Arignar Anna Alandur Metro',
  };
}
