"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "blogImage">
      endpoint="blogImage"
      onClientUploadComplete={(res) => {
        onUpload(res[0].ufsUrl);
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
    />
  );
}