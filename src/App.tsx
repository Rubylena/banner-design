import Banner from "./components/Banner";
import { useState } from "react";
import { IBanner } from "./utils/interface";
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { DEFAULT_BANNER_DATA } from "./data/constant";

function App() {
  const [bannerData, setBannerData] = useState<IBanner>(DEFAULT_BANNER_DATA);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header/>
      <Banner
        bannerBg={bannerData.bannerBg}
        bannerImg={bannerData.bannerImg}
        bannerText={bannerData.bannerText}
        bannerDesc={bannerData.bannerDesc}
      />
      <Form bannerData={bannerData} setBannerData={setBannerData} />
      <Footer />
    </div>
  );
}

export default App;
