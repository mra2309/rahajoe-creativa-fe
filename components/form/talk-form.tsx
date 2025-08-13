"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { PopupNotification } from "@/components/popup-notification";
import { useCreateContact } from "@/hooks/use-create-contact";
import { ContactFormData } from "@/types/contact";
import { sendContactEmail } from "@/lib/email-sender";

const talkFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(2, "Message must be at least 2 characters"),
});

export function TalkForm() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const createContactMutation = useCreateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(talkFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Filter out empty values
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value && value.trim() !== "")
      ) as ContactFormData;

      await createContactMutation.mutateAsync(filteredData);

      // Send email notification after successful contact creation
      try {
        await sendContactEmail({
          name: filteredData.name,
          email: filteredData.email,
          message: filteredData.message,
        });
      } catch (emailError) {
        console.error("Error sending contact email:", emailError);
      }

      // Show success popup and reset form
      setShowSuccessPopup(true);
      reset();
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      // Error handling is already done in the mutation hook
    }
  };

  return (
    <form
      className="mt-7 md:my-10 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="border-b-[1px] border-zinc-200">
          <input
            type="text"
            {...register("name")}
            className="border-none text-sm md:text-base placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none p-3 rounded-lg w-full"
            placeholder="Your Name"
            disabled={isSubmitting}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs md:text-sm mt-2">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <div className="border-b-[1px] border-zinc-200">
          <input
            type="email"
            {...register("email")}
            className="border-none text-sm md:text-base placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none p-3 rounded-lg w-full"
            placeholder="Your Email"
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs md:text-sm mt-2">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <div className="border-b-[1px] border-zinc-200">
          <input
            type="text"
            {...register("message")}
            className="border-none text-sm md:text-base placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none p-3 rounded-lg w-full"
            placeholder="Message"
            disabled={isSubmitting}
          />
        </div>
        {errors.message && (
          <p className="text-red-500 text-xs md:text-sm mt-2">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <PopupNotification onClose={() => setShowSuccessPopup(false)} />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#FFC5EB] cursor-pointer py-3 px-14 mt-3 max-w-max text-sm md:text-3xl rounded-[14px] md:rounded-[20px] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isSubmitting ? "SENDING..." : "SUBMIT"}
      </button>
    </form>
  );
}
