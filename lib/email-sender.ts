// Client-side email functions that call API routes
// These functions are safe to use in React components

import { FormData } from "@/components/form/questionnaire-form";

export const sendQuestionnaireEmail = async (formData: FormData) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "questionnaire",
        data: formData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error("Error sending questionnaire email:", error);
    throw error;
  }
};

export const sendConfirmationEmail = async () => {
  // Confirmation email is sent automatically by the API
  // when questionnaire email is sent
  return { success: true };
};

export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact",
        data: contactData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};
