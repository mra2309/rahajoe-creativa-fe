"use client";

import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useState } from "react";
import Image from "next/image";

interface UploadedFile {
  url: string;
  name: string;
  key: string;
}

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  onFileDeleted: (fileUrl: string) => void;
  maxFiles?: number;
  currentFiles: UploadedFile[];
}

export function FileUpload({
  onFilesUploaded,
  onFileDeleted,
  maxFiles = 10,
  currentFiles = [],
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("logoExamples", {
    onClientUploadComplete: (
      res: Array<{ url: string; name: string; key: string }>
    ) => {
      //   console.log("Upload Completed", res);
      const uploadedFiles = res.map((file) => ({
        url: file.url,
        name: file.name,
        key: file.key,
      }));
      onFilesUploaded(uploadedFiles);
      setIsUploading(false);
    },
    onUploadError: (error: Error) => {
      console.error("Upload Error:", error);
      setIsUploading(false);
      alert(`Upload failed: ${error.message}`);
    },
    onUploadBegin: () => {
      //   console.log("Upload has begun");
      setIsUploading(true);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (currentFiles.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files total.`);
        return;
      }

      const maxFileSize = 8 * 1024 * 1024; // 8MB in bytes
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxFileSize) {
          alert(`File "${file.name}" is too large. Maximum size is 8MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        startUpload(validFiles);
      }
    },
    [startUpload, currentFiles.length, maxFiles]
  );

  const fileTypes = routeConfig
    ? generateClientDropzoneAccept(["image"])
    : { "image/*": [] };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes,
    maxFiles: maxFiles - currentFiles.length,
    disabled: isUploading || currentFiles.length >= maxFiles,
  });

  const handleDeleteFile = async (fileUrl: string) => {
    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: fileUrl }),
      });

      if (response.ok) {
        onFileDeleted(fileUrl);
      } else {
        console.error("Failed to delete file");
        alert("Failed to delete file. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${
          isUploading || currentFiles.length >= maxFiles
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="space-y-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-600">Uploading files...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {isDragActive ? (
              <p className="text-sm text-blue-600">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Drop files here or click to select
                </p>
                <p className="text-xs text-gray-400">
                  Maximum {maxFiles} files, 8MB each
                  {currentFiles.length > 0 && (
                    <span className="text-blue-600 font-medium ml-2">
                      ({currentFiles.length}/{maxFiles} files uploaded)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Preview */}
      {currentFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm md:text-base">
            Uploaded Images:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentFiles.map((file, index) => (
              <div key={file.url} className="relative group">
                <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={file.url}
                    alt={`Logo example ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(file.url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
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
  );
}
