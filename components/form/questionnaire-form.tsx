"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PopupNotification } from "../popup-notification";
import { useCreateOrder } from "@/hooks/use-create-order";
import { FileUpload } from "../file-upload";
import {
  sendQuestionnaireEmail,
  sendConfirmationEmail,
} from "@/lib/email-sender";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Zod Schema for form validation
const questionnaireSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .refine((val) => val.trim() !== "", "First name cannot be empty"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .refine((val) => val.trim() !== "", "Last name cannot be empty"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((val) => val.trim() !== "", "Email cannot be empty"),
  budget: z
    .string()
    .min(1, "Please select a budget")
    .refine((val) => val.trim() !== "", "Budget selection is required"),
  brandName: z
    .string()
    .min(1, "Brand name is required")
    .refine((val) => val.trim() !== "", "Brand name cannot be empty"),
  slogan: z.string().optional(),
  nameReason: z.string().optional(),
  businessDescription: z
    .string()
    .min(1, "Business description is required")
    .refine((val) => val.trim() !== "", "Business description cannot be empty"),
  brandValues: z.string().optional(),
  targetAudience: z.string().optional(),
  brandKeywords: z.string().optional(),
  businessGoals: z.string().optional(),
  competitors: z.string().optional(),
  logoColorPreferences: z.string().optional(),
  logoMessage: z.string().optional(),
  logoIdea: z.string().optional(),
  logoExamples: z.array(z.string()).optional(), // Array of URLs from UploadThing
  designStyles: z.array(z.string()).optional(),
  websiteSocial: z.string().optional(),
  otherComments: z.string().optional(),
  portfolioPermission: z
    .string()
    .min(1, "Please select an option")
    .refine((val) => val.trim() !== "", "Portfolio permission is required"),
  identityDesign: z.array(z.string()).optional(),
  identityOther: z.string().optional(),
});

type FormData = z.infer<typeof questionnaireSchema>;

// Export the type for use in other files
export type { FormData };

export function QuestionnaireForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      budget: "",
      brandName: "",
      slogan: "",
      nameReason: "",
      businessDescription: "",
      brandValues: "",
      targetAudience: "",
      brandKeywords: "",
      businessGoals: "",
      competitors: "",
      logoColorPreferences: "",
      logoMessage: "",
      logoIdea: "",
      logoExamples: [],
      designStyles: [],
      websiteSocial: "",
      otherComments: "",
      portfolioPermission: "",
      identityDesign: [],
      identityOther: "",
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = form;

  // Watch fields for conditional rendering
  const watchBudget = watch("budget");
  const watchDesignStyles = watch("designStyles", []);
  const watchIdentityDesign = watch("identityDesign", []);
  const watchPortfolioPermission = watch("portfolioPermission");
  const watchLogoExamples = watch("logoExamples");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Use the custom order creation hook
  const createOrderMutation = useCreateOrder();

  const budgetOptions = [
    { id: "budget-399", value: "399", label: "$399" },
    { id: "budget-599", value: "599", label: "Up to $599" },
    { id: "budget-799", value: "799", label: "Up to $799" },
    { id: "budget-999", value: "999", label: "Up to $999" },
    { id: "budget-1299", value: "1299", label: "Up to $1299" },
    { id: "budget-others", value: "others", label: "Others" },
  ];

  // Handle file upload from UploadThing
  const handleFilesUploaded = (
    uploadedFiles: Array<{ url: string; name: string; key: string }>
  ) => {
    const currentFiles = watch("logoExamples") || [];
    const newUrls = uploadedFiles.map((file) => file.url);
    const combinedUrls = [...currentFiles, ...newUrls];
    setValue("logoExamples", combinedUrls);
  };

  // Handle file deletion
  const handleFileDeleted = (fileUrl: string) => {
    const currentFiles = watch("logoExamples") || [];
    const updatedFiles = currentFiles.filter((url) => url !== fileUrl);
    setValue("logoExamples", updatedFiles.length > 0 ? updatedFiles : []);
  };

  // Convert URLs to UploadedFile format for the component
  const convertUrlsToUploadedFiles = (urls: string[]) => {
    return urls.map((url, index) => ({
      url,
      name: `Logo example ${index + 1}`,
      key: url.split("/").pop() || `file-${index}`,
    }));
  };

  const handleBudgetChange = (value: string) => {
    setValue("budget", value);
    setIsDropdownOpen(false);
  };

  const handleStyleChange = (value: string) => {
    const currentStyles = watchDesignStyles || [];
    const newStyles = currentStyles.includes(value)
      ? currentStyles.filter((item) => item !== value)
      : [...currentStyles, value];

    setValue("designStyles", newStyles);
  };

  const handlePortfolioPermissionChange = (value: string) => {
    setValue("portfolioPermission", value);
  };

  const handleIdentityDesignChange = (value: string) => {
    const currentIdentityDesign = watchIdentityDesign || [];
    const newIdentityDesign = currentIdentityDesign.includes(value)
      ? currentIdentityDesign.filter((item) => item !== value)
      : [...currentIdentityDesign, value];

    setValue("identityDesign", newIdentityDesign);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Additional validation to prevent sending empty or null values
      const cleanedData = {
        ...data,
        // Remove empty strings and null values from optional fields
        slogan: data.slogan?.trim() || undefined,
        nameReason: data.nameReason?.trim() || undefined,
        brandValues: data.brandValues?.trim() || undefined,
        targetAudience: data.targetAudience?.trim() || undefined,
        brandKeywords: data.brandKeywords?.trim() || undefined,
        businessGoals: data.businessGoals?.trim() || undefined,
        competitors: data.competitors?.trim() || undefined,
        logoColorPreferences: data.logoColorPreferences?.trim() || undefined,
        logoMessage: data.logoMessage?.trim() || undefined,
        logoIdea: data.logoIdea?.trim() || undefined,
        websiteSocial: data.websiteSocial?.trim() || undefined,
        otherComments: data.otherComments?.trim() || undefined,
        identityOther: data.identityOther?.trim() || undefined,
        // Handle arrays - remove empty arrays
        designStyles:
          data.designStyles && data.designStyles.length > 0
            ? data.designStyles
            : undefined,
        identityDesign:
          data.identityDesign && data.identityDesign.length > 0
            ? data.identityDesign
            : undefined,
        // Handle file uploads - remove null/empty values
        logoExamples:
          data.logoExamples && data.logoExamples.length > 0
            ? data.logoExamples
            : undefined,
      };

      // Final validation check for required fields
      const requiredFields: { field: string; value: string | undefined }[] = [
        { field: "firstName", value: cleanedData.firstName },
        { field: "lastName", value: cleanedData.lastName },
        { field: "email", value: cleanedData.email },
        { field: "budget", value: cleanedData.budget },
        { field: "brandName", value: cleanedData.brandName },
        {
          field: "businessDescription",
          value: cleanedData.businessDescription,
        },
        {
          field: "portfolioPermission",
          value: cleanedData.portfolioPermission,
        },
      ];

      // Validate required fields
      const emptyRequiredFields = requiredFields.filter(
        ({ value }) =>
          !value || (typeof value === "string" && value.trim() === "")
      );

      if (emptyRequiredFields.length > 0) {
        console.error(
          "The following required fields are empty:",
          emptyRequiredFields.map((f) => f.field)
        );
        alert("Please fill in all required fields before submitting.");
        return;
      }

      // Transform data for API
      const orderData = {
        ...cleanedData,
        portfolioPermission: cleanedData.portfolioPermission as "yes" | "no",
      };

      await createOrderMutation.mutateAsync(orderData);

      // Send emails after successful order creation
      try {
        // Send notification email to admin/owner
        await sendQuestionnaireEmail(cleanedData);
        console.log("Admin notification email sent successfully");

        // Send confirmation email to client (automatic with questionnaire email)
        await sendConfirmationEmail();
        console.log("Client confirmation email sent successfully");
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Don't block the success flow if email fails
        // The order was already created successfully
      }

      // Show success popup and reset form
      setShowSuccessPopup(true);
      reset();

      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit order:", error);
      // Error handling is already done in the mutation hook
    }
  };

  const getDisplayText = () => {
    if (!watchBudget) return "Choose your budget";
    const selectedOption = budgetOptions.find(
      (opt) => opt.value === watchBudget
    );
    if (selectedOption) {
      return selectedOption.label;
    }
    // If budget is not in predefined options and not just "others", it's a custom value
    if (watchBudget !== "others") {
      return watchBudget;
    }
    return "Others";
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8"
      >
        <div className="md:w-[80%]">
          <label className="font-bold text-sm md:text-base" htmlFor="name">
            Name
          </label>
          <div className="flex items-center justify-between w-full space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <textarea
                      placeholder="First Name"
                      id="firstName"
                      className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base resize-none overflow-hidden min-h-[40px]"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height =
                          Math.max(40, target.scrollHeight) + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                  <span className="absolute text-red-500 right-2 top-3">*</span>
                  <FormMessage className="text-red-500 text-xs md:text-sm font-medium mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <textarea
                      placeholder="Last Name"
                      id="lastName"
                      className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base resize-none overflow-hidden min-h-[40px]"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height =
                          Math.max(40, target.scrollHeight) + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                  <span className="absolute text-red-500 right-2 top-3">*</span>
                  <FormMessage className="text-red-500 text-xs md:text-sm font-medium mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="md:w-[80%]">
          <label className="font-bold text-sm md:text-base" htmlFor="email">
            Email
          </label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <textarea
                    placeholder="i.e john@gmail.com"
                    id="email"
                    className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base resize-none overflow-hidden min-h-[40px]"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height =
                        Math.max(40, target.scrollHeight) + "px";
                    }}
                    {...field}
                  />
                </FormControl>
                <span className="absolute text-red-500 right-2 top-3">*</span>
                <FormMessage className="text-red-500 text-xs md:text-sm font-medium mt-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="md:w-[40%]">
          <label className="font-bold text-sm md:text-base">
            Approximately what budget do you have?{" "}
            <span className="text-red-500">*</span>
          </label>
          <FormField
            control={form.control}
            name="budget"
            render={() => (
              <FormItem>
                <div className="mt-4 relative">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border text-sm md:text-base border-gray-300 rounded-md py-2 px-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsDropdownOpen(!isDropdownOpen);
                      }
                    }}
                  >
                    <span
                      className={
                        watchBudget ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {getDisplayText()}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ml-2 flex-shrink-0 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border text-sm md:text-base border-gray-300 rounded-md shadow-lg">
                      <div className="py-1 max-h-60 overflow-auto">
                        {budgetOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleBudgetChange(option.value)}
                          >
                            <div className="relative">
                              <input
                                type="radio"
                                id={option.id}
                                name="budget"
                                value={option.value}
                                checked={watchBudget === option.value}
                                onChange={() =>
                                  handleBudgetChange(option.value)
                                }
                                className="sr-only"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div
                                className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                                  watchBudget === option.value
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-300 bg-white hover:border-blue-400"
                                }`}
                              >
                                {watchBudget === option.value && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <label
                              htmlFor={option.id}
                              className="ml-3 text-gray-700 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Manual input for "Others" option */}
                {(watchBudget === "others" ||
                  (watchBudget &&
                    !budgetOptions.find(
                      (opt) => opt.value === watchBudget
                    ))) && (
                  <div className="mt-4">
                    <label className="font-medium text-sm md:text-base text-gray-700">
                      Please specify your budget:
                    </label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        placeholder="Enter your budget amount"
                        value={watchBudget === "others" ? "" : watchBudget}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          setValue("budget", value || "others");
                        }}
                        className="w-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4 text-sm md:text-base"
                      />
                    </div>
                  </div>
                )}

                <FormMessage className="text-red-500 text-xs md:text-sm font-medium mt-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="brandName" className="font-bold text-sm md:text-base">
            What is your name of your brand?{" "}
            <span className="text-red-500">*</span>
          </label>
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      id="brandName"
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="slogan" className="font-bold text-sm md:text-base">
            Please state if you would like to incorporate a slogan/tagline
          </label>
          <FormField
            control={form.control}
            name="slogan"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      id="slogan"
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Is there a unique reason behind the name?
          </label>
          <FormField
            control={form.control}
            name="nameReason"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Please describe a little about your business.{" "}
            <span className="text-red-500">*</span>
          </label>
          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            What are the main values of your brand?
          </label>
          <FormField
            control={form.control}
            name="brandValues"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            What is your target audience?
          </label>
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Please state some keywords or a sentence that defines your brand.
          </label>
          <FormField
            control={form.control}
            name="brandKeywords"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            What are your business goals?
          </label>
          <FormField
            control={form.control}
            name="businessGoals"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Who are your main competitors and how do you differ from them?
          </label>
          <FormField
            control={form.control}
            name="competitors"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Do you have a certain range of colors for the logo? Are there any
            colors that you do not want to use?
          </label>
          <FormField
            control={form.control}
            name="logoColorPreferences"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            What message or emotion do you want your logo to portray?
          </label>
          <FormField
            control={form.control}
            name="logoMessage"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Do you have a specific idea in mind for your logo?
          </label>
          <FormField
            control={form.control}
            name="logoIdea"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Would you tell me some examples of logos you like?
          </label>
          <span className="text-sm md:text-base text-gray-400">
            Upload a maximum of 10 files supported—Max 8MB per file.
          </span>
          <FileUpload
            onFilesUploaded={handleFilesUploaded}
            onFileDeleted={handleFileDeleted}
            maxFiles={10}
            currentFiles={convertUrlsToUploadedFiles(watchLogoExamples || [])}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-10 border-gray-300 rounded-md">
          <label className="font-bold text-sm md:text-base">
            Please choose the style that you like.
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            {[
              "classic",
              "modern",
              "mature",
              "youthful",
              "feminine",
              "masculine",
              "playful",
              "sophisticated",
              "economical",
              "luxurious",
              "geometric",
              "organic",
              "abstract",
              "literal",
            ].map((style) => (
              <div
                key={style}
                className="flex items-center space-x-4 text-sm md:text-base"
              >
                <Checkbox
                  id={style}
                  checked={(watchDesignStyles || []).includes(style)}
                  onCheckedChange={() => handleStyleChange(style)}
                />
                <label htmlFor={style} className="capitalize">
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Do you have a website or social media channel?
          </label>
          <FormField
            control={form.control}
            name="websiteSocial"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
          <label htmlFor="" className="font-bold text-sm md:text-base">
            Any other comments?
          </label>
          <FormField
            control={form.control}
            name="otherComments"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-10 border-gray-300 rounded-md">
          <label className="font-bold text-sm md:text-base">
            Would you allow us to display the final result as our portfolio?
            <span className="text-red-500">*</span>
          </label>
          <FormField
            control={form.control}
            name="portfolioPermission"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                  <div className="flex items-center space-x-4 text-sm md:text-base">
                    <Checkbox
                      id="yes"
                      checked={watchPortfolioPermission === "yes"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handlePortfolioPermissionChange("yes");
                        } else if (watchPortfolioPermission === "yes") {
                          handlePortfolioPermissionChange("");
                        }
                      }}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-4 text-sm md:text-base">
                    <Checkbox
                      id="no"
                      checked={watchPortfolioPermission === "no"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handlePortfolioPermissionChange("no");
                        } else if (watchPortfolioPermission === "no") {
                          handlePortfolioPermissionChange("");
                        }
                      }}
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
                <FormMessage className="text-red-500 text-xs md:text-sm font-medium mt-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-10 border-gray-300 rounded-md">
          <label className="font-bold text-sm md:text-base">
            Do you need an additional identity design?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            {[
              { value: "business-card", label: "Business Card" },
              { value: "letterhead", label: "Letterhead" },
              { value: "envelope", label: "Envelope" },
              { value: "brand-guidelines", label: "Brand Guidelines" },
              { value: "app-icon", label: "App Icon" },
              {
                value: "social-media-cover",
                label: "Social Media Cover/Banner",
              },
              { value: "packaging-product", label: "Packaging/Product Label" },
              { value: "banner", label: "Banner/Signage" },
              { value: "others", label: "Others :" },
            ].map((item) => (
              <div
                key={item.value}
                className="flex items-center space-x-4 text-sm md:text-base"
              >
                <Checkbox
                  id={item.value}
                  checked={(watchIdentityDesign || []).includes(item.value)}
                  onCheckedChange={() => handleIdentityDesignChange(item.value)}
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            ))}
          </div>
          <FormField
            control={form.control}
            name="identityOther"
            render={({ field }) => (
              <FormItem>
                <div className="border-b-[1px] pb-2 border-zinc-200">
                  <FormControl>
                    <textarea
                      className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base resize-none overflow-hidden min-h-[24px]"
                      placeholder="Your Answer"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Success Popup Modal */}
        {showSuccessPopup && (
          <PopupNotification onClose={() => setShowSuccessPopup(false)} />
        )}

        <div className="flex justify-end mt-10 md:mt-20">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FFC5EB] cursor-pointer py-3 w-full text-xl md:text-2xl rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </Form>
  );
}
