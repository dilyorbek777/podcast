"use client";

import { UploadButton } from "@uploadthing/react";
import type { ourFileRouter } from "@/app/api/uploadthing/core";

export default function VideoUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <UploadButton<typeof ourFileRouter, "episodeVideo">
      endpoint="episodeVideo"
      onClientUploadComplete={(res) => {
        onUpload(res[0].ufsUrl);
      }}
    />
  );
}