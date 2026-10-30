/**
 * TRANSPORT IMAGE OPTIMIZATION GUIDE
 * 
 * For the best user experience, each transport image should show:
 * ✓ Vehicle only (no background clutter)
 * ✓ No people in frame
 * ✓ Clear vehicle identification
 * ✓ Side or 3/4 angle view (best for identification)
 * ✓ High contrast against background
 * ✓ Daylight/clear visibility
 * 
 * RECOMMENDED IMAGES FOR TAMIL NADU TRANSPORT:
 * 
 * 1. MTC ORDINARY BUS (Pink/Red)
 *    - Color: Bright Pink or Red
 *    - Markings: "MTC" clearly visible
 *    - Type: Standard city bus
 *    - Suggested: Side view of empty bus
 *    - NOT: Bus full of people, crowded streets
 * 
 * 2. MTC EXPRESS BUS (Green)
 *    - Color: Bright Green
 *    - Markings: "Express" or "MTC Express"
 *    - Type: Similar to ordinary but marked as express
 *    - Suggested: Clean side view
 *    - NOT: Buses with advertisements covering details
 * 
 * 3. MTC DELUXE BUS (SETC - Blue/Silver)
 *    - Color: Blue/Silver/Premium finish
 *    - Markings: "SETC" or "Deluxe" markings
 *    - Type: More modern, sleeker design
 *    - Suggested: Professional photo of clean vehicle
 *    - NOT: Used buses or vehicles at night
 * 
 * 4. METRO RAIL (Chennai Metro - Blue)
 *    - Type: Modern metro train, blue/silver color
 *    - View: Side view of train or train approaching
 *    - Setting: Clean station or track view
 *    - NOT: Overground crowds, platform full of people
 * 
 * 5. SUBURBAN TRAIN (Green/Brown - Indian Railways)
 *    - Type: Electric suburban train
 *    - Color: Green/Brown (typical Indian Railways)
 *    - View: Side angle, moving or stationary
 *    - NOT: Crowded platforms, people hanging out
 * 
 * 6. PRIVATE BUS (Typically White/Colored)
 *    - Type: Modern private coach/bus
 *    - Features: AC, comfortable seating visible
 *    - View: Clean professional photo
 *    - NOT: Old vehicles, damaged condition
 * 
 * HOW TO GET BETTER IMAGES:
 * 
 * Option 1: User Provided Images
 * - Extract/crop the vehicle portion only
 * - Use photo editing to remove people/clutter
 * - Adjust contrast and brightness
 * 
 * Option 2: Free Stock Photo Sites
 * - Unsplash (unsplash.com) - Search "MTC bus Chennai"
 * - Pexels (pexels.com) - Search "public transport India"
 * - Pixabay (pixabay.com) - Search "metro rail train"
 * 
 * Option 3: Copyright-Free Sources
 * - Wikimedia Commons: "Chennai Metro", "MTC buses"
 * - Government transport websites
 * - Travel blogs with transport photos
 * 
 * IMAGE PATH STRUCTURE:
 * /public/images/
 *   - Government Bus (PINK).webp    (MTC Ordinary)
 *   - Express Bus (Green).webp      (MTC Express)
 *   - Deluxe Bus (SETC).webp        (MTC Deluxe)
 *   - Metro Rail.avif               (Chennai Metro)
 *   - SubUrban Train.webp           (Suburban)
 *   - Private Bus.webp              (Private transport)
 */

export const imageQualityCheckList = {
  'mtc-ordinary': {
    name: 'MTC Ordinary Bus',
    quality: 'Needs clean pink/red bus photo without people',
    recommendations: [
      'Show full vehicle side view',
      'Crop out crowds and passengers',
      'Ensure MTC markings are visible',
      'Use daytime photo for clarity'
    ]
  },
  'mtc-express': {
    name: 'MTC Express Bus',
    quality: 'Needs clean green bus photo',
    recommendations: [
      'Green colored bus clearly visible',
      'Side angle preferred',
      'No people leaning out or windows',
      'Clear "Express" or "MTC" markings'
    ]
  },
  'mtc-deluxe': {
    name: 'MTC Deluxe/SETC Bus',
    quality: 'Needs premium bus photo',
    recommendations: [
      'Modern, well-maintained vehicle',
      'Blue/Silver/professional color',
      'Sleeker design than ordinary buses',
      'Clean, professional appearance'
    ]
  },
  'metro': {
    name: 'Chennai Metro Rail',
    quality: 'Needs clean metro train photo',
    recommendations: [
      'Blue/modern colored train',
      'Station or track view',
      'Moving or stationary acceptable',
      'No crowded platform scenes'
    ]
  },
  'suburban': {
    name: 'Suburban Train',
    quality: 'Needs clean train photo',
    recommendations: [
      'Green/brown Indian Railways colors',
      'Side view of full train or coaches',
      'Electric trains preferred',
      'No overflowing crowds'
    ]
  },
  'private': {
    name: 'Private Bus',
    quality: 'Needs modern coach/bus photo',
    recommendations: [
      'Well-maintained vehicle',
      'Modern design',
      'AC coach preferred',
      'Professional appearance'
    ]
  }
};
