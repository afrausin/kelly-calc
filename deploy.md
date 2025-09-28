# Deployment Guide for augusto.ai

## Option 1: Netlify (Recommended - Easiest)

### Step 1: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up for a free account
3. Drag and drop your `index.html` file to the deploy area
4. Netlify will give you a random URL like `https://amazing-name-123456.netlify.app`

### Step 2: Connect Custom Domain
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter `augusto.ai`
4. Netlify will provide DNS instructions

### Step 3: Update DNS at GoDaddy
1. Log into your GoDaddy account
2. Go to DNS management for augusto.ai
3. Add a CNAME record:
   - Name: `www`
   - Value: `amazing-name-123456.netlify.app`
4. Add an A record:
   - Name: `@`
   - Value: `75.2.60.5` (Netlify's IP)

### Step 4: SSL Certificate
- Netlify automatically provides SSL certificates
- Your site will be available at `https://augusto.ai`

## Option 2: Vercel (Alternative)

### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/kelly-calc.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy automatically

### Step 3: Custom Domain
1. In Vercel dashboard, go to your project
2. Go to "Domains" tab
3. Add `augusto.ai`
4. Follow DNS instructions

## Option 3: GitHub Pages

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/kelly-calc.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your site will be at `https://yourusername.github.io/kelly-calc`

### Step 3: Custom Domain
1. Add `CNAME` file with content: `augusto.ai`
2. Update DNS at GoDaddy to point to GitHub Pages

## DNS Configuration for augusto.ai

### For Netlify:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: your-site-name.netlify.app
```

### For Vercel:
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www  
Value: your-site-name.vercel.app
```

### For GitHub Pages:
```
Type: CNAME
Name: @
Value: yourusername.github.io

Type: CNAME
Name: www
Value: yourusername.github.io
```

## Testing Your Deployment

1. Wait 5-10 minutes for DNS propagation
2. Visit `https://augusto.ai`
3. Test all functionality:
   - Trade configuration
   - Kelly calculations
   - Charts and graphs
   - Save/load configurations

## Troubleshooting

- If site doesn't load: Check DNS propagation at [whatsmydns.net](https://whatsmydns.net)
- If SSL issues: Wait 24 hours for certificate generation
- If 404 errors: Ensure `index.html` is in the root directory
