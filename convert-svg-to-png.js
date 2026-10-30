import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgPath = path.join(__dirname, 'public', 'pwa-icon-512.svg');
const pngPath = path.join(__dirname, 'public', 'pwa-512x512.png');

async function convertSvgToPng() {
  try {
    console.log('Converting SVG to PNG...');
    console.log(`SVG path: ${svgPath}`);
    console.log(`PNG path: ${pngPath}`);
    
    await sharp(svgPath)
      .png({ quality: 95 })
      .toFile(pngPath);
    
    console.log(`✓ Successfully created PWA icon: ${pngPath}`);
    console.log(`✓ Size: 512x512px with dark navy background and no transparency`);
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    process.exit(1);
  }
}

convertSvgToPng();
