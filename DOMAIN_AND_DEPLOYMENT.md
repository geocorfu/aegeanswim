# 🌐 Domain Purchase & Vercel Deployment Guide

**Get AegeanSwim live in 30 minutes!**

---

## Part 1: Buy Your Domain (10 minutes)

### 🏆 Best Domain Registrars (2024)

| Registrar | Price/year | Pros | Best For |
|-----------|------------|------|----------|
| **Namecheap** ⭐ | $8-13 | Easy, cheap, great support | **Recommended** |
| **Cloudflare** | $8-10 | Cheapest, best DNS | Tech-savvy users |
| **Google Domains** | $12 | Simple, integrated | Google users |
| **GoDaddy** | $12-20 | Popular, expensive | Avoid (upsells) |
| **Porkbun** | $9-11 | Cheap, good features | Budget option |

### ✅ Recommended: Namecheap

**Why Namecheap:**
- ✅ Easy to use
- ✅ Free WHOIS privacy
- ✅ Great DNS management
- ✅ Good support
- ✅ No hidden fees

---

## 📝 Step-by-Step: Buy Domain on Namecheap

### Step 1: Search for Domain (2 min)

1. Go to **[Namecheap.com](https://www.namecheap.com)**
2. Search: **`aegeanswim.com`**
3. Check availability

**Domain Suggestions:**
- First choice: `aegeanswim.com` (~$13/year)
- Alternative: `aegean-swim.com` (~$13/year)
- Budget: `aegeanswim.io` (~$35/year - premium)
- Cheap: `aegeanswim.net` (~$12/year)

**I recommend:** `aegeanswim.com` ✅

### Step 2: Add to Cart & Purchase (3 min)

```
1. Click "Add to Cart" on aegeanswim.com
2. Review cart
3. ⚠️ UNCHECK all upsells:
   - SSL Certificate (Vercel gives free!)
   - Email hosting (not needed yet)
   - Website builder (you have one!)
   - Premium DNS (not needed)

4. ✅ KEEP checked:
   - WhoisGuard (privacy protection) - FREE

5. Choose duration:
   - 1 year: $13
   - 2 years: $26 (saves nothing)

   Pick: 1 year (you can always renew)

6. Click "Confirm Order"
7. Create account or login
8. Enter payment details
9. Complete purchase
```

**Total cost: ~$13/year** 💰

### Step 3: Configure DNS (5 min)

**After purchase:**

1. Go to Namecheap Dashboard
2. Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. **WAIT** - We'll configure this after Vercel setup!

---

## Part 2: Deploy to Vercel (15 minutes)

### ✅ Why Vercel is Perfect for AegeanSwim

- ✅ **FREE** for your use case
- ✅ **Automatic HTTPS** (SSL certificate)
- ✅ **Global CDN** (fast everywhere)
- ✅ **GitHub integration** (auto-deploy on push)
- ✅ **Backend + Frontend** together
- ✅ **Zero configuration** (we already set it up!)
- ✅ **Serverless functions** for API
- ✅ **99.99% uptime**

**Already configured:** `vercel.json` ✅

---

## 🚀 Step-by-Step: Deploy to Vercel

### Step 1: Create Vercel Account (2 min)

1. Go to **[vercel.com](https://vercel.com)**
2. Click "Sign Up"
3. **Important:** Sign up with **GitHub** (easier integration)
4. Authorize Vercel to access GitHub

### Step 2: Install Vercel CLI (3 min)

Open terminal on your computer:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Enter your email (the one you signed up with)
# Check your email for verification code
# Enter the code
```

You should see: `✔ Success! Email verified`

### Step 3: Deploy AegeanSwim (5 min)

```bash
# Navigate to your project
cd /home/user/aegeanswim

# Deploy to Vercel
vercel

# You'll be asked several questions:
```

**Question 1:** Set up and deploy "~/aegeanswim"?
```
Answer: Y (yes)
```

**Question 2:** Which scope do you want to deploy to?
```
Answer: [Your username] (press Enter)
```

**Question 3:** Link to existing project?
```
Answer: N (no - first time)
```

**Question 4:** What's your project's name?
```
Answer: aegeanswim (or press Enter)
```

**Question 5:** In which directory is your code located?
```
Answer: ./ (press Enter - it's the root)
```

**Question 6:** Want to override settings?
```
Answer: N (no - vercel.json handles it)
```

**Vercel will now:**
- 📦 Upload your files
- 🔨 Build your project
- 🚀 Deploy to production
- ✅ Give you a URL!

**You'll see:**
```
✔ Production: https://aegeanswim-abc123.vercel.app [copied]
```

**🎉 Your site is LIVE!** (on Vercel subdomain)

### Step 4: Test Your Deployment (2 min)

Click the URL or open in browser:

```
https://aegeanswim-abc123.vercel.app
```

**Test checklist:**
- [ ] Homepage loads
- [ ] Island selector has options
- [ ] Select island + date + time
- [ ] Click "Find Beaches"
- [ ] Results show up
- [ ] PayPal link works

**If everything works:** ✅ Continue to domain setup!

**If API fails:**
```bash
# Check API endpoint in frontend
# Make sure CORS is configured
# Check backend environment variables
```

---

## Part 3: Connect Your Domain (10 min)

### Step 1: Add Domain in Vercel (3 min)

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Click on your `aegeanswim` project
3. Go to "Settings" tab
4. Click "Domains" in left sidebar
5. Type your domain: `aegeanswim.com`
6. Click "Add"

**Vercel will show you DNS records to configure!**

Copy the DNS records shown (usually looks like):
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 2: Update Namecheap DNS (5 min)

1. Go back to **[Namecheap Dashboard](https://ap.www.namecheap.com/)**
2. Click "Manage" next to `aegeanswim.com`
3. Go to "Advanced DNS" tab
4. **Delete all existing records** (parking page records)
5. Click "Add New Record"

**Add these records:**

**Record 1 - Main domain:**
```
Type: A Record
Host: @
Value: 76.76.21.21 (the IP Vercel gave you)
TTL: Automatic
```

**Record 2 - WWW subdomain:**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com (what Vercel gave you)
TTL: Automatic
```

6. Click "Save all changes"

### Step 3: Wait for DNS Propagation (5-60 min)

**DNS propagation takes time:**
- Minimum: 5 minutes
- Average: 30 minutes
- Maximum: 48 hours (rare)

**Check if it's ready:**
```bash
# Check DNS propagation
dig aegeanswim.com

# Or use online tool:
# https://dnschecker.org
```

**What to expect:**
1. First 5 min: Domain shows "DNS not configured"
2. After 10-30 min: Domain works but might show Vercel's page
3. After 30-60 min: **Your site is live!** ✅

### Step 4: Configure SSL (Automatic)

Vercel **automatically** provisions SSL certificate!

- Usually takes: 5-10 minutes
- Nothing to do manually
- Both `http://` and `https://` will work
- `https://` is preferred

**Check SSL:**
```
https://aegeanswim.com
```

Should show **🔒 Secure** in browser!

---

## 🎉 YOU'RE LIVE!

Your site should now be accessible at:
- ✅ `https://aegeanswim.com`
- ✅ `https://www.aegeanswim.com`
- ✅ Both automatically redirect to HTTPS

---

## ⚙️ Production Checklist

Before announcing your launch:

### Backend Configuration

**Update API URL in production:**

The backend API is automatically deployed with frontend on Vercel!

**Verify API works:**
```bash
curl https://aegeanswim.com/api/beaches/islands/list
```

Should return JSON with islands list ✅

### Frontend Configuration

**Update `frontend/js/config.js` for production:**

```javascript
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api',  // This works! Vercel handles routing

  PAYPAL_LINK: 'https://paypal.me/geokritikos'
};
```

**This is already set up correctly!** ✅

### Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Project → Settings → Environment Variables
3. Add these:

```
NODE_ENV=production
ALLOWED_ORIGINS=https://aegeanswim.com,https://www.aegeanswim.com
PAYPAL_LINK=https://paypal.me/geokritikos
```

4. Redeploy (Vercel does this automatically)

---

## 🔄 Automatic Deployments

**Every time you push to GitHub:**
1. Vercel detects the push
2. Automatically builds
3. Automatically deploys
4. ✅ Your site updates!

**How it works:**
```bash
# Make changes locally
git add .
git commit -m "Update beach descriptions"
git push

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to aegeanswim.com
# ✅ Live in 2-3 minutes!
```

---

## 💰 Vercel Pricing

**What you get for FREE:**
- ✅ Unlimited projects
- ✅ 100 GB bandwidth/month
- ✅ 100 serverless function executions/day
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ GitHub integration
- ✅ Custom domains

**Your traffic estimate:**
- 1,000 visitors/day = ~30,000/month
- 100 MB page size = 3 GB/month
- **Well within free tier!** ✅

**When you need Pro ($20/month):**
- 100+ GB bandwidth/month
- 1M+ serverless executions
- Team collaboration
- Advanced analytics

**For now: FREE tier is perfect!** ✅

---

## 🔧 Troubleshooting

### Domain not working after 1 hour?

**Check DNS:**
```bash
# Check if DNS is configured
nslookup aegeanswim.com

# Should show Vercel's IP
```

**Common fixes:**
1. Clear browser cache
2. Try incognito mode
3. Check DNS records in Namecheap
4. Wait another hour (DNS can be slow)

### API not working?

**Check:**
1. Vercel Dashboard → Deployments → Logs
2. Look for errors
3. Check CORS settings in `backend/src/server.js`

**Fix CORS:**
```javascript
// backend/src/server.js
const corsOptions = {
  origin: [
    'https://aegeanswim.com',
    'https://www.aegeanswim.com'
  ]
};
```

### SSL certificate not issued?

**Usually auto-fixes in 10-20 minutes**

If still not working:
1. Vercel Dashboard → Project → Settings → Domains
2. Click "Refresh" next to your domain
3. Wait 5 more minutes

---

## 📱 Update Mobile App URLs

After deployment, update mobile app:

```javascript
// mobile/src/config/api.js
const API_CONFIG = {
  production: {
    baseURL: 'https://aegeanswim.com/api',  // ✅ Update this!
  }
};
```

Rebuild mobile apps with production URL ✅

---

## 🎯 Quick Command Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production (skip preview)
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

---

## 📊 Post-Launch Checklist

- [ ] Domain works: `https://aegeanswim.com` ✅
- [ ] WWW works: `https://www.aegeanswim.com` ✅
- [ ] SSL certificate active (🔒 in browser) ✅
- [ ] Island selector loads ✅
- [ ] Beach recommendations work ✅
- [ ] PayPal link opens ✅
- [ ] Mobile responsive ✅
- [ ] Fast load time (< 3 seconds) ✅

---

## 🚀 You're LIVE!

**What you have now:**
- ✅ Professional domain: `aegeanswim.com`
- ✅ Production deployment on Vercel
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN (fast worldwide)
- ✅ Auto-deploy from GitHub
- ✅ 99.99% uptime

**Next steps:**
1. Test thoroughly
2. Share with friends
3. Post on social media
4. Add Google Analytics
5. Monitor with Vercel Analytics

---

## 💡 Pro Tips

**1. Add www redirect:**
Already handled by Vercel! ✅

**2. Add custom 404 page:**
```html
<!-- frontend/404.html -->
<!DOCTYPE html>
<html>
<head><title>Page Not Found</title></head>
<body>
  <h1>🌊 Page Not Found</h1>
  <a href="/">Back to AegeanSwim</a>
</body>
</html>
```

**3. Monitor performance:**
- Vercel Dashboard → Analytics
- Google PageSpeed Insights
- GTmetrix

**4. Set up email:**
Later, add email forwarding:
- `support@aegeanswim.com` → your personal email
- Namecheap Email Forwarding (free)

---

## 💰 Total Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (Namecheap) | $13 | Annual |
| Vercel Hosting | $0 | FREE |
| SSL Certificate | $0 | FREE (Vercel) |
| CDN | $0 | FREE (Vercel) |
| **Total Year 1** | **$13** | |
| **Subsequent Years** | **$13** | (just domain) |

**Amazing value!** ✅

---

## 🎉 Launch Announcement Template

Ready to announce? Use this:

```
🌊 Excited to launch AegeanSwim!

Find perfect swimming beaches in the Aegean Sea based on
real-time wind conditions. Never get caught in rough waters again!

✨ 30+ Islands
🏖️ 100+ Beaches
🌬️ Real-time Weather
🎯 Smart Recommendations

Try it now: https://aegeanswim.com

#AegeanSwim #Greece #BeachWeather #Travel #Cyclades
```

---

**Questions? Issues? Let me know and I'll help!** 🚀
