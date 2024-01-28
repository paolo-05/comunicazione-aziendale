import {
  FileLoader,
  UploadAdapter,
} from "@ckeditor/ckeditor5-upload/src/uploadadapter";
import axios from "axios";

export class ImgurUploadAdapter implements UploadAdapter {
  constructor(private loader: FileLoader, private imgurApiKey: string) {}

  async upload(): Promise<any> {
    const formData = new FormData();
    formData.append("image", await this.loader.file);

    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: `Client-ID ${this.imgurApiKey}`,
          },
        }
      );

      return { default: response.data.data.link };
    } catch (error) {
      console.error("Error uploading image to Imgur", error);
      throw new Error("Error uploading image to Imgur");
    }
  }

  abort(): void {
    // Implement if needed
  }
}

export function createImgurUploadAdapter(
  imgurApiKey: string
): (loader: FileLoader) => Promise<ImgurUploadAdapter> {
  return (loader: FileLoader) =>
    Promise.resolve(new ImgurUploadAdapter(loader, imgurApiKey));
}
