import Banner from "./components/Banner";
import { useState } from "react";
import { IBanner } from "./utils/interface";
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [bannerData, setBannerData] = useState<IBanner>({
    bannerText: "I love building awesome UIs!",
    bannerBg: "/assets/img/bg2.jpg",
    bannerImg: "/assets/img/e1.jpg",
    bannerDesc: "I’m Grace, a software engineer based in Nigeria. I enjoy building intuitive user interfaces.",
  });

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
