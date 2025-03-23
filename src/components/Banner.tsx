import { IBanner } from "../utils/interface";

const Banner = (props: IBanner) => {
  const { bannerText, bannerBg, bannerImg, bannerDesc } = props;

  return (
    <div
      style={{
        backgroundImage: `url(${bannerBg})`,
      }}
      className={`w-full p-10 min-h-96 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start text-white bg-gray-900/60 bg-blend-overlay shadow-sm drop-shadow-sm `}
      data-testid="banner"
    >
      <div className="w-full flex flex-col-reverse md:flex-row md:items-center gap-5">
        <div className="md:w-1/2">
          <h1 className="text-lg xl:text-5xl font-bold">{bannerText}</h1>
          <p className="text-base xl:text-lg max-w-lg">{bannerDesc}</p>
        </div>

        <div className="size-24 rounded-sm">
          <img src={bannerImg} alt="emoji of choice" className="object-cover rounded-sm w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
