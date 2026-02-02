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

## ⚡ QUICK START - För omedelbar deployment

**Redan byggd och redo att deploy?** Ladda ned den färdiga modulen direkt:

### 📥 Snabbinstallation för Sitevision Admin

1. **Ladda ned dist-ZIP-filen:**
   - 📦 [sitevision-contact-form-dist.zip](https://YOUR_FILE_SERVER/sitevision-contact-form-dist.zip) (16 KB)
   - Eller använd File Transfer Service direkt

2. **Importera till Sitevision:**
   ```
   Sitevision Admin → Moduler → WebApps2 → Importera modul
   Välj: sitevision-contact-form-dist.zip
   Klicka: Deploy
   ✅ Modulen är live!
   ```

3. **Placera på sida:**
   ```
   Sitevision Page Editor → Lägg till komponent → Sitevision Contact Form
   ```

**Klart!** Formuläret är nu live och tar emot inlämningar.

---

## 🚀 Installation & Snabbstart

### För utvecklare: Lokal installation

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

### ✅ Redan redo! Använd den färdiga ZIP-filen

**sitevision-contact-form-dist.zip** innehåller:
- ✨ `index.js` (36.5 KB) - Server-side rendering bundle
- ✨ `main.js` (3.4 KB) - Client-side bundle
- ✨ `css/main.css` - Formulär-styling
- ✨ `manifest.json` - WebApp-konfiguration

**Ingen ytterligare build behövs!**

### Steg-för-steg deployment till Sitevision Admin

#### 1️⃣ Ladda ned ZIP-filen
```
Källa: File Transfer Service eller GitHub Releases
Fil: sitevision-contact-form-dist.zip
Storlek: ~16 KB (komprimerad)
```

#### 2️⃣ Öppna Sitevision Admin och navigera till WebApps2
```
Sitevision Admin → Moduler → WebApps2
```

#### 3️⃣ Importera modulen
```
Klicka: "Importera modul" eller "Import WebApp"
Välj fil: sitevision-contact-form-dist.zip
Bekräfta import
Vänta på meddelandet "Modulen är installerad"
```

#### 4️⃣ Placera formuläret på en sida
```
1. Öppna sidan i Page Editor
2. Lägg till komponent
3. Välj: "Sitevision Contact Form"
4. Spara sidan
✅ Formuläret är nu live!
```

#### 5️⃣ (Valfritt) Hämta inlämningar
```
Admin API: GET /api/contact/submissions
Denna endpoint returnerar alla inlämningar som JSON
```

### För utvecklare: Rebuild från källkod

Vill du modifiera koden? Gör så här:

```bash
# Klona och installera
git clone https://github.com/tobiassved/sitevision-contact-form.git
cd sitevision-contact-form
npm install

# Gör dina ändringar i src/
# (modifiera App.jsx, ContactForm.jsx, etc.)

# Bygg den nya ZIP-filen
npm run build

# ZIP-filen skapas automatiskt i dist/
# Upload den nya ZIP:en till Sitevision
```

### Automatisk Deploy (CI/CD - om konfigurerat)
```bash
npm run deploy
```
(Kräver GitHub Actions eller liknande setup)

## 🔐 Konfiguration i Sitevision

Efter deployment kan administratören:
1. **Ställa in vilka roller som kan se formuläret** via komponenten
2. **Konfigurera e-post-notifikationer** (valfritt) via WebApp-inställningar
3. **Hämta alla inlämningar** via `/api/contact/submissions` endpoint
4. **Exportera data** för analys eller backups

### Hitta Admin API:n
```
Sitevision Admin → Moduler → Sitevision Contact Form → Inställningar
API URL: /api/contact/submissions (GET)
```

Eller direkt i webbläsaren (som admin):
```
https://your-sitevision-domain.com/api/contact/submissions
```

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
