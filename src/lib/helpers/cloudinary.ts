"use server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadResult = {
  success: boolean;
  imagePath: string | null; // The path of the uploaded image (or null if failed)
};

export async function uploadImageToCloudinaryV2(
  imageFile: File,
  creatorId: number
): Promise<UploadResult> {
  const upload_preset = "InstagramCloneV2PostImage";
  const public_id = `${creatorId.toString()}-${Date.now()}-${
    imageFile.name.split(".")[0]
  }`;

  try {
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload to Cloudinary using Buffer
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset,
              public_id,
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result as UploadApiResponse); // Ensure correct type
            }
          )
          .end(buffer); // Stream the buffer to Cloudinary
      }
    );
    console.log("uploadResult::", uploadResult);
    return {
      success: true,
      imagePath: uploadResult.secure_url,
    };
  } catch (error) {
    console.log("Failed to upload image!", error);
    return { success: false, imagePath: null };
  }
}

export const deleteImageFromCloudinaryV2 = async (imgPublicId: string) => {
  try {
    await cloudinary.uploader.destroy(imgPublicId, {
      invalidate: true,
    });
    return { success: true };
  } catch (error) {
    console.log("Failed to delete image: ", error);
    return { success: false };
  }
};
