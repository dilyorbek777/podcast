import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  episodePoster: f({
    image: { maxFileSize: "8MB" },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
  blogImage: f({
    image: {
      maxFileSize: "4MB",
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),

  episodeVideo: f({ video: { maxFileSize: "512MB" } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
{
  /*
  export const OurFileRouter = {

  blogImage: f({
   image: { 
   maxFileSize: "4MB" 
   } 
   })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  episodePoster: f({ 
  image: { maxFileSize: "8MB" } })

    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  episodeVideo: f({ video: { maxFileSize: "512MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

} satisfies FileRouter;
  */
}
