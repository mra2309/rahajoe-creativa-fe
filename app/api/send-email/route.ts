import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailConfig } from "@/lib/email-service";
import {
  questionnaireConfirmationEmailTemplate,
  questionnaireEmailTemplate,
  questionnairePlainTextTemplate,
} from "@/lib/email-template/quessinonaire-mail";
import {
  messageConfirmationEmailTemplate,
  messageContactEmailTemplate,
  messageContactPlainTextTemplate,
} from "@/lib/email-template/message-mail";

// Budget options untuk mapping
const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2500", label: "$1,000 - $2,500" },
  { value: "2500-5000", label: "$2,500 - $5,000" },
  { value: "over-5000", label: "Over $5,000" },
  { value: "discuss", label: "Let's discuss" },
];

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing required fields: type and data" },
        { status: 400 }
      );
    }

    switch (type) {
      case "questionnaire": {
        // Send notification email to admin
        const htmlContent = questionnaireEmailTemplate(data, budgetOptions);
        const textContent = questionnairePlainTextTemplate(data, budgetOptions);

        // Send notification email to admin with replyTo
        const adminEmailData = {
          to: emailConfig.smtp.toEmail!,
          from: `"${data.firstName} ${data.lastName}" <${emailConfig.smtp
            .fromEmail!}>`,
          replyTo: data.email, // Reply akan diarahkan ke email client
          subject: `New Logo Design Request from ${data.firstName} ${data.lastName}`,
          html: htmlContent,
          text: textContent,
        };

        await sendEmail(adminEmailData);

        // Send confirmation email to client
        const confirmationHtml = questionnaireConfirmationEmailTemplate(data);
        const confirmationText = questionnairePlainTextTemplate(
          data,
          budgetOptions
        );

        const clientEmailData = {
          to: data.email,
          from: emailConfig.smtp.fromEmail!,
          subject: "Thank you for your logo design request - Rahajoe Creativa",
          html: confirmationHtml,
          text: confirmationText,
        };

        await sendEmail(clientEmailData);

        return NextResponse.json({
          success: true,
          message: "Questionnaire emails sent successfully",
        });
      }

      case "contact": {
        // Send notification email to admin
        const htmlContent = messageContactEmailTemplate(
          data as ContactFormData
        );
        const textContent = messageContactEmailTemplate(
          data as ContactFormData
        );

        const adminEmailData = {
          to: emailConfig.smtp.toEmail!,
          from: `"${data.name}" <${emailConfig.smtp.fromEmail!}>`, // Display name dari form, tapi FROM tetap menggunakan akun SMTP
          replyTo: data.email, // Reply akan diarahkan ke email user
          subject: `New Contact Message from ${data.name}`,
          html: htmlContent,
          text: textContent,
        };

        await sendEmail(adminEmailData);

        // Send confirmation email to user
        const confirmationHtml = messageConfirmationEmailTemplate(
          data as ContactFormData
        );
        const confirmationText = messageContactPlainTextTemplate(
          data as ContactFormData
        );

        const userEmailData = {
          to: data.email,
          from: emailConfig.smtp.fromEmail!,
          subject: "We've received your message - Rahajoe Creativa",
          html: confirmationHtml,
          text: confirmationText,
        };

        await sendEmail(userEmailData);

        return NextResponse.json({
          success: true,
          message: "Contact emails sent successfully",
        });
      }

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
