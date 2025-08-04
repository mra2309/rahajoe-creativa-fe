import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFile(fileKey: string) {
  try {
    await utapi.deleteFiles([fileKey]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error };
  }
}

export async function deleteFiles(fileKeys: string[]) {
  try {
    await utapi.deleteFiles(fileKeys);
    return { success: true };
  } catch (error) {
    console.error("Error deleting files:", error);
    return { success: false, error };
  }
}

// Extract file key from UploadThing URL
export function extractFileKey(url: string): string {
  // UploadThing URLs have the format: https://utfs.io/f/{fileKey}
  const parts = url.split("/f/");
  return parts[parts.length - 1];
}
