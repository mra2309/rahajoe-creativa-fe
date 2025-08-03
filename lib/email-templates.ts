import { FormData } from "@/components/form/questionnaire-form";

export const generateEmailTemplate = (
  data: FormData,
  budgetOptions: Array<{ value: string; label: string }>
) => {
  // Handle budget label - budget is now a string, not an array
  const budgetOption = budgetOptions.find((opt) => opt.value === data.budget);
  const budgetDisplay = budgetOption?.label || data.budget;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #FFC5EB; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .section { margin-bottom: 30px; }
    .section-title { background-color: #f5f5f5; padding: 10px; font-weight: bold; }
    .field { margin-bottom: 15px; }
    .field-label { font-weight: bold; color: #555; }
    .field-value { margin-left: 10px; }
    .footer { background-color: #f9f9f9; padding: 15px; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Logo Design Questionnaire Submission</h1>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">CONTACT INFORMATION</div>
      <div class="field">
        <span class="field-label">Name:</span>
        <span class="field-value">${data.firstName} ${data.lastName}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${data.email}</span>
      </div>
      <div class="field">
        <span class="field-label">Budget:</span>
        <span class="field-value">${budgetDisplay || "Not specified"}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">BRAND INFORMATION</div>
      <div class="field">
        <span class="field-label">Brand Name:</span>
        <span class="field-value">${data.brandName}</span>
      </div>
      <div class="field">
        <span class="field-label">Slogan/Tagline:</span>
        <span class="field-value">${data.slogan || "None specified"}</span>
      </div>
      <div class="field">
        <span class="field-label">Reason Behind Name:</span>
        <span class="field-value">${data.nameReason || "Not specified"}</span>
      </div>
      <div class="field">
        <span class="field-label">Business Description:</span>
        <span class="field-value">${data.businessDescription}</span>
      </div>
      <div class="field">
        <span class="field-label">Brand Values:</span>
        <span class="field-value">${data.brandValues}</span>
      </div>
      <div class="field">
        <span class="field-label">Target Audience:</span>
        <span class="field-value">${data.targetAudience}</span>
      </div>
      <div class="field">
        <span class="field-label">Brand Keywords:</span>
        <span class="field-value">${data.brandKeywords}</span>
      </div>
      <div class="field">
        <span class="field-label">Business Goals:</span>
        <span class="field-value">${data.businessGoals}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">COMPETITION & DIFFERENTIATION</div>
      <div class="field">
        <span class="field-label">Competitors & Differences:</span>
        <span class="field-value">${data.competitors}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">DESIGN PREFERENCES</div>
      <div class="field">
        <span class="field-label">Color Preferences:</span>
        <span class="field-value">${data.logoColorPreferences}</span>
      </div>
      <div class="field">
        <span class="field-label">Logo Message/Emotion:</span>
        <span class="field-value">${data.logoMessage}</span>
      </div>
      <div class="field">
        <span class="field-label">Specific Logo Ideas:</span>
        <span class="field-value">${data.logoIdea || "None specified"}</span>
      </div>
      <div class="field">
        <span class="field-label">Design Styles:</span>
        <span class="field-value">${
          data.designStyles && data.designStyles.length > 0
            ? data.designStyles.join(", ")
            : "None selected"
        }</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">ONLINE PRESENCE</div>
      <div class="field">
        <span class="field-label">Website/Social Media:</span>
        <span class="field-value">${
          data.websiteSocial || "None specified"
        }</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">ADDITIONAL REQUIREMENTS</div>
      <div class="field">
        <span class="field-label">Portfolio Permission:</span>
        <span class="field-value">${data.portfolioPermission}</span>
      </div>
      <div class="field">
        <span class="field-label">Additional Identity Design:</span>
        <span class="field-value">${
          data.identityDesign && data.identityDesign.length > 0
            ? data.identityDesign.join(", ")
            : "None selected"
        }</span>
      </div>
      ${
        data.identityOther
          ? `
      <div class="field">
        <span class="field-label">Other Identity Design:</span>
        <span class="field-value">${data.identityOther}</span>
      </div>
      `
          : ""
      }
    </div>

    <div class="section">
      <div class="section-title">OTHER COMMENTS</div>
      <div class="field">
        <span class="field-value">${data.otherComments || "None"}</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Submitted on: ${new Date().toLocaleString()}</p>
    <p>This questionnaire was submitted through the Rahajoe Creativa website.</p>
  </div>
</body>
</html>
  `;
};

export const generatePlainTextTemplate = (
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
