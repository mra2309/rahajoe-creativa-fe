import { FormData } from "@/components/form/questionnaire-form";

// EMAIL TEMPLATE REDIRECT TO OWNER AFTER USER SEND QUESTIONNAIRE FORM
export const questionnaireEmailTemplate = (
  data: FormData,
  budgetOptions: Array<{ value: string; label: string }>
) => {
  const budgetOption = budgetOptions.find((opt) => opt.value === data.budget);
  const budgetDisplay =
    budgetOption?.label || (data.budget ? `$${data.budget}` : undefined);

  // Placeholder diganti jadi tanda minus (-), warna abu-abu
  const placeholder = '<span style="color:#6b6f76">-</span>';

  const fallback = (value?: string | number): string =>
    value !== undefined && value !== null && String(value).trim()
      ? String(value)
      : placeholder;

  const fallbackBudget = (value?: string | number): string =>
    value !== undefined && value !== null && String(value).trim()
      ? `$${String(value).replace(/^\$/, "")}`
      : placeholder;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Logo Questionnaire — Submission Summary</title>
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <style>
    body,table,td,div,p{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
    table{border-collapse:collapse}
    a{color:#0b57d0;text-decoration:underline}

    .bg-canvas{background:#f6f7f8}
    .text{color:#2f3437}
    .muted{color:#6b6f76}
    .border{border:1px solid #e6e7e9}
    .divider{border-top:1px solid #e6e7e9;height:1px;line-height:1px}
    .radius{border-radius:12px}

    .container{max-width:720px;background:#ffffff;margin:0 auto}
    .px{padding-left:28px;padding-right:28px}
    .py{padding-top:28px;padding-bottom:28px}
    .section-gap{margin-top:22px}

    .h-title{font-weight:700;font-size:28px;line-height:1.25;letter-spacing:-0.2px}
    .h-sub{font-size:13px;line-height:1.4}

    .prop-label{width:220px;padding:12px 16px;font-size:13px}
    .prop-val{padding:12px 16px;font-size:15px}
    .prop-row + .prop-row td{border-top:1px solid #e6e7e9}

    .pill{display:inline-block;padding:3px 8px;border:1px solid #e6e7e9;border-radius:999px;font-size:12px;line-height:1.4;margin-right:6px;margin-bottom:6px}

    @media screen and (max-width:620px){
      .container{width:100% !important}
      .px{padding-left:16px !important;padding-right:16px !important}
      .h-title{font-size:22px !important}
      .h-sub{font-size:12px !important}
      .prop-label{width:140px !important}
    }
  </style>
</head>
<body class="bg-canvas" style="margin:0;padding:0">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
    New logo questionnaire submission
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" class="container">
    <tr>
      <td class="px py">
        <!-- Header -->
        <table role="presentation" width="100%">
          <tr>
            <td>
              <div class="h-title text">Logo Questionnaire — Submission Summary</div>
              <div class="h-sub muted" style="padding-top:6px">Rahajoe Creativa • Auto-generated summary</div>
            </td>
          </tr>
          <tr><td class="divider">&nbsp;</td></tr>
        </table>

        <!-- CONTACT INFORMATION -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Contact information</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row">
                  <td class="prop-label muted" valign="top">Name</td>
                  <td class="prop-val text" valign="top">${fallback(
                    `${data.firstName || ""} ${data.lastName || ""}`
                  )}</td>
                </tr>
                <tr class="prop-row">
                  <td class="prop-label muted" valign="top">Email</td>
                  <td class="prop-val text" valign="top">${fallback(
                    data.email
                  )}</td>
                </tr>
                <tr class="prop-row">
                  <td class="prop-label muted" valign="top">Budget</td>
                  <td class="prop-val text" valign="top">${fallbackBudget(
                    budgetDisplay
                  )}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- BRAND INFORMATION -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Brand information</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row"><td class="prop-label muted">Brand name</td><td class="prop-val text">${fallback(
                  data.brandName
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Slogan / Tagline</td><td class="prop-val text">${fallback(
                  data.slogan
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Reason behind name</td><td class="prop-val text">${fallback(
                  data.nameReason
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Business description</td><td class="prop-val text">${fallback(
                  data.businessDescription
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Brand values</td><td class="prop-val text">${fallback(
                  data.brandValues
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Target audience</td><td class="prop-val text">${fallback(
                  data.targetAudience
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Brand keywords</td><td class="prop-val text">${fallback(
                  data.brandKeywords
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Business goals</td><td class="prop-val text">${fallback(
                  data.businessGoals
                )}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- COMPETITION & DIFFERENTIATION -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Competition &amp; differentiation</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row">
                  <td class="prop-label muted">Competitors &amp; differences</td>
                  <td class="prop-val text">${fallback(data.competitors)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- DESIGN PREFERENCES -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Design preferences</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row"><td class="prop-label muted">Color preferences</td><td class="prop-val text">${fallback(
                  data.logoColorPreferences
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Message / emotion</td><td class="prop-val text">${fallback(
                  data.logoMessage
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Specific logo ideas</td><td class="prop-val text">${fallback(
                  data.logoIdea
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Design styles</td><td class="prop-val text">${fallback(
                  data.designStyles?.join(", ")
                )}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- ONLINE PRESENCE -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Online presence</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row"><td class="prop-label muted">Website / Social media</td><td class="prop-val text">${fallback(
                  data.websiteSocial
                )}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- ADDITIONAL REQUIREMENTS -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Additional requirements</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row"><td class="prop-label muted">Portfolio permission</td><td class="prop-val text">${fallback(
                  data.portfolioPermission
                )}</td></tr>
                <tr class="prop-row"><td class="prop-label muted">Additional identity design</td><td class="prop-val text">${fallback(
                  data.identityDesign?.join(", ")
                )}</td></tr>
                ${
                  data.identityOther
                    ? `<tr class="prop-row"><td class="prop-label muted">Other identity design</td><td class="prop-val text">${fallback(
                        data.identityOther
                      )}</td></tr>`
                    : ""
                }
              </table>
            </td>
          </tr>
        </table>

        <!-- OTHER COMMENTS -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td style="font-weight:700;font-size:18px;color:#2f3437;padding:8px 0 10px">Other comments</td></tr>
          <tr>
            <td>
              <table role="presentation" width="100%" class="border radius">
                <tr class="prop-row"><td class="prop-label muted">Notes</td><td class="prop-val text">${fallback(
                  data.otherComments
                )}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" class="section-gap">
          <tr><td class="divider">&nbsp;</td></tr>
          <tr>
            <td style="padding-top:12px;font-size:13px" class="muted">
              Submitted on: ${new Date().toLocaleString()}<br />
              This questionnaire was submitted through the Rahajoe Creativa website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// PLAIN TEXT VERSION OF THE QUESTIONNAIRE
export const questionnairePlainTextTemplate = (
  data: FormData,
  budgetOptions: Array<{ value: string; label: string }>
) => {
  // Handle budget label - budget is now a string, not an array
  const budgetOption = budgetOptions.find((opt) => opt.value === data.budget);
  const budgetDisplay = budgetOption?.label || data.budget;

  return `
NEW LOGO DESIGN QUESTIONNAIRE SUBMISSION
========================================

CONTACT INFORMATION:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Budget: ${budgetDisplay || "Not specified"}

BRAND INFORMATION:
Brand Name: ${data.brandName}
Slogan/Tagline: ${data.slogan || "None specified"}
Reason Behind Name: ${data.nameReason || "Not specified"}
Business Description: ${data.businessDescription}
Brand Values: ${data.brandValues}
Target Audience: ${data.targetAudience}
Brand Keywords: ${data.brandKeywords}
Business Goals: ${data.businessGoals}

COMPETITION & DIFFERENTIATION:
Competitors & Differences: ${data.competitors}

DESIGN PREFERENCES:
Color Preferences: ${data.logoColorPreferences}
Logo Message/Emotion: ${data.logoMessage}
Specific Logo Ideas: ${data.logoIdea || "None specified"}
Design Styles: ${
    data.designStyles && data.designStyles.length > 0
      ? data.designStyles.join(", ")
      : "None selected"
  }

ONLINE PRESENCE:
Website/Social Media: ${data.websiteSocial || "None specified"}

ADDITIONAL REQUIREMENTS:
Portfolio Permission: ${data.portfolioPermission}
Additional Identity Design: ${
    data.identityDesign && data.identityDesign.length > 0
      ? data.identityDesign.join(", ")
      : "None selected"
  }
${data.identityOther ? `Other Identity Design: ${data.identityOther}` : ""}

OTHER COMMENTS:
${data.otherComments || "None"}

========================================
Submitted on: ${new Date().toLocaleString()}
  `;
};

// CONFIRMATION EMAIL AFTER USER SEND A QUESTIONNAIRE FORM
export const questionnaireConfirmationEmailTemplate = (data: FormData) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Thank you — Rahajoe Creativa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no"
    />
    <style>
      body,
      table,
      td,
      div,
      p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Arial, sans-serif;
        color: #2f3437;
      }
      img {
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      table {
        border-collapse: collapse;
      }
      a {
        text-decoration: underline;
        color: #2f3437; /* neutral, no blue accent */
      }
      .bg-canvas {
        background: #f6f7f8;
      }
      .divider {
        border-top: 1px solid #e6e7e9;
        height: 1px;
        line-height: 1px;
      }
      .callout {
        background: #f3f4f6;
        border: 1px solid #e6e7e9;
        border-radius: 8px;
      }
      @media screen and (max-width: 620px) {
        .container {
          width: 100% !important;
        }
        .px {
          padding-left: 16px !important;
          padding-right: 16px !important;
          padding-top: 20px !important;
          padding-bottom: 8px !important;
        }
        .stack,
        .stack td {
          display: block !important;
          width: 100% !important;
        }
        .gap-12 {
          display: none !important;
        }
        .h-title {
          font-size: 22px !important;
          line-height: 1.25 !important;
        }
        .h-sub {
          font-size: 12px !important;
        }
      }
    </style>
  </head>
  <body class="bg-canvas" style="margin: 0; padding: 0">
    <div
      style="
        display: none;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      "
    >
      Thank you — Rahajoe Creativa
    </div>

    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      align="center"
      width="100%"
      class="container"
      style="max-width: 860px; background: #ffffff; margin: 0 auto"
    >
      <tr>
        <td class="px" style="padding: 32px 24px 12px 24px">
          <table role="presentation" width="100%">
            <tr>
              <td style="padding-bottom: 12px">
                <table
                  role="presentation"
                  class="stack"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td class="textcell" style="vertical-align: middle">
                      <div
                        class="h-title"
                        style="
                          font-weight: 700;
                          font-size: 32px;
                          line-height: 1.25;
                          letter-spacing: -0.2px;
                        "
                      >
                        Thank you
                      </div>
                      <div
                        class="h-sub"
                        style="
                          font-size: 14px;
                          line-height: 1.4;
                          color: #6b6f76;
                          padding-top: 6px;
                        "
                      >
                        Your submission has been received
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="divider">&nbsp;</td>
            </tr>
          </table>

          <table role="presentation" width="100%" style="margin-top: 22px">
            <tr>
              <td>
                <div
                  style="font-weight: 600; font-size: 18px; margin: 0 0 24px 0"
                >
                  Hi ${data.firstName || "there"},
                </div>

                <div
                  style="font-size: 16px; line-height: 1.65; margin: 0 0 32px 0"
                >
                  Thank you for taking the time to complete our logo design
                  questionnaire. We've received your submission and are excited
                  to learn more about your project.
                </div>

                <table
                  role="presentation"
                  width="100%"
                  class="callout"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td style="padding: 24px">
                      <div
                        style="
                          font-weight: 600;
                          font-size: 18px;
                          margin: 0 0 16px 0;
                        "
                      >
                        What happens next
                      </div>
                      <ul style="margin: 0; padding-left: 20px">
                        <li style="font-size: 15px; margin-bottom: 12px">
                          We'll review your responses within 24 hours
                        </li>
                        <li style="font-size: 15px; margin-bottom: 12px">
                          Our team will prepare a tailored proposal for your
                          project
                        </li>
                        <li style="font-size: 15px; margin-bottom: 12px">
                          We'll reach out to schedule a consultation call
                        </li>
                        <li style="font-size: 15px">
                          Together, we'll bring your vision to life
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  width="100%"
                  class="callout"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td style="padding: 20px">
                      <div
                        style="
                          font-weight: 600;
                          font-size: 16px;
                          margin: 0 0 12px 0;
                        "
                      >
                        Questions
                      </div>
                      <div style="font-size: 14px">
                        Feel free to reply to this email or reach out to us
                        anytime. We're here to help!
                      </div>
                    </td>
                  </tr>
                </table>

                <div style="font-size: 16px; line-height: 1.65; margin: 0">
                  We're looking forward to working with you!<br /><br />
                  Best regards,<br />
                  <strong>The Rahajoe Creativa Team</strong>
                </div>
              </td>
            </tr>
          </table>

          <table
            role="presentation"
            width="100%"
            style="margin-top: 28px; border-top: 1px solid #e6e7e9"
          >
            <tr>
              <td style="padding-top: 14px">
                <div
                  style="font-size: 13px; color: #6b6f76; text-align: center"
                >
                  This email was sent because you submitted a logo design
                  questionnaire on our website.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
