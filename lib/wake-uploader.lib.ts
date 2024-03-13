import axios from "axios";

/**
 * simple request to wake up the uploader
 */
export const wakeUploader = async (): Promise<void> => {
  await axios.options(process.env.NEXT_PUBBLIC_CLOUDINARY_UPLOADER_URL ?? "");
};
