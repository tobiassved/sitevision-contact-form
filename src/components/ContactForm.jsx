import React, { useState } from 'react';
import toast from '@sitevision/api/client/toast';
import './ContactForm.css';

/**
 * ContactForm - En React-komponent för kontaktformulär
 * 
 * Features:
 * - Validering av obligatoriska fält
 * - E-post formatvalidering
 * - Skickar data till server för lagring
 * - Visar tack-meddelande efter lyckad submit
 * - Errorhantering med toast-notifikationer
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /**
   * Validerar e-post format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validerar alla fält
   */
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Namn är obligatoriskt');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('E-post är obligatoriskt');
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Ogiltig e-postadress');
      return false;
    }

    if (!formData.message.trim()) {
      toast.error('Meddelande är obligatoriskt');
      return false;
    }

    return true;
  };

  /**
   * Hanterar ändringar i formulär
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Hanterar formulär submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validera formulär
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Skicka data till server
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Något gick fel vid inlämningen');
      }

      // Framgång!
      setSubmitSuccess(true);
      toast.success('Tack! Vi har mottagit ditt meddelande');

      // Rensa formulär
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Dölj framgångsmeddelande efter 5 sekunder
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Ett fel uppstod');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="contact-form-container">
        <div className="success-message">
          <h2>✅ Tack för ditt meddelande!</h2>
          <p>Vi har mottagit din inlämning och kommer att kontakta dig inom kort.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      <h2>Kontakta oss</h2>
      <p className="intro-text">Fyll i formuläret nedan så kontaktar vi dig så snart som möjligt.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        {/* Namn */}
        <div className="form-group">
          <label htmlFor="name">Namn *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ditt namn"
            disabled={isLoading}
          />
        </div>

        {/* E-post */}
        <div className="form-group">
          <label htmlFor="email">E-post *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="din@email.se"
            disabled={isLoading}
          />
        </div>

        {/* Telefon */}
        <div className="form-group">
          <label htmlFor="phone">Telefon</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="070-123 45 67"
            disabled={isLoading}
          />
        </div>

        {/* Meddelande */}
        <div className="form-group">
          <label htmlFor="message">Meddelande *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Skriv ditt meddelande här..."
            rows="5"
            disabled={isLoading}
          />
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Skickar...' : 'Skicka'}
        </button>
      </form>
    </div>
  );
}
