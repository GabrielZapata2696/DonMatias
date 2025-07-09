# Image Optimization Setup

This document explains the image optimization setup for your Angular application, designed to improve performance by serving images from a separate Netlify deployment.

## 📁 Directory Structure

```
project-root/
├── src/
│   ├── app/shared/services/image.service.ts    # Centralized image URL management
│   └── environments/
│       ├── environment.ts                       # Development config
│       └── environment.prod.ts                 # Production config
├── external-images/                             # Images excluded from main build
│   ├── empresas_aliadas/                        # Partner company logos
│   ├── optimized/                               # Optimized/responsive images
│   └── *.webp                                   # Main project images
├── public/
│   └── imagenes/                                # Original images (can be removed)
├── proxy.conf.json                              # Development proxy config
├── deploy-images.js                             # Netlify deployment script
└── angular.json                                 # Build configuration
```

## 🎯 Benefits

- **Reduced bundle size**: Images are not included in the main Angular build
- **Faster builds**: Build process doesn't need to process images
- **Better caching**: Images can be cached independently from the app
- **CDN delivery**: Images served from Netlify's global CDN
- **Easy updates**: Update images without rebuilding the main app

## 🔧 How It Works

### Development Mode
- Images are served from the local `external-images/` directory
- Angular dev server uses proxy configuration to serve images at `/external-images/*`
- `environment.ts` points to `./external-images` for local development

### Production Mode
- Images are deployed to a separate Netlify site
- `environment.prod.ts` points to your Netlify images URL
- Main Angular app references images via the ImageService

## 🚀 Setup Instructions

### 1. Initial Setup (Already Done)
- ✅ External images directory created
- ✅ Images moved to `external-images/`
- ✅ Angular configuration updated
- ✅ ImageService implemented
- ✅ Environment configurations set up

### 2. Development Usage

Start the development server:
```bash
ng serve
```

The proxy configuration will serve images from `external-images/` directory.

### 3. Production Deployment

#### Step 1: Deploy Images to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Create a new Netlify site for images:
```bash
netlify init
```

3. Update `deploy-images.js` with your site ID:
```javascript
netlifyImagesSiteId: 'your-actual-site-id'
```

4. Deploy images:
```bash
npm run deploy:images
```

#### Step 2: Update Production Environment

Update `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  imageBaseUrl: 'https://your-netlify-images-site.netlify.app'
};
```

#### Step 3: Deploy Main App

Build and deploy your Angular app:
```bash
ng build --configuration production
```

## 🖼️ Using Images in Components

### Basic Usage
```typescript
import { ImageService } from './shared/services/image.service';

constructor(private imageService: ImageService) {}

getMainImage() {
  return this.imageService.getMainProjectImage('construction-project');
}
```

### Responsive Images
```typescript
getResponsiveImages() {
  return this.imageService.getResponsiveImages('main-construction-project');
}
```

### Partner/Ally Images
```typescript
getPartnerLogo() {
  return this.imageService.getAllyImage('Logo_Bioexplora_sas.jpg');
}
```

## 📱 Image Types and Optimization

### Image Categories
- **Main Project Images**: High-quality project photos
- **Optimized Images**: Multiple sizes for responsive design
- **Partner Logos**: Company and organization logos

### Optimization Levels
- **Full Size**: Original quality for detailed views
- **Thumb**: Medium size for card views
- **Thumb-Small**: Small size for thumbnails

### Supported Formats
- **WebP**: Primary format for modern browsers
- **JPG/JPEG**: Fallback for older browsers
- **PNG**: For logos with transparency

## 🔧 Configuration Files

### angular.json
```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "public",
      "output": "",
      "ignore": ["imagenes/**/*"]
    }
  ]
}
```

### proxy.conf.json
```json
{
  "/external-images/*": {
    "target": "http://localhost:4200",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

## 🔄 Migration from Old Setup

If you have images in `public/imagenes/`, the ImageService handles backward compatibility:

```typescript
// Old path: 'imagenes/construction-project.webp'
// New path: 'construction-project.webp'
// Both will work during transition
```

## 📊 Performance Impact

### Bundle Size Reduction
- Estimated savings: 2-5MB depending on image count
- Faster initial page load
- Reduced memory usage

### Build Time Improvement
- Faster builds (no image processing)
- Reduced dist/ folder size
- Quicker deployments

## 🔍 Troubleshooting

### Images Not Loading in Development
1. Check if `external-images/` directory exists
2. Verify proxy configuration in `angular.json`
3. Ensure images are in the correct folder structure

### Images Not Loading in Production
1. Verify Netlify images site is deployed
2. Check `environment.prod.ts` URL
3. Ensure CORS is properly configured

### Build Errors
1. Check `angular.json` assets configuration
2. Verify all image paths in ImageService
3. Ensure environment files are properly configured

## 📋 Maintenance

### Adding New Images
1. Add images to `external-images/` directory
2. Use ImageService methods to reference them
3. Re-deploy images using `npm run deploy:images`

### Updating Images
1. Replace files in `external-images/`
2. Re-deploy images
3. Clear CDN cache if needed

### Removing Images
1. Remove files from `external-images/`
2. Update components that reference them
3. Re-deploy images

## 🎯 Future Enhancements

- **Image Optimization Pipeline**: Automated image compression and format conversion
- **Lazy Loading**: Implement lazy loading for better performance
- **Progressive Images**: Add progressive JPEG support
- **Image Preloading**: Implement intelligent image preloading based on user behavior

## 📞 Support

For issues or questions about this setup, check:
1. Angular CLI documentation
2. Netlify deployment guides
3. ImageService implementation in your codebase
