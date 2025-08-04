import { UTApi } from "uploadthing/server";

export class FileUploadService {
  private utapi: UTApi;

  constructor() {
    this.utapi = new UTApi();
  }

  /**
   * Delete a single file from UploadThing
   */
  async deleteFile(
    fileKey: string
  ): Promise<{ success: boolean; error?: Error }> {
    try {
      await this.utapi.deleteFiles([fileKey]);
      return { success: true };
    } catch (error) {
      console.error("Error deleting file:", error);
      return { success: false, error: error as Error };
    }
  }

  /**
   * Delete multiple files from UploadThing
   */
  async deleteFiles(
    fileKeys: string[]
  ): Promise<{ success: boolean; error?: Error }> {
    try {
      await this.utapi.deleteFiles(fileKeys);
      return { success: true };
    } catch (error) {
      console.error("Error deleting files:", error);
      return { success: false, error: error as Error };
    }
  }

  /**
   * Extract file key from UploadThing URL
   * UploadThing URLs have the format: https://utfs.io/f/{fileKey}
   */
  extractFileKey(url: string): string {
    const parts = url.split("/f/");
    return parts[parts.length - 1];
  }

  /**
   * Extract multiple file keys from an array of URLs
   */
  extractFileKeys(urls: string[]): string[] {
    return urls.map((url) => this.extractFileKey(url));
  }

  /**
   * Validate if a URL is a valid UploadThing URL
   */
  isValidUploadThingUrl(url: string): boolean {
    return url.startsWith("https://utfs.io/f/");
  }

  /**
   * Filter and extract keys from valid UploadThing URLs
   */
  extractValidFileKeys(urls: string[]): string[] {
    return urls
      .filter((url) => this.isValidUploadThingUrl(url))
      .map((url) => this.extractFileKey(url));
  }
}

// Export a singleton instance
export const fileUploadService = new FileUploadService();

// Export individual functions for backwards compatibility
export const deleteFile = (fileKey: string) =>
  fileUploadService.deleteFile(fileKey);
export const deleteFiles = (fileKeys: string[]) =>
  fileUploadService.deleteFiles(fileKeys);
export const extractFileKey = (url: string) =>
  fileUploadService.extractFileKey(url);
export const extractFileKeys = (urls: string[]) =>
  fileUploadService.extractFileKeys(urls);
export const isValidUploadThingUrl = (url: string) =>
  fileUploadService.isValidUploadThingUrl(url);
export const extractValidFileKeys = (urls: string[]) =>
  fileUploadService.extractValidFileKeys(urls);
