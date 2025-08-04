import { NextRequest, NextResponse } from "next/server";
import { fileUploadService } from "@/lib/file-upload-service";

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    if (!fileUploadService.isValidUploadThingUrl(url)) {
      return NextResponse.json(
        { error: "Invalid UploadThing URL" },
        { status: 400 }
      );
    }

    const fileKey = fileUploadService.extractFileKey(url);
    const result = await fileUploadService.deleteFile(fileKey);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to delete file", details: result.error?.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in delete file API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
