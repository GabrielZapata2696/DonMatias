const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function checkImageDimensions() {
  const inputDir = 'public/imagenes';
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  console.log('Original Image Dimensions:');
  console.log('========================');
  
  for (const file of imageFiles) {
    try {
      const inputPath = path.join(inputDir, file);
      const metadata = await sharp(inputPath).metadata();
      console.log(`${file}: ${metadata.width}x${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (error) {
      console.log(`${file}: Error reading metadata`);
    }
  }
}

checkImageDimensions().catch(console.error);
