import { useForm } from "react-hook-form";
import { IBannerForm } from "../utils/type";
import FileInput from "./FileInput";
import Button from "./Button";

const Form = (props: IBannerForm) => {
  const { bannerData, setBannerData } = props;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<IBannerForm>({
    mode: "onChange",
  });

  const onSubmit = (data: IBannerForm) => {
    setBannerData((prev) => ({
      ...prev,
      bannerText: data.bannerData.bannerText,
      bannerDesc: data.bannerData.bannerDesc,
    }));
  };

  const watchedFields = watch("bannerData");

  const updateText = () => {
    const newText = getValues("bannerData.bannerText");
    if (newText) {
      setBannerData((prev) => ({ ...prev, bannerText: newText }));
    }
  };

  const updateDesc = () => {
    const newDesc = getValues("bannerData.bannerDesc");
    if (newDesc) {
      setBannerData((prev) => ({ ...prev, bannerDesc: newDesc }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex justify-center flex-col md:min-w-3xl md:mx-auto px-5 my-5"
      role="form"
    >
      <h3 className="font-bold">Edit the banner</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-sm">
          <label>Change Banner text</label>
          <div className="flex flex-col md:flex-row mt-1 gap-2 md:gap-0">
            <input
              type="text"
              placeholder="Change banner text"
              {...register("bannerData.bannerText", {
                required: `Banner text is required`,
              })}
              className="shadow-sm p-1.5 border rounded-r-sm md:rounded-r-none md:rounded-l-sm border-none bg-gray-50 focus:border-none form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#1C160C] focus:outline-0 focus:ring-0 text-base font-normal leading-normal"
            />

            <Button
              text="Update Text"
              type="button"
              action={updateText}
              disabled={!watchedFields?.bannerText}
              styles="w-fit disabled:bg-[#019863]/70 disabled:cursor-not-allowed"
            />
          </div>
          {errors?.bannerData?.bannerText && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.bannerData?.bannerText?.message}
            </p>
          )}
        </div>

        <div className="text-sm">
          <label>Change Banner description</label>
          <div className="flex flex-col md:flex-row mt-1 gap-2 md:gap-0 md:items-end">
            <textarea
              rows={2}
              placeholder="Change banner description"
              {...register("bannerData.bannerDesc", {
                required: `Banner description is required`,
              })}
              className="shadow-sm p-1.5 border rounded-r-sm md:rounded-r-none md:rounded-l-sm border-none bg-gray-50 focus:border-none form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-gray-900 focus:outline-0 focus:ring-0 text-base font-normal leading-normal"
            />
            <Button
              text="Update Desc"
              type="button"
              action={updateDesc}
              disabled={!watchedFields?.bannerDesc}
              styles="w-fit disabled:bg-[#019863]/70 disabled:cursor-not-allowed"
            />
          </div>
          {errors?.bannerData?.bannerText && (
            <p className="text-red-500 text-xs mt-1">
              {errors?.bannerData?.bannerDesc?.message}
            </p>
          )}
        </div>

        <FileInput
          bannerData={bannerData}
          setBannerData={setBannerData}
          id="bannerBg"
          label="Change Banner Background"
        />

        <FileInput
          bannerData={bannerData}
          setBannerData={setBannerData}
          id="bannerImg"
          label="Change Banner Small Image"
        />
      </div>

      <div className="flex justify-end">
        <Button
          text="Update All text"
          type="submit"
          disabled={!isValid}
          styles="rounded-sm "
        />
      </div>
    </form>
  );
};

export default Form;
