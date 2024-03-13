import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import axios from "axios";

import { DROPZONE_OPTIONS, uploadFile } from "@/lib";
import { type UploadCoverImageModalProps } from "@/types/post";

interface ImageRes {
  public_id: string;
  secure_url: string;
}

const imageTypeRegex = /image\/(png|gif|jpg|jpeg)/gm;

export const useUpload = ({
  setImageURL,
}: UploadCoverImageModalProps): {
  isFetching: boolean;
  isDragActive: boolean;
  isSuccess: boolean;
  image: ImageRes | null;
  progressStatus: number;
  inputRef: any;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  getRootProps: () => Record<string, unknown>;
  getInputProps: () => Record<string, unknown>;
  wantsToChange: boolean;
  setWantsToChange: (value: boolean) => void;
} => {
  const [formatImage, setFormatImage] = useState<FormData | null>(null);
  const [image, setImage] = useState<ImageRes | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progressStatus, setProgressStatus] = useState(0);
  const [wantsToChange, setWantsToChange] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    setFormatImage(formData);
  }, []);

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({ ...DROPZONE_OPTIONS, onDrop });

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target?.files;

    const formData = new FormData();
    const file = files?.[0];

    if (file?.type.match(imageTypeRegex) == null) return;

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    setFormatImage(formData);
  };

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections
        .map((el) => el.errors)
        // eslint-disable-next-line array-callback-return
        .map((err) => {
          // eslint-disable-next-line array-callback-return
          err.map((el) => {
            if (el.code.includes("file-invalid-type")) {
              toast.error("Il tipo di file dev'essere .png,.jpg,.jpeg,.gif", {
                theme: "colored",
              });
            }
            if (el.code.includes("file-too-large")) {
              toast.error("File più grande di 10MB", { theme: "colored" });
            }
          });
        });
    }
  }, [fileRejections]);

  useEffect(() => {
    void (async () => {
      if (formatImage == null) return;

      try {
        setIsFetching(true);
        const data: ImageRes | null = await uploadFile({
          formData: formatImage,
          onUploadProgress(progress) {
            setProgressStatus(progress);
          },
        });

        if (data != null) {
          setFormatImage(null);
          setImage(data);
          setIsFetching(false);
          setIsSuccess(true);
          toast.success("Caricato con successo!");
          setImageURL(data.secure_url);
        }
      } catch (err) {
        if (axios.isAxiosError<{ message: string }>(err)) {
          toast.error(err.response?.data.message);
        }
        if (err instanceof Error) {
          toast.error(err.message);
        }
        setFormatImage(null);
        setImage(null);
        setIsFetching(false);
        setIsSuccess(false);
      }
      setWantsToChange(false);
    })();
  }, [formatImage, setImageURL]);

  return {
    isFetching,
    isDragActive,
    isSuccess,
    image,
    progressStatus,
    inputRef,
    onChangeFile,
    getRootProps,
    getInputProps,
    wantsToChange,
    setWantsToChange,
  };
};
