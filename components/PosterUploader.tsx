"use client";

import { UploadButton } from "@uploadthing/react";
import type { ourFileRouter } from "@/app/api/uploadthing/core";

export default function PosterUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <UploadButton<typeof ourFileRouter, "episodePoster">
      endpoint="episodePoster"
      onClientUploadComplete={(res) => {
        onUpload(res[0].ufsUrl);
      }}
    />
  );
}