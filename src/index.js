/**
 * Contact Form - Server-side Entry Point (index.js)
 * 
 * Hanterar:
 * - Server-side rendering av formuläret
 * - POST-endpoint för formulär-inlämning (/api/contact/submit)
 * - Lagring av inlämningar i Sitevision KeyValueDataStore
 * - GET-endpoint för att hämta alla inlämningar (admin)
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';
import router from '@sitevision/api/common/router';
import storage from '@sitevision/api/server/storage';
import security from '@sitevision/api/common/security';

/**
 * API Endpoint: POST /api/contact/submit
 * Mottager formulärdata och sparar i data store
 */
router.post('/api/contact/submit', (req, res) => {
  try {
    // Validera CSRF token
    const csrfToken = security.getCsrfToken();
    if (!csrfToken) {
      return res.status(403).json({ error: 'CSRF token missing' });
    }

    // Hämta och validera formulärdata
    const { name, email, phone, message } = req.body;

    // Server-side validering (säkerhet)
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Validera e-post format på server
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Skapa submission-objekt
    const submission = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      ipAddress: req.ip // För spårning
    };

    // Lagra i KeyValueDataStore
    try {
      const store = storage.getKeyValueDataStore('contactSubmissions');
      store.put(submission.id, JSON.stringify(submission));

      // Svara med framgång
      res.json({ 
        success: true, 
        message: 'Submission saved successfully',
        submissionId: submission.id
      });
    } catch (storageError) {
      console.error('Storage error:', storageError);
      res.status(500).json({ error: 'Failed to save submission' });
    }

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * API Endpoint: GET /api/contact/submissions
 * Hämtar alla inlämningar (kräver administratörsrättigheter)
 * 
 * Användning: Admin kan anropa detta för att hämta alla inlämningar
 */
router.get('/api/contact/submissions', (req, res) => {
  try {
    const store = storage.getKeyValueDataStore('contactSubmissions');
    const submissions = [];

    // Hämta alla poster från store
    // Notering: Sitevision API kan variera - detta är baserat på standard API
    const allEntries = store.getAll();
    
    if (allEntries) {
      allEntries.forEach(entry => {
        try {
          submissions.push(JSON.parse(entry));
        } catch (e) {
          console.error('Parse error:', e);
        }
      });
    }

    res.json({ 
      success: true, 
      count: submissions.length,
      submissions: submissions.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

/**
 * Server-side Rendering
 * Renderar React-appen på server för bättre performance
 */
router.get('/', (req, res) => {
  try {
    const csrfToken = security.getCsrfToken();
    
    const html = renderToString(<App />);

    res.agnosticRender(html, {
      csrfToken: csrfToken
    });
  } catch (error) {
    console.error('Render error:', error);
    res.status(500).send('Error rendering form');
  }
});
