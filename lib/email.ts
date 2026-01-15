import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface TicketEmailData {
  name: string;
  email: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketId: string;
  qrCodeDataUrl: string;
}

export async function sendTicketEmail(data: TicketEmailData): Promise<void> {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify?ticketId=${data.ticketId}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #000;
            color: #fff;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #1a1a1a;
            border-radius: 10px;
            padding: 30px;
            border: 2px solid #a855f7;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #a855f7;
            font-size: 28px;
            margin: 0;
          }
          .ticket-info {
            background: #0a0a0a;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .ticket-info p {
            margin: 10px 0;
          }
          .qr-code {
            text-align: center;
            margin: 30px 0;
          }
          .qr-code img {
            max-width: 250px;
            border: 3px solid #a855f7;
            border-radius: 10px;
            padding: 10px;
            background: #fff;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎟️ Your Ticket is Ready!</h1>
          </div>
          <p>Hi ${data.name},</p>
          <p>Your ticket for <strong>${data.eventTitle}</strong> has been confirmed!</p>
          
          <div class="ticket-info">
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <p><strong>Date:</strong> ${data.eventDate}</p>
            <p><strong>Location:</strong> ${data.eventLocation}</p>
            <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
          </div>
          
          <div class="qr-code">
            <p><strong>Your QR Code:</strong></p>
            <img src="${data.qrCodeDataUrl}" alt="QR Code" />
          </div>
          
          <p style="text-align: center; color: #a855f7;">
            <strong>Present this QR code at the event entrance</strong>
          </p>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>Verification URL: ${verifyUrl}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: data.email,
    subject: `🎟️ Your Ticket for ${data.eventTitle}`,
    html,
  });
}




