# Netlify Deployment Guide

This guide explains how to deploy your Angular application with the optimized image setup to Netlify.

## 🎯 **Deployment Strategy**

You'll deploy **TWO separate sites** to Netlify:
1. **Images Site** - Contains only images (fast CDN delivery)
2. **Main App Site** - Contains your Angular application

## 📋 **Prerequisites**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

## 🖼️ **Step 1: Deploy Images Site**

### Create Images Site
```bash
# Navigate to external-images directory
cd external-images

# Copy netlify configuration
cp ../netlify-images.toml ./netlify.toml

# Initialize new Netlify site
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose team (your account)
# - Site name: your-app-name-images (e.g., "brochure-images")
```

### Deploy Images
```bash
# Deploy images to production
netlify deploy --prod --dir=.

# Note the deployment URL (e.g., https://brochure-images.netlify.app)
```

## 🚀 **Step 2: Update Production Environment**

Update your production environment with the images URL:

### Edit `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  // Replace with your actual images site URL
  imageBaseUrl: 'https://brochure-images.netlify.app'
};
```

## 🏗️ **Step 3: Build and Deploy Main App**

### Build Production Version
```bash
# Build the Angular app for production
ng build --configuration production
```

### Deploy Main App
```bash
# Initialize main app site (if not already done)
netlify init

# Deploy main app
netlify deploy --prod --dir=dist/brochure
```

## 🔧 **Alternative: Automated Deployment Script**

Use the deployment script we created:

### Update `deploy-images.js`:
```javascript
const config = {
  // Replace with your actual site ID from Step 1
  netlifyImagesSiteId: 'your-images-site-id',
  // ... rest of config
};
```

### Run Deployment:
```bash
# Deploy images and update environment
npm run deploy:images

# Build and deploy main app
ng build --configuration production
netlify deploy --prod --dir=dist/brochure
```

## 📁 **Directory Structure After Deployment**

```
Netlify Images Site (brochure-images.netlify.app):
├── alcantarillado-project.webp
├── main-construction-project.webp
├── empresas_aliadas/
│   ├── Escudo_Donmatias.jpg
│   └── ... (other logos)
└── optimized/
    ├── main-construction-project-thumb.webp
    └── ... (other optimized images)

Netlify Main App Site (your-app.netlify.app):
├── index.html
├── main.js
├── polyfills.js
└── ... (Angular app files)
```

## 🔍 **Testing Production Deployment**

### Test Image URLs:
```
https://brochure-images.netlify.app/main-construction-project.webp
https://brochure-images.netlify.app/empresas_aliadas/Escudo_Donmatias.jpg
https://brochure-images.netlify.app/optimized/main-construction-project-thumb.webp
```

### Test Main App:
```
https://your-app.netlify.app
```

## ⚙️ **Netlify Configuration Files**

### For Images Site (`netlify.toml` in external-images):
```toml
[build]
  command = "echo 'No build required for static images'"
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=31536000, immutable"
```

### For Main App (`netlify.toml` in project root):
```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/brochure"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎭 **Benefits of This Setup**

1. **Performance**: Images served from CDN
2. **Caching**: Long-term caching for images
3. **Scalability**: Independent image updates
4. **Bundle Size**: Smaller main app bundle
5. **Build Speed**: Faster builds

## 🔄 **Updating Images**

To update images without rebuilding the main app:

```bash
# Update images in external-images directory
# Then redeploy images site
cd external-images
netlify deploy --prod --dir=.
```

## 🚨 **Troubleshooting**

### Images Not Loading:
1. Check CORS headers in images site
2. Verify image URLs in production environment
3. Check browser Network tab for 404 errors

### Build Errors:
1. Ensure all image paths use ImageService
2. Check environment configuration
3. Verify angular.json assets configuration

### Deployment Errors:
1. Check Netlify build logs
2. Verify site IDs in deployment scripts
3. Ensure CLI is authenticated

## 📊 **Performance Monitoring**

After deployment, monitor:
- Image loading times
- Bundle size reduction
- Build performance
- CDN cache hit rates

## 🔐 **Security Considerations**

- Images are public (no authentication needed)
- CORS enabled for cross-origin requests
- Cache headers optimized for performance
- No sensitive data in images

## 📞 **Support**

- Netlify Documentation: https://docs.netlify.com/
- Angular CLI: https://angular.io/cli
- Image optimization: Check IMAGE_OPTIMIZATION_README.md

---

**Next Steps:**
1. Deploy images site first
2. Update production environment
3. Build and deploy main app
4. Test all functionality
5. Monitor performance
