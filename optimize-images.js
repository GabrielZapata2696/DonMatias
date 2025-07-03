const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/imagenes';
const outputDir = 'public/imagenes/optimized';

// Create optimized directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to optimize a single image
async function optimizeImage(inputPath, filename) {
  const name = path.parse(filename).name;
  const outputPath = path.join(outputDir, `${name}.webp`);
  const jpegPath = path.join(outputDir, `${name}.jpg`);
  
  try {
    // Create WebP version (best compression)
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputPath);
    
    // Create JPEG version for fallback
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toFile(jpegPath);
    
    // Create thumbnail versions (for mobile)
    const thumbWebpPath = path.join(outputDir, `${name}-thumb.webp`);
    const thumbJpegPath = path.join(outputDir, `${name}-thumb.jpg`);
    
    await sharp(inputPath)
      .resize(800, 600, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 80,
        effort: 6 
      })
      .toFile(thumbWebpPath);
    
    await sharp(inputPath)
      .resize(800, 600, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 80,
        progressive: true 
      })
      .toFile(thumbJpegPath);
    
    console.log(`✓ Optimized ${filename}`);
    
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}:`, error.message);
  }
}

// Process all images
async function optimizeAllImages() {
  console.log('Starting image optimization...');
  
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    await optimizeImage(inputPath, file);
  }
  
  console.log('✓ All images optimized!');
}

optimizeAllImages().catch(console.error);
