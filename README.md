# 📧 Sitevision Contact Form WebApp

En komplett kontaktformulär-modul för Sitevision WebApps2 med lagring av inlämningar.

## ✨ Features

- ✅ **Responsiv formulär** - Namn, e-post, telefon, meddelande
- ✅ **Client-side validering** - E-postformat, obligatoriska fält
- ✅ **Server-side validering** - Säkerhetskontroller på servern
- ✅ **Data lagring** - Sitevision KeyValueDataStore
- ✅ **CSRF-skydd** - Integrerat säkerhetsskydd
- ✅ **Tack-meddelande** - Bekräftelse efter lyckad inlämning
- ✅ **Modernt design** - Responsive CSS, bra UX
- ✅ **Admin API** - Endpoint för att hämta alla inlämningar

## 🚀 Installation

### 1. Krav
- Node.js 14+ 
- Sitevision 10.0+
- Create Sitevision App CLI

### 2. Setup

```bash
# Installera dependencies
npm install

# Build modulen
npm run build
```

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

## 📦 Deployment

### 1. Build production
```bash
npm run build
```

### 2. Package modulen
Sitevision WebApps förväntar en ZIP-fil med:
- `manifest.json`
- `src/` mapp
- `dist/` mapp (efter build)

### 3. Deployer till Sitevision
```bash
npm run deploy
```

Or manuellt via Sitevision Admin:
1. Gå till **Modules** → **Web Apps**
2. Klicka **Import Module**
3. Välj ZIP-filen
4. Konfigurера modulen
5. Aktivera och placera på sida

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

## 📄 Licens

MIT

## 👨‍💻 Utvecklare

Sitevision Developer Team
- [Sitevision.se](https://www.sitevision.se)
- [Developer Portal](https://developer.sitevision.se)

---

**Senaste uppdatering:** 2024-02-02  
**Status:** ✅ Production Ready
