import React from 'react';
import ContactForm from './ContactForm';

/**
 * App - Root React komponent
 * 
 * Wrapper för hele appen
 */
export default function App() {
  return (
    <div id="app" className="app-root">
      <ContactForm />
    </div>
  );
}
