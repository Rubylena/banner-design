import { SetStateAction } from "react";
import { IBanner } from "./interface";

export type IBannerForm = {
  bannerData: IBanner;
  setBannerData: React.Dispatch<SetStateAction<IBanner>>;
};
