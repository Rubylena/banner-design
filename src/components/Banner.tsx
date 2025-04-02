import { IBanner } from "../utils/interface";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Banner = (props: IBanner) => {
  const { bannerText, bannerBg, bannerImg, bannerDesc } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        backgroundImage: `url(${bannerBg})`,
      }}
      className={`
        w-full p-10 min-h-96 bg-cover bg-center bg-no-repeat 
        flex flex-col justify-end items-start text-white 
        bg-gray-900/60 bg-blend-overlay shadow-lg 
        relative overflow-hidden transition-all duration-500 ease-in-out
        hover:bg-gray-900/50 group
      `}
      data-testid="banner"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

      <div className="w-full flex flex-col-reverse md:flex-row md:items-center gap-5 relative z-10">
        <motion.div className="md:w-1/2 space-y-4" variants={itemVariants}>
          <motion.h1
            className="text-2xl md:text-4xl xl:text-5xl font-bold leading-tight"
            variants={itemVariants}
          >
            {bannerText}
          </motion.h1>
          <motion.p
            className="text-base xl:text-lg max-w-lg text-gray-200"
            variants={itemVariants}
          >
            {bannerDesc}
          </motion.p>
        </motion.div>

        <motion.div
          className="size-24 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            rotate: [0, 2, -2, 0],
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={bannerImg}
            alt="emoji of choice"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
