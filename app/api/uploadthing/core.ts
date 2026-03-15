import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();



export const OurFileRouter = {

  blogImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  episodePoster: f({ image: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  episodeVideo: f({ video: { maxFileSize: "512MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

} satisfies FileRouter;