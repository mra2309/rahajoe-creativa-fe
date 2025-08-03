"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { PopupNotification } from "../popup-notification";
import { useCreateOrder } from "@/hooks/use-create-order";

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
  logoExamples: z.any().optional(), // File array handling
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
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
      logoExamples: null,
      designStyles: [],
      websiteSocial: "",
      otherComments: "",
      portfolioPermission: "",
      identityDesign: [],
      identityOther: "",
    },
  });

  // Watch fields for conditional rendering
  const watchBudget = watch("budget");
  const watchDesignStyles = watch("designStyles", []);
  const watchIdentityDesign = watch("identityDesign", []);
  const watchPortfolioPermission = watch("portfolioPermission");
  const watchLogoExamples = watch("logoExamples");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
      const maxFiles = 10;

      // Filter files by size and limit count
      const validFiles = fileArray
        .filter((file) => {
          if (file.size > maxFileSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return false;
          }
          return true;
        })
        .slice(0, maxFiles);

      if (
        validFiles.length !== fileArray.length &&
        fileArray.length > maxFiles
      ) {
        alert(`You can only upload up to ${maxFiles} files.`);
      }

      // Combine with existing files if any
      const currentFiles = watch("logoExamples") || [];
      const combinedFiles = [...currentFiles, ...validFiles].slice(0, maxFiles);

      // Update React Hook Form
      setValue("logoExamples", combinedFiles.length > 0 ? combinedFiles : null);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const currentFiles = watch("logoExamples") || [];
    const newFiles = currentFiles.filter(
      (_: File, index: number) => index !== indexToRemove
    );

    // Clear the file input if no files remain
    if (newFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Update React Hook Form
    setValue("logoExamples", newFiles.length > 0 ? newFiles : null);
  };
  // Cleanup object URLs when component unmounts or files change
  useEffect(() => {
    const logoFiles = watch("logoExamples");
    return () => {
      if (logoFiles) {
        logoFiles.forEach((file: File) => {
          URL.revokeObjectURL(URL.createObjectURL(file));
        });
      }
    };
  }, [watch]);

  const cleanupFiles = () => {
    const logoFiles = watch("logoExamples");
    if (logoFiles) {
      logoFiles.forEach((file: File) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    }
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

      // Show success popup and cleanup/reset form
      setShowSuccessPopup(true);
      cleanupFiles();
      reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-8">
      <div className="md:w-[80%]">
        <label className="font-bold text-sm md:text-base" htmlFor="name">
          Name
        </label>
        <div className="flex items-center justify-between w-full space-x-2">
          <div className="relative">
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              {...register("firstName")}
              className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base"
            />
            <span className="absolute text-red-500 right-2 top-3">*</span>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              placeholder="Last Name"
              type="text"
              id="lastName"
              {...register("lastName")}
              className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base"
            />
            <span className="absolute text-red-500 right-2 top-3">*</span>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="md:w-[80%]">
        <label className="font-bold text-sm md:text-base" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <input
            placeholder="i.e john@gmail.com"
            type="email"
            id="email"
            {...register("email")}
            className="w-full border bg-white border-zinc-300 focus:outline-none rounded-md py-2 px-4 mt-2 text-sm md:text-base"
          />
          <span className="absolute text-red-500 right-2 top-3">*</span>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}
        </div>
      </div>
      <div className="md:w-[40%]">
        <label className="font-bold text-sm md:text-base">
          Approximately what budget do you have?{" "}
          <span className="text-red-500">*</span>
        </label>
        {/* Hidden required input for budget validation */}
        <input
          type="text"
          value={watchBudget}
          onChange={() => {}}
          required
          style={{ display: "none" }}
          tabIndex={-1}
        />
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
            <span className={watchBudget ? "text-gray-900" : "text-gray-500"}>
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
                        onChange={() => handleBudgetChange(option.value)}
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
            !budgetOptions.find((opt) => opt.value === watchBudget))) && (
          <div className="mt-4">
            <label className="font-medium text-sm md:text-base text-gray-700">
              Please specify your budget:
            </label>
            <div className="mt-2">
              <input
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

        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
        )}
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="brandName" className="font-bold text-sm md:text-base">
          What is your name of your brand?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            id="brandName"
            {...register("brandName")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
        {errors.brandName && (
          <p className="text-red-500 text-xs">{errors.brandName.message}</p>
        )}
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="slogan" className="font-bold text-sm md:text-base">
          Please state if you would like to incorporate a slogan/tagline
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            id="slogan"
            {...register("slogan")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Is there a unique reason behind the name?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("nameReason")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Please describe a little about your business.{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("businessDescription")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
        {errors.businessDescription && (
          <p className="text-red-500 text-xs">
            {errors.businessDescription.message}
          </p>
        )}
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          What are the main values of your brand?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("brandValues")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          What is your target audience?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("targetAudience")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Please state some keywords or a sentence that defines your brand.
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("brandKeywords")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          What are your business goals?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("businessGoals")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Who are your main competitors and how do you differ from them?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("competitors")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Do you have a certain range of colors for the logo? Are there any
          colors that you do not want to use?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("logoColorPreferences")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          What message or emotion do you want your logo to portray?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("logoMessage")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Do you have a specific idea in mind for your logo?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("logoIdea")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Would you tell me some examples of logos you like?
        </label>
        <span className="text-sm md:text-base text-gray-400">
          Upload a maximum of 10 files supported—Max 10MB per file.
          {watchLogoExamples && watchLogoExamples.length > 0 && (
            <span className="text-blue-600 font-medium ml-2">
              ({watchLogoExamples.length}/10 files uploaded)
            </span>
          )}
        </span>
        <div className="">
          <input
            ref={fileInputRef}
            type="file"
            id="logoExamples"
            name="logoExamples"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
          />
        </div>

        {/* Image Preview Section */}
        {watchLogoExamples && watchLogoExamples.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm md:text-base mb-3">
              Uploaded Images:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchLogoExamples.map((file: File, index: number) => (
                <div key={index} className="relative group">
                  <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Logo example ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                  <p
                    className="text-xs text-gray-600 mt-1 truncate"
                    title={file.name}
                  >
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-10 border-gray-300 rounded-md">
        <label className="font-bold text-sm md:text-base">
          Please choose the style that you like.
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="classic"
              name="designStyles"
              value="classic"
              checked={(watchDesignStyles || []).includes("classic")}
              onChange={() => handleStyleChange("classic")}
              className=""
            />
            <label htmlFor="classic">Classic</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="modern"
              name="designStyles"
              value="modern"
              checked={(watchDesignStyles || []).includes("modern")}
              onChange={() => handleStyleChange("modern")}
              className=""
            />
            <label htmlFor="modern">Modern</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="mature"
              name="designStyles"
              value="mature"
              checked={(watchDesignStyles || []).includes("mature")}
              onChange={() => handleStyleChange("mature")}
              className=""
            />
            <label htmlFor="mature">Mature</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="youthful"
              name="designStyles"
              value="youthful"
              checked={(watchDesignStyles || []).includes("youthful")}
              onChange={() => handleStyleChange("youthful")}
              className=""
            />
            <label htmlFor="youthful">Youthful</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="feminine"
              name="designStyles"
              value="feminine"
              checked={(watchDesignStyles || []).includes("feminine")}
              onChange={() => handleStyleChange("feminine")}
              className=""
            />
            <label htmlFor="feminine">Feminine</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="masculine"
              name="designStyles"
              value="masculine"
              checked={(watchDesignStyles || []).includes("masculine")}
              onChange={() => handleStyleChange("masculine")}
              className=""
            />
            <label htmlFor="masculine">Masculine</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="playful"
              name="designStyles"
              value="playful"
              checked={(watchDesignStyles || []).includes("playful")}
              onChange={() => handleStyleChange("playful")}
              className=""
            />
            <label htmlFor="playful">Playful</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="sophisticated"
              name="designStyles"
              value="sophisticated"
              checked={(watchDesignStyles || []).includes("sophisticated")}
              onChange={() => handleStyleChange("sophisticated")}
              className=""
            />
            <label htmlFor="sophisticated">Sophisticated</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="economical"
              name="designStyles"
              value="economical"
              checked={(watchDesignStyles || []).includes("economical")}
              onChange={() => handleStyleChange("economical")}
              className=""
            />
            <label htmlFor="economical">Economical</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="luxurious"
              name="designStyles"
              value="luxurious"
              checked={(watchDesignStyles || []).includes("luxurious")}
              onChange={() => handleStyleChange("luxurious")}
              className=""
            />
            <label htmlFor="luxurious">Luxurious</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="geometric"
              name="designStyles"
              value="geometric"
              checked={(watchDesignStyles || []).includes("geometric")}
              onChange={() => handleStyleChange("geometric")}
              className=""
            />
            <label htmlFor="geometric">Geometric</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="organic"
              name="designStyles"
              value="organic"
              checked={(watchDesignStyles || []).includes("organic")}
              onChange={() => handleStyleChange("organic")}
              className=""
            />
            <label htmlFor="organic">Organic</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="abstract"
              name="designStyles"
              value="abstract"
              checked={(watchDesignStyles || []).includes("abstract")}
              onChange={() => handleStyleChange("abstract")}
              className=""
            />
            <label htmlFor="abstract">Abstract</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="literal"
              name="designStyles"
              value="literal"
              checked={(watchDesignStyles || []).includes("literal")}
              onChange={() => handleStyleChange("literal")}
              className=""
            />
            <label htmlFor="literal">Literal</label>
          </div>
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Do you have a website or social media channel?
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("websiteSocial")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-4 border-gray-300 rounded-md">
        <label htmlFor="" className="font-bold text-sm md:text-base">
          Any other comments? 
        </label>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("otherComments")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      <div className="bg-white border-[1px] p-6 md:-8 flex flex-col gap-10 border-gray-300 rounded-md">
        <label className="font-bold text-sm md:text-base">
          Would you allow us to display the final result as our portfolio?
          <span className="text-red-500">*</span>
        </label>
        {/* Hidden required input for validation */}
        <input
          type="text"
          {...register("portfolioPermission")}
          onChange={() => {}}
          required
          style={{ display: "none" }}
          tabIndex={-1}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="yes"
              name="portfolioPermission"
              value="yes"
              checked={watchPortfolioPermission === "yes"}
              onChange={(e) => {
                if (e.target.checked) {
                  handlePortfolioPermissionChange("yes");
                } else if (watchPortfolioPermission === "yes") {
                  handlePortfolioPermissionChange("");
                }
              }}
              className=""
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="no"
              name="portfolioPermission"
              value="no"
              checked={watchPortfolioPermission === "no"}
              onChange={(e) => {
                if (e.target.checked) {
                  handlePortfolioPermissionChange("no");
                } else if (watchPortfolioPermission === "no") {
                  handlePortfolioPermissionChange("");
                }
              }}
              className=""
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        {errors.portfolioPermission && (
          <p className="text-red-500 text-xs mt-1">
            {errors.portfolioPermission.message}
          </p>
        )}
      </div>
      <div className="bg-white border-[1px] p-6 md:p-8 flex flex-col gap-10 border-gray-300 rounded-md">
        <label className="font-bold text-sm md:text-base">
          Do you need an additional identity design?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="bussiness-card"
              name="identityDesign"
              value="business-card"
              checked={(watchIdentityDesign || []).includes("business-card")}
              onChange={() => handleIdentityDesignChange("business-card")}
              className=""
            />
            <label htmlFor="bussiness-card">Bussiness Card</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="letterhead"
              name="identityDesign"
              value="letterhead"
              checked={(watchIdentityDesign || []).includes("letterhead")}
              onChange={() => handleIdentityDesignChange("letterhead")}
              className=""
            />
            <label htmlFor="letterhead">Letterhead</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="envelope"
              name="identityDesign"
              value="envelope"
              checked={(watchIdentityDesign || []).includes("envelope")}
              onChange={() => handleIdentityDesignChange("envelope")}
              className=""
            />
            <label htmlFor="envelope">Envelope</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="brand-guidelines"
              name="identityDesign"
              value="brand-guidelines"
              checked={(watchIdentityDesign || []).includes("brand-guidelines")}
              onChange={() => handleIdentityDesignChange("brand-guidelines")}
              className=""
            />
            <label htmlFor="brand-guidelines">Brand Guidelines</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="app-icon"
              name="identityDesign"
              value="app-icon"
              checked={(watchIdentityDesign || []).includes("app-icon")}
              onChange={() => handleIdentityDesignChange("app-icon")}
              className=""
            />
            <label htmlFor="app-icon">App Icon</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="social-media-cover"
              name="identityDesign"
              value="social-media-cover"
              checked={(watchIdentityDesign || []).includes(
                "social-media-cover"
              )}
              onChange={() => handleIdentityDesignChange("social-media-cover")}
              className=""
            />
            <label htmlFor="social-media-cover">
              Social Media Cover/Banner
            </label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="packaging-product"
              name="identityDesign"
              value="packaging-product"
              checked={(watchIdentityDesign || []).includes(
                "packaging-product"
              )}
              onChange={() => handleIdentityDesignChange("packaging-product")}
              className=""
            />
            <label htmlFor="packaging-product">Packaging/Product Label</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="banner"
              name="identityDesign"
              value="banner"
              checked={(watchIdentityDesign || []).includes("banner")}
              onChange={() => handleIdentityDesignChange("banner")}
              className=""
            />
            <label htmlFor="banner">Banner/Signage</label>
          </div>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <input
              type="checkbox"
              id="others"
              name="identityDesign"
              value="others"
              checked={(watchIdentityDesign || []).includes("others")}
              onChange={() => handleIdentityDesignChange("others")}
              className=""
            />
            <label htmlFor="others">Others :</label>
          </div>
        </div>
        <div className="border-b-[1px] pb-2 border-zinc-200">
          <input
            type="text"
            {...register("identityOther")}
            className="border-none placeholder:text-zinc-400 focus:ring-0 focus:outline-none active:ring-0 active:border-none rounded-lg w-full text-sm md:text-base"
            placeholder="Your Answer"
          />
        </div>
      </div>
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <PopupNotification onClose={() => setShowSuccessPopup(false)} />
      )}
      <div className="flex justify-end mt-10 md:mt-20">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FFC5EB] cursor-pointer py-3 w-full text-xl md:text-2xl rounded-xl font-bold  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </div>
    </form>
  );
}
