# 📧 Sitevision Contact Form WebApp

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](package.json)

En komplett kontaktformulär-modul för Sitevision WebApps2 med lagring av inlämningar.

## 🎯 Vad är detta?

Detta är ett **GitHub-repository** för **Sitevision Contact Form** - en produktionsklar WebApp2-modul för Sitevision CMS. Modulen tillhandahåller ett responsivt kontaktformulär med:

- ✨ Modern React-baserad formulär
- 💾 Automatisk lagring av inlämningar
- 🔒 Inbyggt säkerhetsskydd (CSRF, validering, XSS-skydd)
- 📊 Admin API för att hämta alla inlämningar
- 🚀 Redo att deploya till Sitevision

**Perfekt för:** Webbplatser, portal, intranät eller andra Sitevision-installationer som behöver ett kontaktformulär.

## ✨ Features

- ✅ **Responsiv formulär** - Namn, e-post, telefon, meddelande
- ✅ **Client-side validering** - E-postformat, obligatoriska fält
- ✅ **Server-side validering** - Säkerhetskontroller på servern
- ✅ **Data lagring** - Sitevision KeyValueDataStore
- ✅ **CSRF-skydd** - Integrerat säkerhetsskydd
- ✅ **Tack-meddelande** - Bekräftelse efter lyckad inlämning
- ✅ **Modernt design** - Responsive CSS, bra UX
- ✅ **Admin API** - Endpoint för att hämta alla inlämningar

## 🚀 Installation & Snabbstart

### 1. Krav
- **Node.js** 14+ 
- **Sitevision** 10.0+
- **Create Sitevision App CLI** (installeras via `npm install -g @sitevision/app-cli`)

### 2. Lokalt Setup

Klona eller ladda ned detta repository och installera:

```bash
# Klona repository
git clone https://github.com/USERNAME/sitevision-contact-form.git
cd sitevision-contact-form

# Installera dependencies
npm install

# Build modulen för utveckling
npm run build

# Eller kör dev-server (om tillgängligt)
npm run dev
```

### 3. Verifiera Installation

Efter build, kontrollera att `dist/`-mappen är skapad:
```bash
ls -la dist/
```

Du bör se byggda filer klara för deployment.

## 📁 Projektstruktur

```
sitevision-contact-form/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Root React komponent
│   │   ├── ContactForm.jsx      # Formulär komponent
│   │   └── ContactForm.css      # Formulär styling
│   ├── index.js                 # Server-side entry point
│   └── main.js                  # Client-side entry point
├── manifest.json                # WebApp metadata
├── package.json                 # NPM dependencies
├── webpack.config.js            # Build configuration
├── .dev_properties.json         # Dev properties
└── README.md                    # Denna fil
```

## 🔧 Konfiguration

### manifest.json
- **id**: `contactForm` - Unikt id för modulen
- **version**: `1.0.0` - Version
- **storage**: Använder `contactSubmissions` KeyValueDataStore
- **bundled**: `true` - WebApps2 format

### .dev_properties.json
Använd denna för lokal testning:
```json
{
  "serverUrl": "http://localhost:8080",
  "username": "admin",
  "password": "admin"
}
```

## 📝 Formulärfält

| Fält | Typ | Obligatoriskt | Validering |
|------|------|---------------|-----------|
| Namn | Text | ✅ | Minst 1 tecken |
| E-post | Email | ✅ | Giltigt e-postformat |
| Telefon | Tel | ❌ | Valfritt |
| Meddelande | Textarea | ✅ | Minst 1 tecken |

## 🌐 API Endpoints

### POST /api/contact/submit
Skickar en ny inlämning.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "070-123 45 67",
  "message": "Hej, jag har en fråga..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Submission saved successfully",
  "submissionId": "1643817000123abc"
}
```

**Response (Error):**
```json
{
  "error": "Invalid email format"
}
```

### GET /api/contact/submissions
Hämtar alla inlämningar (kräver admin-behörighet).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "submissions": [
    {
      "id": "1643817000123abc",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "070-123 45 67",
      "message": "Hej, jag har en fråga...",
      "createdAt": "2023-02-02T10:30:00.000Z",
      "ipAddress": "192.168.1.1"
    }
  ]
}
```

## 🧪 Testning

### Build Test
```bash
npm run build
```
Förväntat resultat: `dist/` mapp skapas utan fel.

### Lokal testning
Med Create Sitevision App dev-server:
```bash
npm run dev
```

### Validering
- ✅ Ingen syntax-fel: `npm run lint`
- ✅ Formulär validering fungerar
- ✅ Data lagras i KeyValueDataStore
- ✅ GET /api/contact/submissions hämtar data
- ✅ CSRF-skydd aktivt

## 🛡️ Säkerhet

- ✅ **CSRF Protection**: Integrerat i manifestet (`csrfProtection: true`)
- ✅ **Server-side Validation**: E-post, obligatoriska fält
- ✅ **Data Sanitization**: XSS-skydd via React
- ✅ **IP Logging**: IP-adress loggas för spårning
- ✅ **Rate Limiting**: Kan implementeras på server om behövs

## 📦 Deployment till Sitevision

### Steg 1: Build Production-version
```bash
npm run build
```
Detta skapar en optimerad `dist/`-mapp.

### Steg 2: Paketeras som ZIP
Sitevision WebApps2 förväntar en ZIP-fil innehållande:
```
sitevision-contact-form.zip
├── manifest.json           ← Modulkonfiguration
├── package.json
├── src/                    ← Source-kod
│   ├── components/
│   ├── index.js
│   └── main.js
└── dist/                   ← Byggda/kompilerade filer
    └── (webpack output)
```

Skapa ZIP manuellt:
```bash
zip -r sitevision-contact-form.zip manifest.json package.json src/ dist/
```

### Steg 3: Importera till Sitevision Admin

1. Logga in i **Sitevision Admin**
2. Navigera till **Moduler** → **WebApps2**
3. Klicka **+ Importera modul** eller **Import**
4. Välj `sitevision-contact-form.zip`
5. Bekräfta och vänta på import
6. Modulen är nu tillgänglig för konfiguration

### Steg 4: Konfiguration i Sitevision

Efter import kan du:
- **Placera formuläret** på en sida via komponenten
- **Ställa in åtkomsträttigheter** (vilka roller som ser formuläret)
- **Konfigurera e-post-notifikationer** (valfritt)
- **Hämta inlämningar** via Admin API-endpoint

### Automatisk Deploy (om CI/CD är konfigurerat)
```bash
npm run deploy
```
(Kräver GitHub Actions eller liknande setup)

## 🔐 Konfiguration i Sitevision

Efter deployment kan administratören:
1. Ställa in vilka roller som kan se formuläret
2. Konfigurera e-post-notifikationer
3. Hämta alla inlämningar via `/api/contact/submissions`
4. Exportera data för analys

## 🐛 Troubleshooting

### Modulen laddar inte
- Kontrollera att manifest.json är korrekt
- Verify att `bundled: true` är satt
- Se webpack build-output för fel

### Inlämningar sparas inte
- Kontrollera att KeyValueDataStore är aktiverat
- Verify att `storage.keyValueDataStore` är konfigurerat
- Check server logs för lagringfel

### E-post validering fungerar inte
- Verify att `validateEmail()` funktion körs
- Check browser console för JavaScript-fel

## 📚 Referenser

- [Sitevision WebApps Documentation](https://developer.sitevision.se/docs/webapps)
- [Sitevision API Documentation](https://developer.sitevision.se/api)
- [React Documentation](https://react.dev)
- [Sitevision KeyValueDataStore](https://developer.sitevision.se/docs/webapps/sdk/storage)

## 🤝 Bidra (Contributing)

Vill du förbättra modulen? Du är välkommen att:

1. **Fork** detta repository
2. Skapa en feature-branch: `git checkout -b feature/din-feature`
3. Gör dina ändringar och commita: `git commit -m "Add: beskrivning av feature"`
4. Push till branchen: `git push origin feature/din-feature`
5. Öppna en **Pull Request** med en beskrivning

### Regler för bidrag
- Följ befintlig kod-stil
- Testa dina ändringar lokalt med `npm run build`
- Uppdatera README.md om du ändrar funktionalitet
- Skapa tydliga commit-meddelanden på svenska

## 💬 Support & Kontakt

Har du frågor eller hittat en bugg?

- **Issues:** [Öppna ett GitHub Issue](https://github.com/USERNAME/sitevision-contact-form/issues)
- **Diskussioner:** [GitHub Discussions](https://github.com/USERNAME/sitevision-contact-form/discussions)
- **Sitevision Support:** [Developer Portal](https://developer.sitevision.se)

## 📄 Licens

MIT - Se LICENSE-filen för detaljer

## 👨‍💻 Utvecklare

Sitevision Developer Team
- [Sitevision.se](https://www.sitevision.se)
- [Developer Portal](https://developer.sitevision.se)

---

**Senaste uppdatering:** 2026-02-02  
**Status:** ✅ Production Ready  
**GitHub:** https://github.com/USERNAME/sitevision-contact-form
