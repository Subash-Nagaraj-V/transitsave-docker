import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

const translations: Translations = {
  // Hero Section
  'hero.badge': { en: '2026 Updated Fares', ta: '2026 புதுப்பிக்கப்பட்ட கட்டணங்கள்' },
  'hero.title1': { en: 'Save Money on', ta: 'ஒவ்வொரு பயணத்திலும்' },
  'hero.title2': { en: 'Every Commute', ta: 'பணம் சேமியுங்கள்' },
  'hero.description': {
    en: 'Compare fares across MTC, Metro, Train & Private buses for 100 routes in Chennai & Trichy. Find the cheapest way to travel.',
    ta: 'சென்னை மற்றும் திருச்சியில் 100 வழித்தடங்களில் MTC, மெட்ரோ, ரயில் மற்றும் தனியார் பேருந்துகளின் கட்டணங்களை ஒப்பிடுங்கள்.'
  },

  // Transport modes
  'transport.mtc': { en: 'MTC Bus', ta: 'MTC பேருந்து' },
  'transport.metro': { en: 'Metro Rail', ta: 'மெட்ரோ ரயில்' },
  'transport.suburban': { en: 'Suburban', ta: 'புறநகர் ரயில்' },
  'transport.private': { en: 'Private', ta: 'தனியார்' },

  // Stats
  'stats.routes': { en: '100 Routes', ta: '100 வழித்தடங்கள்' },
  'stats.routesDesc': { en: '55 Chennai + 45 Trichy routes with real distances', ta: '55 சென்னை + 45 திருச்சி வழித்தடங்கள்' },
  'stats.modes': { en: '6 Transport Modes', ta: '6 போக்குவரத்து முறைகள்' },
  'stats.modesDesc': { en: 'MTC (Ordinary/Express/Deluxe), Metro, Suburban, Private', ta: 'MTC (சாதாரண/எக்ஸ்பிரஸ்/டீலக்ஸ்), மெட்ரோ, புறநகர், தனியார்' },
  'stats.student': { en: 'Student Pass', ta: 'மாணவர் பாஸ்' },
  'stats.studentDesc': { en: '100% FREE on MTC Ordinary bus', ta: 'MTC சாதாரண பேருந்தில் 100% இலவசம்' },
  'stats.offline': { en: '100% Offline', ta: '100% ஆஃப்லைன்' },
  'stats.offlineDesc': { en: 'Works without internet - perfect for commuters', ta: 'இணையம் இல்லாமல் வேலை செய்யும்' },

  // Search
  'search.title': { en: 'Quick Search', ta: 'விரைவு தேடல்' },
  'search.placeholder': { en: 'Type station name (e.g. Central, T Nagar)', ta: 'நிலையத்தின் பெயரை உள்ளிடவும்' },
  'search.recent': { en: 'Recent routes', ta: 'சமீபத்திய வழித்தடங்கள்' },
  'search.noResults': { en: 'No routes found', ta: 'வழித்தடங்கள் இல்லை' },
  'search.clearRecent': { en: 'Clear recent', ta: 'சமீபத்தியவை நீக்கு' },

  // Route Selector
  'route.title': { en: 'Select Your Route', ta: 'உங்கள் வழித்தடத்தைத் தேர்ந்தெடுக்கவும்' },
  'route.city': { en: 'City', ta: 'நகரம்' },
  'route.allCities': { en: 'All Cities', ta: 'அனைத்து நகரங்கள்' },
  'route.chennai': { en: 'Chennai', ta: 'சென்னை' },
  'route.trichy': { en: 'Trichy', ta: 'திருச்சி' },
  'route.route': { en: 'Route', ta: 'வழித்தடம்' },
  'route.selectRoute': { en: 'Select route', ta: 'வழித்தடத்தைத் தேர்ந்தெடு' },
  'route.studentPass': { en: 'Student Pass', ta: 'மாணவர் பாஸ்' },
  'route.studentDiscount': { en: '100% FREE on MTC Ordinary', ta: 'MTC சாதாரணத்தில் 100% இலவசம்' },
  'route.selected': { en: 'Selected Route', ta: 'தேர்ந்தெடுக்கப்பட்ட வழி' },
  'route.distance': { en: 'Distance', ta: 'தூரம்' },
  'route.selectPrompt': { en: 'Select a route to compare fares across different transport modes', ta: 'வெவ்வேறு போக்குவரத்து முறைகளில் கட்டணங்களை ஒப்பிட வழித்தடத்தைத் தேர்ந்தெடுக்கவும்' },
  'route.orBrowse': { en: 'Or browse by city', ta: 'அல்லது நகரம் வாரியாக உலாவுக' },

  // Fare Comparison
  'fare.title': { en: 'Fare Comparison', ta: 'கட்டண ஒப்பீடு' },
  'fare.cheapest': { en: 'Cheapest', ta: 'மலிவான' },
  'fare.perTrip': { en: 'per trip', ta: 'ஒரு பயணத்திற்கு' },
  'fare.notAvailable': { en: 'Not available on this route', ta: 'இந்த வழியில் கிடைக்காது' },
  'fare.studentApplied': { en: 'Student discount applied', ta: 'மாணவர் தள்ளுபடி பயன்படுத்தப்பட்டது' },
  'fare.potentialSavings': { en: 'Choose cheapest & save', ta: 'மலிவானதை தேர்ந்தெடுத்து சேமியுங்கள்' },
  'fare.perMonth': { en: 'per month', ta: 'மாதத்திற்கு' },
  'fare.min': { en: 'min', ta: 'நிமிடம்' },

  // Share
  'share.button': { en: 'Share', ta: 'பகிர்' },
  'share.copy': { en: 'Copy to clipboard', ta: 'நகலெடு' },
  'share.copied': { en: 'Copied!', ta: 'நகலெடுக்கப்பட்டது!' },

  // Calculator
  'calc.title': { en: 'Custom Calculator', ta: 'தனிப்பயன் கால்குலேட்டர்' },
  'calc.description': { en: 'Calculate and compare monthly costs for any distance', ta: 'எந்த தூரத்திற்கும் மாதாந்திர செலவுகளை கணக்கிடுங்கள்' },
  'calc.distance': { en: 'Distance (km)', ta: 'தூரம் (கி.மீ)' },
  'calc.trips': { en: 'Trips/Day', ta: 'பயணங்கள்/நாள்' },
  'calc.days': { en: 'Days/Month', ta: 'நாட்கள்/மாதம்' },
  'calc.calculate': { en: 'Calculate', ta: 'கணக்கிடு' },
  'calc.monthly': { en: 'Monthly Cost Comparison', ta: 'மாதாந்திர செலவு ஒப்பீடு' },
  'calc.save': { en: 'Save', ta: 'சேமிப்பு' },

  // Footer
  'footer.compare': { en: 'Compare fares across Chennai & Trichy', ta: 'சென்னை & திருச்சி கட்டணங்களை ஒப்பிடுங்கள்' },
  'footer.verified': { en: 'Distances verified via Google Maps • 2026 Updated Fares', ta: 'Google Maps மூலம் சரிபார்க்கப்பட்ட தூரங்கள் • 2026 புதுப்பிக்கப்பட்ட கட்டணங்கள்' },

  // Intercity Comparison
  'intercity.badge': { en: 'Intercity Travel', ta: 'நகரங்களுக்கிடையேயான பயணம்' },
  'intercity.title': { en: 'Compare Intercity Travel', ta: 'நகரங்களுக்கிடையேயான பயணத்தை ஒப்பிடுங்கள்' },
  'intercity.description': { en: 'Find the cheapest way to travel between major cities', ta: 'முக்கிய நகரங்களுக்கிடையே பயணிக்க மலிவான வழியைக் கண்டறியுங்கள்' },
  'intercity.from': { en: 'From', ta: 'இருந்து' },
  'intercity.to': { en: 'To', ta: 'வரை' },
  'intercity.distance': { en: 'Distance', ta: 'தூரம்' },
  'intercity.govtBus': { en: 'Govt Bus', ta: 'அரசு பேருந்து' },
  'intercity.privateBus': { en: 'Private Bus', ta: 'தனியார் பேருந்து' },
  'intercity.trainSleeper': { en: 'Train (Sleeper)', ta: 'ரயில் (ஸ்லீப்பர்)' },
  'intercity.trainAC': { en: 'Train (AC)', ta: 'ரயில் (ஏசி)' },
  'intercity.flight': { en: 'Flight', ta: 'விமானம்' },
  'intercity.tip': { en: 'Pro Tip', ta: 'குறிப்பு' },
  'intercity.tipText': { en: 'Take', ta: 'எடுத்துக்கொள்ளுங்கள்' },
  'intercity.tipSave': { en: 'to save up to', ta: 'சேமிக்க' },
  'intercity.perTrip': { en: 'per trip', ta: 'ஒரு பயணத்திற்கு' },

  // Install Page
  'install.title': { en: 'Install Transit Save', ta: 'Transit Save நிறுவு' },
  'install.description': { en: 'Add to your home screen for quick access', ta: 'விரைவான அணுகலுக்கு முகப்புத் திரையில் சேர்க்கவும்' },
  'install.installed': { en: 'Already Installed!', ta: 'ஏற்கனவே நிறுவப்பட்டது!' },
  'install.installedDesc': { en: 'Transit Save is ready to use from your home screen', ta: 'Transit Save உங்கள் முகப்புத் திரையிலிருந்து பயன்படுத்த தயாராக உள்ளது' },
  'install.iosTitle': { en: 'Install on iPhone/iPad', ta: 'iPhone/iPad இல் நிறுவவும்' },
  'install.iosDesc': { en: 'Follow these simple steps', ta: 'இந்த எளிய படிகளைப் பின்பற்றவும்' },
  'install.step1': { en: 'Tap the Share button', ta: 'பகிர் பொத்தானை தட்டவும்' },
  'install.tapShare': { en: 'At the bottom of your browser', ta: 'உங்கள் உலாவியின் கீழே' },
  'install.step2': { en: 'Scroll and find', ta: 'கீழே உருட்டி கண்டுபிடிக்கவும்' },
  'install.addHome': { en: 'Add to Home Screen', ta: 'முகப்புத் திரையில் சேர்' },
  'install.step3': { en: 'Confirm installation', ta: 'நிறுவலை உறுதிப்படுத்தவும்' },
  'install.tapAdd': { en: 'Tap Add in the top right', ta: 'மேல் வலதுபுறத்தில் சேர் என்பதை தட்டவும்' },
  'install.button': { en: 'Install App', ta: 'பயன்பாட்டை நிறுவு' },
  'install.androidTitle': { en: 'Install on Android', ta: 'Android இல் நிறுவவும்' },
  'install.androidDesc': { en: 'Follow these simple steps', ta: 'இந்த எளிய படிகளைப் பின்பற்றவும்' },
  'install.openMenu': { en: 'Open browser menu', ta: 'உலாவி மெனுவைத் திறக்கவும்' },
  'install.tapMenu': { en: 'Tap the three dots', ta: 'மூன்று புள்ளிகளை தட்டவும்' },
  'install.selectInstall': { en: 'Select Install App', ta: 'பயன்பாட்டை நிறுவு என்பதைத் தேர்ந்தெடுக்கவும்' },
  'install.installApp': { en: 'Or "Add to Home Screen"', ta: 'அல்லது "முகப்புத் திரையில் சேர்"' },
  'install.whyInstall': { en: 'Why Install?', ta: 'ஏன் நிறுவ வேண்டும்?' },
  'install.feature1': { en: 'Offline Access', ta: 'ஆஃப்லைன் அணுகல்' },
  'install.feature1Desc': { en: 'Works without internet', ta: 'இணையம் இல்லாமல் வேலை செய்யும்' },
  'install.feature2': { en: 'One-tap Access', ta: 'ஒரே தட்டில் அணுகல்' },
  'install.feature2Desc': { en: 'Launch from home screen', ta: 'முகப்புத் திரையிலிருந்து தொடங்கு' },
  'install.feature3': { en: 'No App Store', ta: 'App Store இல்லை' },
  'install.feature3Desc': { en: 'Install directly', ta: 'நேரடியாக நிறுவு' },
  'install.feature4': { en: 'Fast & Light', ta: 'வேகமான & இலகுவான' },
  'install.feature4Desc': { en: 'Under 1MB size', ta: '1MB க்கும் குறைவான அளவு' },
  'install.backHome': { en: '← Back to Home', ta: '← முகப்புக்குத் திரும்பு' },

  // Cities
  'city.chennai': { en: 'Chennai', ta: 'சென்னை' },
  'city.trichy': { en: 'Trichy', ta: 'திருச்சி' },

  // Newcomer/Tourist Features
  'tourist.conductor.btn': { en: 'Show Conductor', ta: 'நடத்துனரிடம் காட்டவும்' },
  'tourist.conductor.title': { en: 'Commute Card', ta: 'பயண அட்டை' },
  'tourist.conductor.request': { en: 'I want a ticket to:', ta: 'எனக்கு இங்கே செல்ல ஒரு டிக்கெட் வேண்டும்:' },
  'tourist.conductor.fareNotice': { en: 'Expected Fare: ₹{val}', ta: 'எதிர்பார்க்கப்படும் கட்டணம்: ₹{val}' },
  'tourist.weather.comfort': { en: 'Comfort Choice', ta: 'வசதியான தேர்வு' },
  'tourist.weather.hot': { en: 'It is hot! Consider AC Deluxe or Metro for comfort.', ta: 'வெயில் அதிகமாக உள்ளது! ஏசி டீலக்ஸ் அல்லது மெட்ரோவை தேர்வு செய்யவும்.' },
  'tourist.weather.rain': { en: 'Raining! Metro or covered transport recommended.', ta: 'மழை பெய்கிறது! மெட்ரோ அல்லது மறைக்கப்பட்ட வாகனத்தை தேர்வு செய்யவும்.' },

  // Local Innovation Features
  'local.pinkBus.label': { en: 'Free for Women (Pink Bus)', ta: 'பெண்களுக்கு இலவசம் (பிங்க் பேருந்து)' },
  'local.pinkBus.info': { en: 'Ordinary MTC buses (Pink) are free for women in TN.', ta: 'தமிழகத்தில் சாதாரண MTC பேருந்துகள் பெண்களுக்கு இலவசம்.' },
  'local.group.label': { en: 'Travel Group Size', ta: 'பயண குழுவின் எண்ணிக்கை' },
  'local.group.person': { en: 'Person', ta: 'நபர்' },
  'local.group.people': { en: 'People', ta: 'நபர்கள்' },
  'local.group.total': { en: 'Total Group Fare', ta: 'மொத்த குழு கட்டணம்' },
  'local.map.btn': { en: 'Offline Transit Map', ta: 'ஆஃப்லைன் வரைபடம்' },
  'local.map.title': { en: 'Chennai Rail Network', ta: 'சென்னை ரயில் வரைபடம்' },
  'local.map.desc': { en: 'Tap to zoom. Works offline.', ta: 'பெரிதாக்க தட்டவும். ஆஃப்லைனில் வேலை செய்யும்.' },

  // Tourist Experience Features
  'tourist.alert.btn': { en: 'Alert Me', ta: 'எச்சரிக்கை செய்' },
  'tourist.alert.set': { en: 'Alert Set!', ta: 'எச்சரிக்கை தயார்!' },
  'tourist.alert.desc': { en: 'We will notify you near your destination.', ta: 'உங்கள் இலக்குக்கு அருகில் நாங்கள் அறிவிப்போம்.' },
  'tourist.alert.title': { en: 'Arrival Alert', ta: 'வருகை எச்சரிக்கை' },
  'tourist.alert.msg': { en: 'You are almost at your stop!', ta: 'நீங்கள் உங்கள் நிறுத்தத்திற்கு அருகில் இருக்கிறீர்கள்!' },
  'tourist.snack.title': { en: 'Local Snack Tip', ta: 'உள்ளூர் சிற்றுண்டி குறிப்பு' },
  'tourist.snack.budget': { en: 'Budget-Friendly', ta: 'குறைந்த விலை' },

  // Feature Section
  'feature.calculator.title': { en: 'Calculate Monthly Cost', ta: 'மாதாந்திர செலவைக் கணக்கிடுங்கள்' },
  'feature.calculator.desc': { en: 'Enter a distance and see how much you\'ll spend per month on different transport options.', ta: 'ஒரு தூரத்தை உள்ளிடுங்கள் மற்றும் வெவ்வேறு போக்குவரத்து விருப்பங்களுக்கு நீங்கள் மாதத்திற்கு எவ்வளவு செலவு செய்வீர்கள் என்பதைக் பாருங்கள்.' },
  'feature.routes.title': { en: 'City Routes', ta: 'நகர வழித்தடங்கள்' },
  'feature.routes.desc': { en: 'Compare fares between different cities. Find the best route for your inter-city travel.', ta: 'வெவ்வேறு நகரங்களுக்கிடையே கட்டணங்களை ஒப்பிடுங்கள். உங்கள் நகரங்களுக்கிடையேயான பயணத்திற்கு சிறந்த வழியைக் கண்டறியுங்கள்.' },
  'feature.comparison.title': { en: 'Compare Fares', ta: 'கட்டணங்களை ஒப்பிடுங்கள்' },
  'feature.comparison.desc': { en: 'Select a route to see all available transport options and their prices', ta: 'அனைத்து கிடைக்கும் போக்குவரத்து விருப்பங்கள் மற்றும் அவற்றின் விலைகளைக் காண வழித்தடத்தைத் தேர்ந்தெடுக்கவும்' },
  'feature.calculator.label': { en: 'Monthly Cost Calculator', ta: 'மாதாந்திர செலவு கால்குலேட்டர்' },
  'feature.calculator.hint': { en: 'Enter a distance to calculate your monthly transport costs', ta: 'உங்கள் மாதாந்திர போக்குவரத்து செலவுகளைக் கணக்கிட ஒரு தூரத்தை உள்ளிடுங்கள்' },
  'feature.intercity.title': { en: 'Inter-City Routes', ta: 'நகரங்களுக்கிடையேயான வழித்தடங்கள்' },
  'feature.intercity.desc': { en: 'Compare prices between different cities', ta: 'வெவ்வேறு நகரங்களுக்கிடையே விலைகளை ஒப்பிடுங்கள்' },
  'feature.backButton': { en: '← Back to Options', ta: '← விருப்பங்களுக்குத் திரும்பவும்' },

  // Added Missing Translations
  'fare.scheme': { en: 'Scheme', ta: 'திட்டம்' },
  'fare.womenFree': { en: 'Women Free', ta: 'பெண்கள் இலவசம்' },
  'fare.map': { en: 'Map', ta: 'வரைபடம்' },
  'fare.viewMap': { en: 'View Map', ta: 'வரைபடத்தைக் காண்' },
  'fare.mins': { en: 'mins', ta: 'நிமிடங்கள்' },
  'fare.bestPrice': { en: 'Best Price', ta: 'சிறந்த விலை' },
  'fare.serviceNotAvailable': { en: 'Service Not Available', ta: 'சேவை கிடைக்கவில்லை' },
  'fare.free': { en: 'Free', ta: 'இலவசம்' },
  'fare.passengers': { en: 'passengers', ta: 'பயணிகள்' },
  'calc.perTrip': { en: 'per trip', ta: 'ஒரு பயணத்திற்கு' },
  'calc.monthlyCost': { en: 'Monthly Cost', ta: 'மாதாந்திர செலவு' },
  'calc.saveAmount': { en: 'Save ₹{val}', ta: '₹{val} சேமிப்பு' },
  'search.filters': { en: 'Filters', ta: 'வடிகட்டிகள்' },
  'search.sortBy': { en: 'Sort By', ta: 'வரிசைப்படுத்து' },
  'search.comfortLevel': { en: 'Comfort Level', ta: 'வசதி நிலை' },
  'search.maxPrice': { en: 'Max Price', ta: 'அதிகபட்ச விலை' },
  'search.travelTime': { en: 'Travel Time', ta: 'பயண நேரம்' },
  'search.cheapest': { en: 'Cheapest', ta: 'மலிவானது' },
  'search.fastest': { en: 'Fastest', ta: 'வேகமானது' },
  'search.eco': { en: 'Eco', ta: 'சுற்றுச்சூழல்' },
  'search.any': { en: 'Any', ta: 'எதுவும்' },
  'search.ac': { en: 'AC', ta: 'ஏசி' },
  'search.nonac': { en: 'Non-AC', ta: 'ஏசி இல்லாதது' },
  'search.clearAll': { en: 'Clear all', ta: 'அனைத்தையும் நீக்கு' },
  'search.maxPriceLabel': { en: '₹{val} max', ta: 'அதிகபட்சம் ₹{val}' },
  'search.maxTimeLabel': { en: '< {val}h', ta: '{val} மணிநேரத்திற்கு குறைவான' },

  // Index Page Feature Selection
  'index.whatTodo': { en: 'What would you like to do?', ta: 'நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?' },
  'index.chooseOption': { en: 'Choose one of the options below to get started', ta: 'தொடங்க கீழே உள்ள விருப்பங்களில் ஒன்றைத்தேர்ந்தெடுக்கவும்' },
  'index.compareFares': { en: 'Compare Fares', ta: 'கட்டணங்களை ஒப்பிடுங்கள்' },
  'index.compareFaresDesc': { en: 'Pick a route and compare prices across different transport modes. See which option saves you money.', ta: 'ஒரு வழித்தடத்தைத் தேர்ந்தெடுத்து வெவ்வேறு போக்குவரத்து முறைகளில் விலைகளை ஒப்பிடுங்கள். எந்த விருப்பம் உங்கள் பணத்தை ஆதாப்படுத்தும் என்று பாருங்கள்.' },
  'index.calcMonthly': { en: 'Calculate Monthly Cost', ta: 'மாதாந்திர செலவைக் கணக்கிடுங்கள்' },
  'index.calcMonthlyDesc': { en: 'Enter a distance and see how much you\'ll spend per month on different transport options.', ta: 'தூரத்தை உள்ளிட்டு வெவ்வேறு போக்குவரத்து முறைகளுக்கு நீங்கள் மாதத்திற்கு எவ்வளவு செலவு செய்வீர்கள் என்று பாருங்கள்.' },
  'index.cityRoutes': { en: 'City Routes', ta: 'நகர வழித்தடங்கள்' },
  'index.cityRoutesDesc': { en: 'Compare fares between different cities. Find the best route for your inter-city travel.', ta: 'வெவ்வேறு நகரங்களுக்கு இடையே உள்ள கட்டணங்களை ஒப்பிடுங்கள். உங்கள் நகரங்களுக்கு இடையேயான பயணத்திற்கான சிறந்த வழியை கண்டறியுங்கள்.' },
  'index.backOptions': { en: '← Back to Options', ta: '← விருப்பங்களுக்குத் திரும்பவும்' },

  // Footer
  'footer.modes': { en: 'Transport Modes', ta: 'போக்குவரத்து முறைகள்' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[key]?.[language] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, value);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
