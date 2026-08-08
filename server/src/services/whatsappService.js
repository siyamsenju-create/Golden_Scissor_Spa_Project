const axios = require('axios');

/**
 * WhatsApp Service — Golden Scissor Spa & Saloon
 * Interacts with Meta WhatsApp Cloud API
 */

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || 'v17.0';
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || 'booking_confirmation';

/**
 * Formats a phone number to E.164 standard (e.g., +919999999999 or 919999999999)
 * @param {string} phone 
 * @returns {string}
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Remove non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 0, strip it
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Default country code handling: If it has 10 digits (common for India/US without code), add country prefix
  // Since user mentioned "Indian numbers correctly", let's handle Indian numbers (10 digits starting with 6-9)
  if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
    cleaned = '91' + cleaned; // Add Indian country code
  }
  
  return cleaned;
};

/**
 * Sends a template WhatsApp message to the customer
 * @param {string} toPhone - Customer's phone number
 * @param {object} templateData - Details of the template parameters
 * @param {string} templateName - Override template name (optional)
 * @returns {Promise<{success: boolean, messageId?: string, error?: any}>}
 */
const sendWhatsAppTemplate = async (toPhone, templateData, templateName = WHATSAPP_TEMPLATE_NAME) => {
  const formattedPhone = formatPhoneNumber(toPhone);
  
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.warn('⚠️ WhatsApp credentials missing. Skipping message send.');
    return { success: false, error: 'WhatsApp credentials missing' };
  }

  if (!formattedPhone) {
    return { success: false, error: 'Invalid phone number format' };
  }

  // Construct components for the Meta Template
  // Meta parameters must match the order in the template: e.g. {{1}}, {{2}}, {{3}}...
  const parameters = [];
  if (templateData.parameters) {
    templateData.parameters.forEach(val => {
      parameters.push({
        type: 'text',
        text: String(val)
      });
    });
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: formattedPhone,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en' // Default to english
      },
      components: [
        {
          type: 'body',
          parameters: parameters
        }
      ]
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.messages && response.data.messages[0]) {
      console.log(`✅ WhatsApp sent successfully to ${formattedPhone}. Message ID: ${response.data.messages[0].id}`);
      return { success: true, messageId: response.data.messages[0].id };
    }
    
    return { success: false, error: 'No message ID returned from Meta' };
  } catch (error) {
    const errorDetails = error.response ? error.response.data : error.message;
    console.error('❌ WhatsApp API Error details:', JSON.stringify(errorDetails, null, 2));
    return { success: false, error: errorDetails };
  }
};

module.exports = {
  formatPhoneNumber,
  sendWhatsAppTemplate
};
