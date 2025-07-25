// lib/actions.ts
'use server';

import { Resend } from 'resend';
const LOGO_URL = "../public/image/logo.jpg"; // Asegúrate de que esta ruta sea correcta y accesible

// Define las interfaces necesarias
// Si estas interfaces ya están definidas en otro lugar, puedes importarlas.
// De lo contrario, asegúrate de que coincidan con la estructura de tus datos.
interface CustomerData {
  documentId: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  driver_age: number;
}

interface CarTypeData {
  documentId: string;
  name: string;
  price: number;
}

interface ReservationData {
  dropoff_date: string;
  dropoff_time: string;
  pickup_date: string;
  pickup_time: string;
  location: string;
  total_price: number;
  customer: {
    first_name: string;
    last_name: string;
  };
  type: CarTypeData; // Aseguramos que el tipo contenga documentId, name y price
}

interface EmailDetails {
  customer: CustomerData;
  reservation: ReservationData;
  carTypeName: string; // Nombre del tipo de coche
  totalPrice: number; // Precio total de la reserva
}

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const RESEND_VERIFIED_DOMAIN = process.env.RESEND_VERIFIED_DOMAIN;

export async function sendCustomerConfirmationEmail(emailDetails: EmailDetails) {
  const { customer, reservation, carTypeName, totalPrice } = emailDetails;

  if (!RESEND_VERIFIED_DOMAIN) {
    console.error('RESEND_VERIFIED_DOMAIN is not set in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    await resend.emails.send({
      from: `Via Car Rental <noreply@${RESEND_VERIFIED_DOMAIN}>`,
      to: [customer.email],
      subject: 'Confirmación de tu Reserva de Vehículo',
      html: `
        <div style="font-family: Montserrat, sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
            <img src=${LOGO_URL} alt="Company Logo" style="max-width: 150px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
            <h1 style="color: #ffb800;">¡Hola ${customer.first_name} ${customer.last_name}!</h1>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <p>Your reservation has been successfully confirmed.</p>
            <p><strong>Reservation Details:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Vehicle Type</strong> ${carTypeName}</li>
              <li style="margin-bottom: 10px;"><strong>Ubicación:</strong> ${reservation.location}</li>
              <li style="margin-bottom: 10px;"><strong>Pickup:</strong> ${reservation.pickup_date} a las ${reservation.pickup_time}</li>
              <li style="margin-bottom: 10px;"><strong>Drop-off:</strong> ${reservation.dropoff_date} a las ${reservation.dropoff_time}</li>
              <li style="margin-bottom: 10px;"><strong>Total Price: </strong> $${totalPrice.toFixed(2)}</li>
            </ul>
            <p>We will contact you if we need more information.</p>
            <p>Thank you for choosing us!</p>
            <br/>
            <p style="font-size: 0.9em; color: #777;">This is an automated message. Please do not reply to this email.</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; color: #555;">
            &copy; ${new Date().getFullYear()} Via Car Rental. All rights reserved.
          </div>
        </div>
      `,
    });
    console.log('Correo de confirmación enviado al cliente.');
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo de confirmación al cliente:', error);
    return { success: false, error: 'Failed to send customer confirmation email.' };
  }
}

export async function sendAdminNotificationEmail(emailDetails: EmailDetails) {
  const { customer, reservation, carTypeName, totalPrice } = emailDetails;

  if (!ADMIN_EMAIL || !RESEND_VERIFIED_DOMAIN) {
    console.error('ADMIN_EMAIL or RESEND_VERIFIED_DOMAIN is not set in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    await resend.emails.send({
      from: `Via Car Rental <noreply@${RESEND_VERIFIED_DOMAIN}>`,
      to: [ADMIN_EMAIL],
      subject: 'You have a new reservation',
      html: `
        <div style="font-family: Montserrat, sans-serif; line-height: 1.6; color: #333;">
          <div style="padding: 20px; background-color: #ffffff;">
            <p>Your reservation has been successfully confirmed.</p>
            <p><strong>Customer Details:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>First Name</strong> ${customer.first_name}</li>
              <li style="margin-bottom: 10px;"><strong>Last Name</strong> ${customer.last_name}</li>
              <li style="margin-bottom: 10px;"><strong>Email:</strong> ${customer.email}</li>
              <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${customer.phone}</li>
              <li style="margin-bottom: 10px;"><strong>Age:</strong> ${customer.driver_age}</li>
      
            </ul>
            <p><strong>Reservation Details:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Vehicle Type</strong> ${carTypeName}</li>
              <li style="margin-bottom: 10px;"><strong>Ubicación:</strong> ${reservation.location}</li>
              <li style="margin-bottom: 10px;"><strong>Pickup:</strong> ${reservation.pickup_date} a las ${reservation.pickup_time}</li>
              <li style="margin-bottom: 10px;"><strong>Drop-off:</strong> ${reservation.dropoff_date} a las ${reservation.dropoff_time}</li>
              <li style="margin-bottom: 10px;"><strong>Total Price: </strong> $${totalPrice.toFixed(2)}</li>
            </ul>
            <p style="font-size: 0.9em; color: #777;">Este es un mensaje automático, por favor no respondas a este correo.</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; color: #555;">
            &copy; ${new Date().getFullYear()} Via Car Rental. All rights reserved.
          </div>
        </div>
      `,
    });
    console.log('Notificación de nueva reserva enviada al administrador.');
    return { success: true };
  } catch (error) {
    console.error('Error al enviar notificación al administrador:', error);
    return { success: false, error: 'Failed to send admin notification email.' };
  }
}