interface EmailTemplateData {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export function createContactEmailTemplate(data: EmailTemplateData): string {
  return `
🎨 NEW CONTACT FORM SUBMISSION - Rahajoe Creativa
═══════════════════════════════════════════════════

👤 CLIENT INFORMATION
──────────────────────
Name: ${data.name}
Email: ${data.email}

💬 MESSAGE
──────────
${data.message}

📅 SUBMISSION DETAILS
─────────────────────
Submitted: ${data.submittedAt}
Source: Rahajoe Creativa Website
Form Type: Talk Form

═══════════════════════════════════════════════════
This message was sent via the contact form on your website.
Please respond to the client at: ${data.email}

Best regards,
Rahajoe Creativa Contact System
  `.trim();
}

export function createContactEmailSubject(name: string): string {
  return `🎨 New Contact from ${name} - Rahajoe Creativa`;
}
