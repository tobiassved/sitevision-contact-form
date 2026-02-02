# 🛠️ Utvecklingsguide - Sitevision Contact Form

## Lokal Setup

### 1. Installera dependencies
```bash
npm install
```

### 2. Development mode
```bash
npm run dev
```
Detta startar en lokal dev-server med hot reload.

### 3. Build för produktion
```bash
npm run build
```

## 📝 Kodstruktur & Regler

### Server-side (index.js)
- Hanterar POST `/api/contact/submit` för lagring
- Hanterar GET `/api/contact/submissions` för hämtning
- Validerar data på server (säkerhet)
- Använder Sitevision APIs

### Client-side (main.js)
- Hydrera React-appen
- Hanterar användarinteraktion
- Client-side validering (UX)

### React Components
- **App.jsx**: Root komponent
- **ContactForm.jsx**: Själva formuläret
- **ContactForm.css**: Styling

## 🧪 Testning

### Syntax-check
```bash
npm run lint
```

### Manual testing
1. Starta dev-server: `npm run dev`
2. Öppna http://localhost:8080 i browser
3. Testa formulär:
   - Lämna namn tomt → Error
   - Skriv ogiltig e-post → Error
   - Fyll i allt korrekt → Success

### Lagring testa
1. Submit flera formulär
2. Kalla `/api/contact/submissions` i Postman
3. Verify alla inlämningar returneras

## 🔄 Vanliga förändringar

### Lägga till nytt formulärfält

1. **src/components/ContactForm.jsx**:
```jsx
// Lägg till i useState
const [formData, setFormData] = useState({
  // ... befintliga
  newField: ''
});

// Lägg till HTML
<div className="form-group">
  <label htmlFor="newField">New Field *</label>
  <input
    type="text"
    id="newField"
    name="newField"
    value={formData.newField}
    onChange={handleInputChange}
  />
</div>
```

2. **src/index.js** - Validera på server:
```javascript
const { newField } = req.body;
if (!newField || !newField.trim()) {
  return res.status(400).json({ error: 'New field is required' });
}
```

### Ändra styling
- Edit `src/components/ContactForm.css`
- Changes syns omedelbar i dev-mode

### Ändra lagring
- Edit `src/index.js` POST handler
- Ändra hur data sparas/formateras

## 📊 Debugging

### Browser Console
```javascript
// Kontrollera inlämningsdata
console.log(formData);

// Testa API direkt
fetch('/api/contact/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    phone: '',
    message: 'Test message'
  })
}).then(r => r.json()).then(console.log);
```

### Server Logs
```bash
# Dev-server logs visar request/response
npm run dev
```

## 🚀 Deployment Checklist

Innan deployment till Sitevision:

- [ ] Build successful: `npm run build`
- [ ] Linting passed: `npm run lint`
- [ ] manifest.json är korrekt
- [ ] Alla dependencies installerade
- [ ] Testat formulär lokalt
- [ ] API endpoints fungerar
- [ ] Lagring fungerar
- [ ] Ingen känslig data i kod
- [ ] README uppdaterad om ändringar

## 📚 Resurser

- [Sitevision WebApps Docs](https://developer.sitevision.se/docs/webapps)
- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com)

## 🤝 Frågor?

Kontakta: Sitevision Developer Team
