# Netlify Image Loading Troubleshooting Guide

## If images are still loading slow, check these common issues:

### 1. **Verify Optimized Images are Deployed**
After building, check that `dist/brochure/browser/imagenes/optimized/` contains all the WebP and JPEG files:

```bash
# Check if optimized images exist in build output
ls dist/brochure/browser/imagenes/optimized/
```

If they're missing, manually copy them:
```bash
cp -r public/imagenes/optimized/ dist/brochure/browser/imagenes/
```

### 2. **Check Netlify Deploy Settings**
In your Netlify site settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist/brochure/browser`
- **Functions directory**: Leave empty

### 3. **Verify Image Paths**
Open browser dev tools (F12) and check:
1. **Network tab**: Look for 404 errors on image requests
2. **Console tab**: Check for any loading errors

### 4. **Force Browser Cache Clear**
On your deployed site:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or open in incognito/private mode

### 5. **Check Image Compression**
Run this command to verify file sizes:
```bash
# Check original vs optimized sizes
du -h public/imagenes/*.png
du -h public/imagenes/optimized/*.webp
```

### 6. **Test Image URLs Directly**
Visit these URLs directly in your browser:
- `https://your-site.netlify.app/imagenes/optimized/construction-project.webp`
- `https://your-site.netlify.app/imagenes/optimized/main-park-project.webp`

If they return 404, the images weren't deployed correctly.

### 7. **Alternative: Use CDN/External Images**
If issues persist, upload images to:
- **Cloudinary** (free tier available)
- **Imgur** 
- **GitHub** (if public repo)

### 8. **Performance Testing**
Use these tools to measure improvement:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### 9. **Manual Image Optimization Check**
Run the optimization script again if needed:
```bash
node optimize-images.js
npm run build
```

### 10. **Check Netlify Bandwidth Limits**
- Free tier: 100GB/month
- If exceeded, images may load slowly

## Quick Fix Commands

```bash
# Re-optimize and rebuild
node optimize-images.js
npm run build

# Force deploy
netlify deploy --prod --dir=dist/brochure/browser

# Check file sizes
ls -la public/imagenes/optimized/*.webp
```

## Expected Results After Optimization

- **First image**: Should load in < 1 second
- **Subsequent images**: Should load in < 0.5 seconds  
- **File sizes**: WebP images should be < 0.5 MB each
- **Mobile**: Should load even faster with thumb versions

## Contact Support
If issues persist, the problem might be:
- Network latency to Netlify's CDN
- Regional CDN issues
- Browser-specific problems

Test from different devices/networks to isolate the issue.
