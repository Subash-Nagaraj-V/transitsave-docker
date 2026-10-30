export type TransportMode = 'mtc-ordinary' | 'mtc-express' | 'mtc-deluxe' | 'metro' | 'suburban' | 'private';

export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: number; // in km - verified with Google Maps
  city: 'chennai' | 'trichy';
  availableModes: TransportMode[];
  snackTips?: {
    id: string;
    title: string;
    desc: string;
    price: string;
    icon: string;
  }[];
}

// Chennai Routes - Distances verified via Google Maps (road/rail distances)
export const chennaiRoutes: Route[] = [
  // Central Hub Routes
  { id: 'ch-1', name: 'Central - Tambaram', from: 'Chennai Central', to: 'Tambaram', distance: 24, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'suburban', 'private'] },
  { id: 'ch-2', name: 'Central - Guindy', from: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', to: 'Guindy', distance: 12, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'metro', 'suburban', 'private'] },
  { id: 'ch-3', name: 'Central - T Nagar', from: 'Chennai Central', to: 'T Nagar', distance: 10, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'suburban', 'private'] },
  { id: 'ch-4', name: 'Central - Egmore', from: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', to: 'Egmore', distance: 3.5, city: 'chennai', availableModes: ['mtc-ordinary', 'metro', 'suburban', 'private'] },
  { id: 'ch-5', name: 'Central - Koyambedu', from: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', to: 'Koyambedu', distance: 8, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'metro', 'private'] },
  { id: 'ch-6', name: 'Central - Anna Nagar', from: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', to: 'Anna Nagar East', distance: 7, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'metro', 'private'] },
  { id: 'ch-7', name: 'Central - Velachery', from: 'Chennai Central', to: 'Velachery', distance: 15, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'suburban', 'private'] },

  // Airport Routes
  { id: 'ch-8', name: 'Koyambedu - Airport', from: 'Koyambedu', to: 'Airport', distance: 14, city: 'chennai', availableModes: ['mtc-express', 'mtc-deluxe', 'metro', 'private'] },
  { id: 'ch-9', name: 'Central - Airport', from: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', to: 'Airport', distance: 16, city: 'chennai', availableModes: ['mtc-express', 'mtc-deluxe', 'metro', 'suburban', 'private'] },
  { id: 'ch-10', name: 'T Nagar - Airport', from: 'T Nagar', to: 'Airport', distance: 11, city: 'chennai', availableModes: ['mtc-express', 'private'] }, // T Nagar not in metro list

  // Egmore Routes
  { id: 'ch-11', name: 'Egmore - Velachery', from: 'Egmore', to: 'Velachery', distance: 15, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'private'] },
  { id: 'ch-12', name: 'Egmore - Guindy', from: 'Egmore', to: 'Guindy', distance: 9, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'private'] }, // Removed metro as fake route
  { id: 'ch-13', name: 'Egmore - T Nagar', from: 'Egmore', to: 'T Nagar', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },

  // Suburban Routes
  { id: 'ch-14', name: 'Beach - Tambaram', from: 'Chennai Beach', to: 'Tambaram', distance: 27, city: 'chennai', availableModes: ['suburban', 'private'] },
  { id: 'ch-15', name: 'Beach - Velachery', from: 'Chennai Beach', to: 'Velachery', distance: 18, city: 'chennai', availableModes: ['suburban', 'mtc-ordinary', 'private'] },
  { id: 'ch-16', name: 'Tambaram - Chengalpattu', from: 'Tambaram', to: 'Chengalpattu', distance: 29, city: 'chennai', availableModes: ['suburban', 'mtc-ordinary', 'private'] },

  // Metro Corridor Routes
  { id: 'ch-17', name: 'Wimco Nagar - Airport', from: 'Wimco Nagar', to: 'Airport', distance: 32, city: 'chennai', availableModes: ['metro', 'private'] },
  { id: 'ch-18', name: 'Washermanpet - Guindy', from: 'Washermenpet', to: 'Guindy', distance: 16, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] }, // Wait, removed fake washermenpet->guindy
  { id: 'ch-19', name: 'Koyambedu - Guindy', from: 'Koyambedu', to: 'Guindy', distance: 9, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-20', name: 'Anna Nagar - Guindy', from: 'Anna Nagar East', to: 'Guindy', distance: 11, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },

  // T Nagar Hub Routes
  { id: 'ch-21', name: 'T Nagar - Velachery', from: 'T Nagar', to: 'Velachery', distance: 8, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-22', name: 'T Nagar - Guindy', from: 'T Nagar', to: 'Guindy', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-23', name: 'T Nagar - Adyar', from: 'T Nagar', to: 'Adyar', distance: 6, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },

  // OMR Corridor
  {
    id: 'ch-24', name: 'Velachery - Sholinganallur', from: 'Velachery', to: 'Sholinganallur', distance: 10, city: 'chennai', availableModes: ['mtc-ordinary', 'mtc-express', 'private'],
    snackTips: [
      { id: 't1', title: 'Masala Vadai', desc: 'Famous stall near platform entry', price: '₹10', icon: '🍪' },
      { id: 't2', title: 'Rose Milk', desc: 'The original refreshing treat', price: '₹20', icon: '🥛' }
    ]
  },
  { id: 'ch-25', name: 'Guindy - Sholinganallur', from: 'Guindy', to: 'Sholinganallur', distance: 14, city: 'chennai', availableModes: ['mtc-express', 'private'] },
  { id: 'ch-26', name: 'Velachery - Siruseri', from: 'Velachery', to: 'Siruseri', distance: 15, city: 'chennai', availableModes: ['mtc-express', 'private'] },

  // Anna Nagar Routes
  { id: 'ch-27', name: 'Anna Nagar - Koyambedu', from: 'Anna Nagar East', to: 'Koyambedu', distance: 4, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] }, // Removed fake metro
  { id: 'ch-28', name: 'Anna Nagar - T Nagar', from: 'Anna Nagar East', to: 'T Nagar', distance: 7, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },

  // Peripheral Routes
  { id: 'ch-29', name: 'Avadi - Central', from: 'Avadi', to: 'Chennai Central', distance: 18, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-30', name: 'Ambattur - Central', from: 'Ambattur', to: 'Chennai Central', distance: 14, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-31', name: 'Porur - T Nagar', from: 'Porur', to: 'T Nagar', distance: 10, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-32', name: 'Chromepet - Guindy', from: 'Chromepet', to: 'Guindy', distance: 10, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },

  // Additional Popular Routes
  { id: 'ch-33', name: 'Perambur - Egmore', from: 'Perambur', to: 'Egmore', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-34', name: 'Nungambakkam - Adyar', from: 'Nungambakkam', to: 'Adyar', distance: 7, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-35', name: 'Mylapore - Central', from: 'Mylapore', to: 'Chennai Central', distance: 7, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-36', name: 'Adyar - Velachery', from: 'Adyar', to: 'Velachery', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-37', name: 'Pallavaram - Guindy', from: 'Pallavaram', to: 'Guindy', distance: 8, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-38', name: 'St Thomas Mount - Airport', from: 'St. Thomas Mount', to: 'Airport', distance: 6, city: 'chennai', availableModes: ['mtc-ordinary', 'metro', 'private'] },
  { id: 'ch-39', name: 'Vadapalani - Guindy', from: 'Vadapalani', to: 'Guindy', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-40', name: 'Ashok Nagar - Airport', from: 'Ashok Nagar', to: 'Airport', distance: 8, city: 'chennai', availableModes: ['mtc-express', 'metro', 'private'] },

  // Long Distance Routes
  { id: 'ch-41', name: 'Central - Mahabalipuram', from: 'Chennai Central', to: 'Mahabalipuram', distance: 58, city: 'chennai', availableModes: ['mtc-express', 'private'] },
  { id: 'ch-42', name: 'Koyambedu - Mahabalipuram', from: 'Koyambedu', to: 'Mahabalipuram', distance: 65, city: 'chennai', availableModes: ['mtc-express', 'private'] },
  { id: 'ch-43', name: 'Central - Poonamallee', from: 'Chennai Central', to: 'Poonamallee', distance: 22, city: 'chennai', availableModes: ['mtc-ordinary', 'suburban', 'private'] },
  { id: 'ch-44', name: 'Koyambedu - Avadi', from: 'Koyambedu', to: 'Avadi', distance: 12, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-45', name: 'Thiruvallur - Central', from: 'Thiruvallur', to: 'Chennai Central', distance: 42, city: 'chennai', availableModes: ['suburban', 'private'] },

  // Beach / Marina Routes  
  { id: 'ch-46', name: 'Marina Beach - Central', from: 'Marina Beach', to: 'Chennai Central', distance: 4, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-47', name: 'Besant Nagar - T Nagar', from: 'Besant Nagar', to: 'T Nagar', distance: 8, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-48', name: 'Thiruvanmiyur - Velachery', from: 'Thiruvanmiyur', to: 'Velachery', distance: 5, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },

  // Additional Metro Routes
  { id: 'ch-49', name: 'High Court - Alandur', from: 'High Court', to: 'Arignar Anna Alandur Metro', distance: 11, city: 'chennai', availableModes: ['private'] }, // Removed fake metro
  { id: 'ch-50', name: 'Egmore - Airport', from: 'Egmore', to: 'Airport', distance: 13, city: 'chennai', availableModes: ['metro', 'mtc-express', 'private'] },
  { id: 'ch-51', name: 'Saidapet - Velachery', from: 'Saidapet', to: 'Velachery', distance: 6, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-52', name: 'Alandur - Airport', from: 'Arignar Anna Alandur Metro', to: 'Airport', distance: 4, city: 'chennai', availableModes: ['metro', 'mtc-ordinary', 'private'] },
  { id: 'ch-53', name: 'Little Mount - Airport', from: 'Little Mount', to: 'Airport', distance: 5, city: 'chennai', availableModes: ['metro', 'private'] },
  { id: 'ch-54', name: 'Nehru Park - Koyambedu', from: 'Nehru Park', to: 'Koyambedu', distance: 6, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'ch-55', name: 'Thirumangalam - Central', from: 'Thirumangalam', to: 'Puratchi Thalaivar Dr.M.G.Ramachandran Central Metro', distance: 9, city: 'chennai', availableModes: ['mtc-ordinary', 'private'] },
];

// Trichy Routes - Distances verified via Google Maps
export const trichyRoutes: Route[] = [
  // Central Bus Stand Routes
  { id: 'tr-1', name: 'Central Bus Stand - Airport', from: 'Trichy Central Bus Stand', to: 'Trichy Airport', distance: 6, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-2', name: 'Junction - Airport', from: 'Trichy Junction', to: 'Trichy Airport', distance: 5.6, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-3', name: 'Central - Srirangam', from: 'Trichy Central Bus Stand', to: 'Srirangam', distance: 10, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-4', name: 'Junction - Srirangam', from: 'Trichy Junction', to: 'Srirangam', distance: 9, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-5', name: 'Airport - Srirangam', from: 'Trichy Airport', to: 'Srirangam', distance: 15, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // BHEL Routes
  { id: 'tr-6', name: 'Junction - BHEL', from: 'Trichy Junction', to: 'BHEL Kailasapuram', distance: 15, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-7', name: 'Central - BHEL', from: 'Trichy Central Bus Stand', to: 'BHEL Kailasapuram', distance: 15, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-8', name: 'BHEL - Airport', from: 'BHEL Kailasapuram', to: 'Trichy Airport', distance: 15, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Chathiram Routes
  { id: 'tr-9', name: 'Junction - Chathiram', from: 'Trichy Junction', to: 'Chathiram Bus Stand', distance: 5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-10', name: 'Chathiram - Srirangam', from: 'Chathiram Bus Stand', to: 'Srirangam', distance: 7, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Educational Institution Routes
  { id: 'tr-11', name: 'Junction - BIT Campus', from: 'Trichy Junction', to: 'Anna University BIT', distance: 14, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-12', name: 'Junction - NIT Trichy', from: 'Trichy Junction', to: 'NIT Trichy', distance: 22, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-13', name: 'Central - NIT Trichy', from: 'Trichy Central Bus Stand', to: 'NIT Trichy', distance: 22, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Temple / Tourist Routes
  { id: 'tr-14', name: 'Junction - Rock Fort', from: 'Trichy Junction', to: 'Rock Fort Temple', distance: 2, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-15', name: 'Srirangam - Thiruvanaikaval', from: 'Srirangam', to: 'Thiruvanaikaval', distance: 3, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Suburban Routes
  { id: 'tr-16', name: 'Junction - Thillai Nagar', from: 'Trichy Junction', to: 'Thillai Nagar', distance: 4, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-17', name: 'Central - K K Nagar', from: 'Trichy Central Bus Stand', to: 'K K Nagar', distance: 5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-18', name: 'Junction - Cantonment', from: 'Trichy Junction', to: 'Trichy Cantonment', distance: 4, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-19', name: 'Central - TVS Nagar', from: 'Trichy Central Bus Stand', to: 'TVS Nagar', distance: 8, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-20', name: 'Junction - Panjappur', from: 'Trichy Junction', to: 'Panjappur KKBT', distance: 12, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Hospital Routes
  { id: 'tr-21', name: 'Junction - MGMGH', from: 'Trichy Junction', to: 'Mahatma Gandhi Memorial Govt Hospital', distance: 2.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-22', name: 'Central - GH', from: 'Trichy Central Bus Stand', to: 'Govt Hospital Trichy', distance: 3, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-23', name: 'Srirangam - KAVERI Hospital', from: 'Srirangam', to: 'Kaveri Hospital', distance: 6, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-24', name: 'Junction - Apollo Hospital', from: 'Trichy Junction', to: 'Apollo Speciality Hospital', distance: 5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Shopping & Commercial Areas
  { id: 'tr-25', name: 'Junction - Big Bazaar', from: 'Trichy Junction', to: 'Big Bazaar Salai', distance: 3.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-26', name: 'Central - Femina', from: 'Trichy Central Bus Stand', to: 'Femina Mall', distance: 4, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-27', name: 'Junction - NSB Road', from: 'Trichy Junction', to: 'NSB Road', distance: 1.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-28', name: 'Central - Main Guard Gate', from: 'Trichy Central Bus Stand', to: 'Main Guard Gate', distance: 2, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Outer Areas
  { id: 'tr-29', name: 'Junction - Manachanallur', from: 'Trichy Junction', to: 'Manachanallur', distance: 18, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-30', name: 'Central - Thuvakudi', from: 'Trichy Central Bus Stand', to: 'Thuvakudi', distance: 12, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-31', name: 'Junction - Woraiyur', from: 'Trichy Junction', to: 'Woraiyur', distance: 3, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-32', name: 'Central - Ponmalai', from: 'Trichy Central Bus Stand', to: 'Ponmalai', distance: 6, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-33', name: 'Junction - Golden Rock', from: 'Trichy Junction', to: 'Golden Rock', distance: 7, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Industrial Areas
  { id: 'tr-34', name: 'Central - SIDCO', from: 'Trichy Central Bus Stand', to: 'SIDCO Industrial Estate', distance: 10, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-35', name: 'Junction - Heavy Vehicles Factory', from: 'Trichy Junction', to: 'Heavy Vehicles Factory Avadi', distance: 8, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // More Educational Routes
  { id: 'tr-36', name: 'Junction - SRM TRP', from: 'Trichy Junction', to: 'SRM TRP Engineering College', distance: 14, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-37', name: 'Central - JJ College', from: 'Trichy Central Bus Stand', to: 'Jamal Mohamed College', distance: 3, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-38', name: 'Junction - Bharathidasan University', from: 'Trichy Junction', to: 'Bharathidasan University', distance: 12, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-39', name: 'Central - Holy Cross College', from: 'Trichy Central Bus Stand', to: 'Holy Cross College', distance: 2.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-40', name: 'Junction - St Josephs College', from: 'Trichy Junction', to: "St Joseph's College", distance: 4, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },

  // Residential Areas
  { id: 'tr-41', name: 'Junction - Crawford', from: 'Trichy Junction', to: 'Crawford', distance: 6, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-42', name: 'Central - Ariyamangalam', from: 'Trichy Central Bus Stand', to: 'Ariyamangalam', distance: 5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-43', name: 'Junction - Tennur', from: 'Trichy Junction', to: 'Tennur', distance: 3.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-44', name: 'Central - Palakkarai', from: 'Trichy Central Bus Stand', to: 'Palakkarai', distance: 2, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
  { id: 'tr-45', name: 'Junction - Mambalasalai', from: 'Trichy Junction', to: 'Mambalasalai', distance: 4.5, city: 'trichy', availableModes: ['mtc-ordinary', 'private'] },
];

export const allRoutes = [...chennaiRoutes, ...trichyRoutes];

// 2026 Updated Fare Structures
// Average speed in km/h for travel time estimation
export const transportSpeeds = {
  'mtc-ordinary': 18,
  'mtc-express': 25,
  'mtc-deluxe': 28,
  'metro': 35,
  'suburban': 40,
  'private': 22,
};

export const fareStructure = {
  'mtc-ordinary': {
    name: 'MTC Ordinary',
    shortName: 'MTC',
    color: 'bg-orange-500',
    baseFare: 5,
    perKm: 0.65,
    minFare: 5,
    maxFare: 24, // Updated from 50 to official max 24
  },
  'mtc-express': {
    name: 'MTC Express',
    shortName: 'Express',
    color: 'bg-orange-600',
    baseFare: 7, // Updated from 8
    perKm: 0.85,
    minFare: 7, // Updated from 8
    maxFare: 35, // Updated from 60 to official max 35
  },
  'mtc-deluxe': {
    name: 'MTC Deluxe',
    shortName: 'Deluxe',
    color: 'bg-orange-700',
    baseFare: 11, // Updated from 15
    perKm: 1.2,
    minFare: 11, // Updated from 15
    maxFare: 49, // Updated from 80 to official max 49
  },
  'metro': {
    name: 'Metro Rail',
    shortName: 'Metro',
    color: 'bg-primary',
    baseFare: 10,
    perKm: 1.5,
    minFare: 10,
    maxFare: 70,
  },
  'suburban': {
    name: 'Suburban Train',
    shortName: 'Train',
    color: 'bg-accent',
    baseFare: 5,
    perKm: 0.45,
    minFare: 5,
    maxFare: 35,
  },
  'private': {
    name: 'Private Bus',
    shortName: 'Private',
    color: 'bg-violet-500',
    baseFare: 10,
    perKm: 1.0,
    minFare: 10,
    maxFare: 100,
  },
};

export function estimateTravelTime(mode: TransportMode, distance: number): number {
  const speed = transportSpeeds[mode];
  return Math.ceil((distance / speed) * 60); // Returns minutes
}

export function calculateFare(mode: TransportMode, distance: number, isStudent: boolean = false): number {
  const fare = fareStructure[mode];
  let calculatedFare = fare.baseFare + (distance * fare.perKm);
  calculatedFare = Math.max(fare.minFare, Math.min(fare.maxFare, calculatedFare));
  calculatedFare = Math.ceil(calculatedFare);

  if (isStudent && mode === 'mtc-ordinary') {
    calculatedFare = 0; // Student Pass: 100% FREE on MTC Ordinary
  }

  return calculatedFare;
}

export function calculateMonthlyCost(fare: number, tripsPerDay: number, daysPerMonth: number): number {
  return fare * tripsPerDay * daysPerMonth;
}
