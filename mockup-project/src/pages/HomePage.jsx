import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Strip from "../components/Strip";
import TextAnimation from "../components/TextAnimation";
import Footer from "../components/Footer";
import ExpertiseSection from "../components/ExpertiseSection";
import SplitTextAnimation from "../components/SplitTextAnimation";
import BlogCardsSection from "../components/BlogCardsSection";
import Cards from "../components/Cards";

const HomePage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <HeroSection />
      <TextAnimation
        text="Digital Innovation Studio is a forward-thinking agency that transforms ideas into immersive digital experiences. We specialize in
      creating innovative web solutions, captivating designs, and strategic digital transformations that help brands make a splash in the digital world."
        className="mx-auto my-8 text-3xl font-semibold mt-12 text-center
      max-w-xl"
      />
      <button className="bg-blue-600 cursor-pointer py-3 px-6 text-xl rounded-md text-white hover:scale-105 transition-all duration-200 hover:bg-blue-600">
        About us
      </button>

      <Cards />

      <TextAnimation
        text={`"Working with Digital Innovation Studio was an exceptional experience from start to finish."`}
        className="text-[2rem] md:text-[6rem] font-semibold my-20 text-center leading-relaxed md:leading-[7rem] max-w-[80%] mx-auto"
      />
      <hr className="w-[90%] mx-auto" />
      <TextAnimation className="my-20">
        <div className="flex justify-center gap-20 mx-4">
          <div className="text-center">
            <h2 className="text-6xl font-bold">3</h2>
            <p className="text-xl mt-2">Featured Work</p>
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-bold">15+</h2>
            <p className="text-xl mt-2">Projects Completed</p>
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-bold">2×</h2>
            <p className="text-xl mt-2">Awwwards Featured</p>
          </div>
        </div>
      </TextAnimation>
      <TextAnimation
        text={`Our expertise is in designing visuals that effectively connect with the target audience.`}
        className="text-3xl font-semibold my-12 text-center max-w-2xl mx-auto"
      />

      <button className="bg-blue-600 cursor-pointer py-3 px-6 text-xl rounded-md text-white hover:scale-105 transition-all duration-200 hover:bg-blue-600">
        Work with us
      </button>

      <ExpertiseSection />
      <SplitTextAnimation />
      <TextAnimation
        text={`Discover how Digital Innovation Studio can help transform your digital presence with our innovative solutions and creative expertise.`}
        className="text-3xl font-semibold my-12 text-center max-w-2xl mx-auto"
      />

      <button className="bg-blue-600 cursor-pointer py-3 px-6 text-xl rounded-md text-white hover:scale-105 transition-all duration-200 hover:bg-blue-600 mb-12">
        View All
      </button>
      <BlogCardsSection />
      <Strip />
      <Footer />
    </div>
  );
};

export default HomePage;
