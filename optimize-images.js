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
    // Create high-quality WebP version (aggressively upscale for better display)
    await sharp(inputPath)
      .resize(2560, 1440, { 
        fit: 'fill', // Use 'fill' to stretch and upscale
        withoutEnlargement: false // Allow enlargement
      })
      .sharpen() // Add sharpening for upscaled images
      .webp({ 
        quality: 92,
        effort: 6 
      })
      .toFile(outputPath);
    
    // Create high-quality JPEG version for fallback
    await sharp(inputPath)
      .resize(2560, 1440, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 88,
        progressive: true 
      })
      .toFile(jpegPath);
    
    // Create thumbnail versions (for mobile)
    const thumbWebpPath = path.join(outputDir, `${name}-thumb.webp`);
    const thumbJpegPath = path.join(outputDir, `${name}-thumb.jpg`);
    
    await sharp(inputPath)
      .resize(1200, 900, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 82,
        effort: 6 
      })
      .toFile(thumbWebpPath);
    
    await sharp(inputPath)
      .resize(1200, 900, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 82,
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
