import { SetStateAction } from "react";
import { IBanner } from "../utils/interface";

const FileInput = ({
  bannerData,
  setBannerData,
  id,
  label,
}: {
  bannerData: IBanner;
  setBannerData: React.Dispatch<SetStateAction<IBanner>>;
  id: string;
  label: string;
}) => {
  const convertToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => callback(reader.result as string);
  };

  return (
    <div>
      <label
        className="block mb-1 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        id={id}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            convertToBase64(e.target.files[0], (base64) =>
              setBannerData((prev) => ({ ...prev, [id]: base64 }))
            );
          }
        }}
        className="shadow-sm w-full rounded-sm cursor-pointer bg-gray-50 focus:outline-none text-sm text-stone-500 file:mr-3 file:p-2.5 file:border-0 file:rounded-l-sm file:text-xs file:font-medium file:bg-stone-200 file:text-stone-900 hover:file:cursor-pointer hover:file:bg-green-100 hover:file:text-green-800"
      />
    </div>
  );
};

export default FileInput;
