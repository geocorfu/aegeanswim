# 🌊 AegeanSwim

> Find perfect swimming beaches in the Aegean Sea based on real-time wind conditions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 📋 Overview

AegeanSwim is a smart beach recommendation service that analyzes real-time wind conditions and geographical protection to help you find the best beaches for swimming in the Aegean Sea. Never get caught in rough waters again!

### ✨ Features

- **🌬️ Real-Time Wind Analysis** - Live weather data analyzing wind patterns and Meltemi conditions
- **🗺️ 30+ Islands Coverage** - Comprehensive database of 100+ beaches across Cyclades, Dodecanese, and North Aegean
- **🛡️ Geographical Protection** - Advanced algorithms calculate wind shelter from cliffs, bays, and natural formations
- **🎯 Smart Recommendations** - AI-powered ranking system finds the best swimming conditions
- **📱 Mobile Optimized** - Perfect for checking conditions on-the-go
- **💝 Community Supported** - Free service funded by beach lovers

## 🏗️ Project Structure

```
aegeanswim/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Business logic
│   │   │   ├── beachController.js
│   │   │   └── weatherController.js
│   │   ├── data/              # Beach database
│   │   │   └── beaches.json   # 100+ beaches across 30+ islands
│   │   ├── routes/            # API routes
│   │   │   ├── beaches.js
│   │   │   └── weather.js
│   │   └── server.js          # Main server file
│   ├── .env.example           # Environment variables template
│   └── package.json           # Backend dependencies
├── frontend/                   # Frontend application
│   ├── css/
│   │   └── styles.css         # All styling
│   ├── js/
│   │   ├── config.js          # Frontend configuration
│   │   └── app.js             # Main application logic (TODO)
│   ├── assets/                # Images, icons, etc.
│   └── index.html             # Main HTML file (TODO)
├── docs/                       # Documentation
├── .gitignore                 # Git ignore rules
├── package.json               # Root package file
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/geocorfu/aegeanswim.git
cd aegeanswim
```

2. **Install dependencies**
```bash
npm run install:all
# Or manually:
npm install
cd backend && npm install
```

3. **Configure environment variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

4. **Start the development servers**
```bash
# From root directory
npm run dev

# Or start backend and frontend separately:
npm run dev:backend  # API server on port 5000
npm run dev:frontend # Frontend on port 3000
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/

## 🔌 API Endpoints

### Beaches

- `GET /api/beaches` - Get all beaches
- `GET /api/beaches/:island` - Get beaches by island
- `GET /api/beaches/islands/list` - Get all available islands
- `GET /api/beaches/search/:query` - Search beaches

### Weather

- `GET /api/weather/forecast` - Get weather forecast
  - Query params: `lat`, `lon`, `date`, `time`
- `GET /api/weather/recommendations` - Get beach recommendations
  - Query params: `island`, `date`, `time`

### Example Request

```bash
# Get recommendations for Mykonos
curl "http://localhost:5000/api/weather/recommendations?island=mykonos&date=2024-07-15&time=morning"
```

## 🗄️ Beach Database

The `backend/src/data/beaches.json` file contains detailed information for 107 beaches across 30 islands:

- **Cyclades**: Mykonos, Santorini, Paros, Naxos, Milos, and more
- **Dodecanese**: Rhodes, Kos, Patmos, etc.
- **North Aegean**: Lesbos, Chios, Samos, etc.
- **Major Islands**: Crete, Skiathos, Skopelos

Each beach includes:
- Geographic coordinates (lat/lon)
- Protection level (high/moderate/low)
- Meltemi shield rating (excellent/good/moderate/poor)
- Detailed description

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configure environment variables** in Vercel dashboard

### Option 2: DigitalOcean / AWS / Heroku

1. Set up your server
2. Install dependencies
3. Configure environment variables
4. Start with `npm start`
5. Use PM2 or similar for process management

### Option 3: Docker

```bash
# Coming soon - Dockerfile will be added
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=production
API_BASE_URL=https://your-domain.com/api
WEATHER_API_URL=https://api.open-meteo.com/v1/forecast
ALLOWED_ORIGINS=https://your-domain.com
PAYPAL_LINK=https://paypal.me/geokritikos
```

### Frontend Configuration

Edit `frontend/js/config.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://your-api-domain.com/api',
  PAYPAL_LINK: 'https://paypal.me/geokritikos'
};
```

## 📊 Tech Stack

**Backend:**
- Node.js + Express.js
- Open-Meteo Weather API
- JSON file storage (upgradable to PostgreSQL/MongoDB)

**Frontend:**
- Vanilla JavaScript (no framework dependencies)
- Modern CSS with gradients and animations
- Responsive design

**DevOps:**
- Git for version control
- Environment-based configuration
- RESTful API architecture

## 🧪 Testing

```bash
# Coming soon
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💝 Support the Project

Help us map every safe swimming spot in the Aegean Sea!

**Donate:** [paypal.me/geokritikos](https://paypal.me/geokritikos)

Your donations fund:
- Research trips to map more islands
- Premium weather API for better accuracy
- Mobile app development
- Server costs
- Beach safety equipment donations

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Geo Kritikos**
- GitHub: [@geocorfu](https://github.com/geocorfu)
- Website: [aegeanswim.com](https://aegeanswim.com) (coming soon)

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo API](https://open-meteo.com/)
- Beach data compiled from personal research and community contributions
- Built with ❤️ for beach lovers and swimmers

## 📮 Contact

Questions? Suggestions? Found a great beach we should add?

- Open an issue on GitHub
- Email: [Your email here]
- Twitter: [Your Twitter]

---

**Made with 🌊 in the Aegean Sea**
