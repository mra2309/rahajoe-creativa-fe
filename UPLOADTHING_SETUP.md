# UploadThing Integration Setup

This project now uses UploadThing for file uploads in the questionnaire form. Here's how to set it up:

## 1. Get UploadThing Credentials

1. Go to [UploadThing Dashboard](https://uploadthing.com/dashboard)
2. Create a new project or use an existing one
3. Get your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` from the API Keys section

## 2. Environment Variables

Create a `.env.local` file in the root directory and add:

```bash
UPLOADTHING_SECRET=your_uploadthing_secret_key_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
```

## 3. Features

- **File Upload**: Users can upload up to 10 logo example images
- **File Size Limit**: Maximum 8MB per file
- **File Types**: Only image files are accepted
- **Drag & Drop**: Modern drag-and-drop interface
- **File Management**: Users can delete uploaded files
- **Real-time Preview**: Uploaded images are displayed immediately

## 4. API Endpoints

- `POST /api/uploadthing` - Upload files to UploadThing
- `DELETE /api/delete-file` - Delete files from UploadThing

## 5. Components

- `FileUpload` - Custom component for handling file uploads with UploadThing
- `QuestionnaireForm` - Updated to use the new FileUpload component

## 6. Data Flow

1. User uploads files through the FileUpload component
2. Files are uploaded to UploadThing servers
3. URLs are returned and stored in the form state
4. On form submission, URLs are sent to the backend API
5. When files are deleted, they're removed from both the form state and UploadThing

## 7. Configuration

The UploadThing configuration is located in:

- `/app/api/uploadthing/core.ts` - File router configuration
- `/app/api/uploadthing/route.ts` - API route handler
- `/lib/uploadthing.ts` - Client-side utilities
- `/lib/uploadthing-utils.ts` - Server-side utilities for file management

## 8. Next.js Configuration

The `next.config.ts` has been updated to allow images from `utfs.io` domain for UploadThing URLs.

## 9. Type Safety

All components and utilities are fully typed with TypeScript for better development experience and error prevention.
