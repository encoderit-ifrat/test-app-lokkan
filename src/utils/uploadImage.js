// utils/uploadImage.js
import { apiInstance } from "@/api";
import { serialize } from "object-to-formdata";

const uploadImage = async (
  image,
  index,
  id,
  type,
  setProgress,
  setUploadedCount
) => {
  const requiredData = {
    file: image.file,
    title: image?.title,
    type: type,
    id: id,
  };
  const formData = serialize(requiredData, { indices: true });

  try {
    await apiInstance.post("attachment/save", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress((prevProgress) => ({
          ...prevProgress,
          [index]: percentCompleted,
        }));
      },
    });
    setUploadedCount((prevCount) => prevCount + 1);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default uploadImage;
