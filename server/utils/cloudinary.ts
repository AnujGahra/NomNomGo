import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
    cloud_name:process.env.CLOUD_NAME,
});

export default cloudinary;