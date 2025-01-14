import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "LMS" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(file.buffer);
  });
};

export const deleteCloudinary = async (publicId, type) => {
  try {
    await cloudinary.uploader.destroy(publicId,{ resource_type: type });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};
