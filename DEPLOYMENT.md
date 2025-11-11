# 🚀 AegeanSwim Deployment Guide

This guide will help you deploy AegeanSwim to production.

## 📋 Prerequisites

- Node.js 14+ installed
- Git installed
- GitHub account
- Vercel/Netlify account (free tier works)

---

## 🏃 Quick Deploy (5 Minutes)

### Option 1: Vercel (Recommended - Easiest)

**Backend + Frontend together:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project? **No**
   - Project name? **aegeanswim**
   - Directory? **./`** (root)
   - Override settings? **No**

5. **Done!** Your app is live at `https://aegeanswim.vercel.app`

**For production deployment:**
```bash
vercel --prod
```

---

### Option 2: Netlify (Frontend) + Heroku (Backend)

**Deploy Frontend to Netlify:**

1. **Go to** [Netlify](https://netlify.com)
2. **Drag & drop** the `frontend/` folder
3. **Done!** Your frontend is live

**Deploy Backend to Heroku:**

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create app**
   ```bash
   heroku create aegeanswim-api
   ```

4. **Deploy backend**
   ```bash
   git subtree push --prefix backend heroku main
   ```

5. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set ALLOWED_ORIGINS=https://your-netlify-url.netlify.app
   ```

6. **Update frontend config**
   - Edit `frontend/js/config.js`
   - Change `API_BASE_URL` to your Heroku URL

---

### Option 3: DigitalOcean (Full Control)

**1. Create Droplet**
- Ubuntu 22.04 LTS
- $5/month plan
- Add SSH key

**2. Connect to server**
```bash
ssh root@your-server-ip
```

**3. Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

**4. Install PM2**
```bash
npm install -g pm2
```

**5. Clone & setup**
```bash
git clone https://github.com/geocorfu/aegeanswim.git
cd aegeanswim
npm run install:all
```

**6. Configure environment**
```bash
cd backend
cp .env.example .env
nano .env  # Edit with your settings
```

**7. Start backend**
```bash
cd backend
pm2 start src/server.js --name aegeanswim-api
pm2 save
pm2 startup
```

**8. Setup Nginx**
```bash
apt install nginx
nano /etc/nginx/sites-available/aegeanswim
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /root/aegeanswim/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**9. Enable site**
```bash
ln -s /etc/nginx/sites-available/aegeanswim /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

**10. Setup SSL (Free)**
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 🔐 Environment Variables

### For Production

Set these in your deployment platform:

```env
NODE_ENV=production
PORT=5000
API_BASE_URL=https://your-domain.com/api
WEATHER_API_URL=https://api.open-meteo.com/v1/forecast
ALLOWED_ORIGINS=https://your-domain.com
PAYPAL_LINK=https://paypal.me/geokritikos
```

### Vercel

Set via dashboard or CLI:
```bash
vercel env add NODE_ENV
vercel env add ALLOWED_ORIGINS
```

### Heroku

```bash
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
```

---

## 🌐 Custom Domain Setup

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add `aegeanswim.com`
4. Update DNS records as instructed
5. SSL auto-configured ✅

### DigitalOcean

1. Point A record to server IP
2. Wait for DNS propagation (up to 24hrs)
3. Run `certbot --nginx -d aegeanswim.com`

---

## ✅ Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Island selection works
- [ ] Beach recommendations load
- [ ] Donation links work
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] CORS configured correctly
- [ ] Environment variables set

---

## 🐛 Troubleshooting

### API not connecting

**Check CORS settings:**
- Ensure `ALLOWED_ORIGINS` includes your frontend URL
- Check browser console for CORS errors

**Frontend config:**
```javascript
// frontend/js/config.js
const CONFIG = {
  API_BASE_URL: 'https://your-api-domain.com/api'  // Update this!
};
```

### "Cannot GET /api/beaches"

**Backend not running:**
```bash
# Check backend logs
pm2 logs aegeanswim-api

# Restart backend
pm2 restart aegeanswim-api
```

### Weather data not loading

**Check API limits:**
- Open-Meteo has rate limits
- Check backend logs for API errors

---

## 📊 Monitoring

### Vercel

- Built-in analytics
- View logs in dashboard
- Real-time monitoring

### DigitalOcean

**Setup monitoring:**
```bash
# PM2 monitoring
pm2 monit

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🔄 Updates & Redeployment

### Vercel

```bash
git push origin main
vercel --prod
```

### DigitalOcean

```bash
ssh root@your-server
cd aegeanswim
git pull
cd backend
npm install
pm2 restart aegeanswim-api
```

---

## 💰 Estimated Costs

| Platform | Monthly Cost |
|----------|-------------|
| Vercel (Hobby) | **$0** |
| Netlify (Free) | **$0** |
| Heroku (Free) | **$0** (with limits) |
| DigitalOcean | **$5-10** |
| Domain | **$1/month** |
| **Total** | **$0-11/month** |

---

## 🆘 Need Help?

- Check logs: `pm2 logs` or Vercel dashboard
- GitHub Issues: [Report a problem](https://github.com/geocorfu/aegeanswim/issues)
- API test: `curl https://your-api.com/api/beaches/islands/list`

---

**Good luck with your deployment! 🚀🌊**
