/**
 * Contact Form - Client-side Entry Point (main.js)
 * 
 * Ansvar:
 * - Hydrera React-appen från server-rendered HTML
 * - Monterar React-komponenterna för interaktivitet
 */

import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';

/**
 * Hydrera React-appen när DOM är redo
 */
const rootElement = document.getElementById('app');

if (rootElement) {
  hydrate(<App />, rootElement);
} else {
  console.error('Root element #app not found');
}
