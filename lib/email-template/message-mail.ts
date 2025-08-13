// Types for different email data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// EMAIL TEMPLATE REDIRECT TO OWNER AFTER USER SEND MESSAGE FORM
export const messageContactEmailTemplate = (data: ContactFormData) => {
  // Email-proof helpers
  const placeholder =
    '<span style="color:#6b6f76;font-style:italic">Not specified</span>';
  const hasVal = (v?: string | number) =>
    v !== undefined && v !== null && String(v).trim() !== "";
  const esc = (v?: string | number): string => {
    const s = hasVal(v) ? String(v) : "";
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };
  const fallback = (v?: string | number): string =>
    hasVal(v) ? esc(v) : placeholder;

  // Personalize the reply target line
  const recipient =
    hasVal(data?.name) && hasVal(data?.email)
      ? `${esc(data.name)} &lt;${esc(data.email)}&gt;`
      : hasVal(data?.email)
      ? esc(data.email)
      : hasVal(data?.name)
      ? esc(data.name)
      : "the sender";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Contact Message — Rahajoe Creativa</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <style>
    /* Email-safe resets */
    body,table,td,div,p{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
    table{border-collapse:collapse}
    a{color:#2f3437;text-decoration:underline} /* neutral link, no blue */

    /* Notion-ish tokens (same as other templates) */
    .bg-canvas{background:#f6f7f8}
    .text{color:#2f3437}
    .muted{color:#6b6f76}
    .border{border:1px solid #e6e7e9}
    .divider{border-top:1px solid #e6e7e9;height:1px;line-height:1px}
    .radius{border-radius:12px}

    /* Layout */
    .container{max-width:720px;background:#ffffff;margin:0 auto}
    .px{padding-left:28px;padding-right:28px}
    .py{padding-top:28px;padding-bottom:20px}
    .section-gap{margin-top:22px}

    /* Header */
    .h-title{font-weight:700;font-size:28px;line-height:1.25;letter-spacing:-0.2px}
    .h-sub{font-size:13px;line-height:1.4}

    /* Callout & boxes */
    .callout{background:#f3f4f6;border:1px solid #e6e7e9;border-radius:8px}
    .box{background:#f9f9f8;border:1px solid #e6e7e9;border-radius:8px}

    /* Fields */
    .field{font-size:14px;line-height:1.55;margin-bottom:8px}
    .label{font-weight:600;display:inline-block;min-width:60px;color:#2f3437}
    .value{color:#2f3437}

    /* Message content */
    .msg{background:#fff;border:1px solid #e6e7e9;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;white-space:pre-wrap}

    /* Mobile */
    @media screen and (max-width:620px){
      .container{width:100% !important}
      .px{padding-left:16px !important;padding-right:16px !important}
      .py{padding-top:20px !important;padding-bottom:12px !important}
      .h-title{font-size:22px !important}
      .h-sub{font-size:12px !important}
    }
  </style>
</head>
<body class="bg-canvas" style="margin:0;padding:0">
  <!-- Preheader (hidden) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
    New Contact Message — Rahajoe Creativa
  </div>

  <!--[if mso]><center><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="720"><tr><td><![endif]-->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" class="container">
    <tr>
      <td class="px py">
        <!-- Header -->
        <table role="presentation" width="100%">
          <tr>
            <td>
              <div class="h-title text">New Contact Message</div>
              <div class="h-sub muted" style="padding-top:6px">Website Contact Form Submission</div>
            </td>
          </tr>
          <tr><td class="divider">&nbsp;</td></tr>
        </table>

        <!-- Content -->
        <table role="presentation" width="100%" class="section-gap">
          <tr>
            <td>
              <!-- Reply note (neutral callout, personalized) -->
              <table role="presentation" width="100%" class="callout">
                <tr>
                  <td style="padding:16px;text-align:center">
                    <div style="font-size:14px" class="text">
                      Just hit reply — your message goes straight to ${recipient}.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Contact info -->
              <table role="presentation" width="100%" class="box" style="margin-top:20px">
                <tr>
                  <td style="padding:20px">
                    <div style="font:600 16px Arial,sans-serif;margin:0 0 12px 0" class="text">Contact Information</div>
                    <div class="field">
                      <span class="label">From:</span>
                      <span class="value">${fallback(data.name)}</span>
                    </div>
                    <div class="field">
                      <span class="label">Email:</span>
                      <span class="value">${fallback(data.email)}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" class="section-gap">
                <tr>
                  <td>
                    <div style="font:600 16px Arial,sans-serif;margin:0 0 12px 0" class="text">Message</div>
                    <div class="msg">${fallback(data.message)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td class="divider">&nbsp;</td></tr>
          <tr>
            <td style="padding-top:12px">
              <div style="font:13px Arial,sans-serif" class="muted">
                Submitted on: ${new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </div>
              <div style="font:13px Arial,sans-serif;margin-top:6px" class="muted">
                This message was submitted through the Rahajoe Creativa website.
              </div>
              <table role="presentation" width="100%" class="callout" style="margin-top:12px">
                <tr>
                  <td style="padding:12px;text-align:center">
                    <div style="font-size:13px" class="text">
                      Ready to respond? Reply to this email and we’ll route it to ${recipient}.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table></center><![endif]-->
</body>
</html>
  `;
};

export const messageContactPlainTextTemplate = (data: ContactFormData) => {
  return `NEW CONTACT MESSAGE - Rahajoe Creativa
Website Contact Form Submission

📧 Reply to this email to respond directly to the sender

Contact Information
──────────────────
👤 From: ${data.name}
📧 Email: ${data.email}

Message
───────
💬 ${data.message}

──────────────────────────────────

📅 Submitted on: ${new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })}

This message was submitted through the Rahajoe Creativa website.

💡 Simply reply to this email to respond directly to ${data.email}
  `;
};

// Contact Email Templates
export const messageConfirmationEmailTemplate = (data: ContactFormData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - Rahajoe Creativa</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #37352f;
      background-color: #ffffff;
      padding: 0;
      margin: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 0;
    }
    
    .header {
      background-color: #ffffff;
      padding: 48px 40px 32px 40px;
      border-bottom: 1px solid #e9e9e7;
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #37352f;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }
    
    .header .subtitle {
      font-size: 16px;
      color: #787774;
      font-weight: 400;
    }
    
    .content {
      padding: 40px;
    }
    
    .reply-notice {
      background-color: #f1f9ff;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 32px;
      text-align: center;
      border: 1px solid #d3e5f7;
    }
    
    .reply-notice .icon {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    
    .reply-notice p {
      font-size: 15px;
      color: #37352f;
      font-weight: 500;
      margin: 0;
    }
    
    .sender-info {
      background-color: #f7f6f3;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      border-left: 3px solid #2eaadc;
    }
    
    .sender-info h3 {
      font-size: 18px;
      font-weight: 600;
      color: #37352f;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    
    .sender-info h3::before {
      content: "👤";
      margin-right: 8px;
      font-size: 18px;
    }
    
    .field {
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .field-label {
      font-weight: 600;
      color: #37352f;
      min-width: 60px;
      font-size: 14px;
    }
    
    .field-value {
      color: #37352f;
      font-size: 15px;
      flex: 1;
    }
    
    .message-section {
      margin-top: 32px;
    }
    
    .message-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #37352f;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    
    .message-section h3::before {
      content: "💬";
      margin-right: 8px;
      font-size: 18px;
    }
    
    .message-content {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e9e9e7;
      font-size: 15px;
      color: #37352f;
      line-height: 1.65;
      white-space: pre-wrap;
    }
    
    .footer {
      background-color: #f7f6f3;
      padding: 24px 40px;
      border-top: 1px solid #e9e9e7;
      margin-top: 40px;
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer p {
      font-size: 13px;
      color: #787774;
      margin-bottom: 8px;
    }
    
    .footer .timestamp {
      font-weight: 500;
      color: #37352f;
    }
    
    .footer .reply-instruction {
      background-color: #f1f9ff;
      border-radius: 6px;
      padding: 12px;
      margin-top: 16px;
      border: 1px solid #d3e5f7;
    }
    
    .footer .reply-instruction p {
      color: #2eaadc;
      font-weight: 500;
      margin: 0;
      font-size: 14px;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 20px;
      }
      
      .header {
        padding: 32px 24px 24px 24px;
      }
      
      .header h1 {
        font-size: 28px;
      }
      
      .content {
        padding: 24px;
      }
      
      .footer {
        padding: 24px;
      }
      
      .field {
        flex-direction: column;
        gap: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Contact Message</h1>
      <div class="subtitle">Website Contact Form Submission</div>
    </div>
    
    <div class="content">
      <div class="reply-notice">
        <span class="icon">📧</span>
        <p>Reply to this email to respond directly to the sender</p>
      </div>
      
      <div class="sender-info">
        <h3>Contact Information</h3>
        <div class="field">
          <span class="field-label">From:</span>
          <span class="field-value">${data.name}</span>
        </div>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value">${data.email}</span>
        </div>
      </div>
      
      <div class="message-section">
        <h3>Message</h3>
        <div class="message-content">${data.message.replace(/\n/g, "\n")}</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-content">
        <p class="timestamp">Submitted on: ${new Date().toLocaleString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          }
        )}</p>
        <p>This message was submitted through the Rahajoe Creativa website.</p>
        
        <div class="reply-instruction">
          <p>💡 Simply reply to this email to respond directly to ${
            data.email
          }</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
