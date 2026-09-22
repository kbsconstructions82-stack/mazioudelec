import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// The email address where you want to receive notifications
const TO_EMAIL = process.env.CONTACT_EMAIL || 'contact@mazioudelec.fr';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      type, // 'quote', 'emergency', 'appointment', 'callback'
      fullName, phone, email, city, 
      serviceType, budgetRange, customBudget, desiredDateOption, specificDate, description,
      address, date, time
    } = req.body;

    let subject = '';
    let htmlContent = '';

    if (type === 'quote') {
      subject = `Nouveau devis : ${serviceType} - ${fullName}`;
      htmlContent = `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Client :</strong> ${fullName}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Email :</strong> ${email || 'Non spécifié'}</p>
        <p><strong>Ville :</strong> ${city || 'Non spécifié'}</p>
        <hr/>
        <p><strong>Prestation :</strong> ${serviceType}</p>
        <p><strong>Date souhaitée :</strong> ${desiredDateOption} ${specificDate ? `(${specificDate})` : ''}</p>
        <p><strong>Budget indicatif :</strong> ${customBudget || budgetRange || 'Non spécifié'}</p>
        <p><strong>Description :</strong><br/>${description || 'Aucune description'}</p>
      `;
    } else if (type === 'emergency') {
      subject = `URGENCE ÉLECTRIQUE - ${fullName} - ${city || address}`;
      htmlContent = `
        <h2 style="color: red;">🚨 URGENCE ÉLECTRIQUE 🚨</h2>
        <p><strong>Client :</strong> ${fullName}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Adresse/Ville :</strong> ${address || city || 'Non spécifié'}</p>
        <hr/>
        <p><strong>Description du problème :</strong><br/>${description || 'Non spécifié'}</p>
      `;
    } else if (type === 'appointment') {
      subject = `Demande de rendez-vous - ${fullName}`;
      htmlContent = `
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Client :</strong> ${fullName}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Email :</strong> ${email || 'Non spécifié'}</p>
        <p><strong>Ville :</strong> ${city}</p>
        <hr/>
        <p><strong>Motif :</strong> ${serviceType}</p>
        <p><strong>Date souhaitée :</strong> ${date}</p>
        <p><strong>Créneau :</strong> ${time}</p>
        <p><strong>Détails :</strong><br/>${description || 'Non spécifié'}</p>
      `;
    } else if (type === 'callback') {
      subject = `Rappel demandé - ${fullName}`;
      htmlContent = `
        <h2>Demande de rappel téléphonique</h2>
        <p><strong>Client :</strong> ${fullName}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <hr/>
        <p><strong>Sujet :</strong> ${serviceType || 'Non spécifié'}</p>
      `;
    } else {
      subject = `Nouvelle demande de contact - ${fullName || 'Client'}`;
      htmlContent = `<p>Nouvelle demande reçue depuis le site web.</p><pre>${JSON.stringify(req.body, null, 2)}</pre>`;
    }

    const { data, error } = await resend.emails.send({
      from: 'Mazioudelec Site Web <onboarding@resend.dev>', 
      to: TO_EMAIL,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
