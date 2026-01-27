import { Link } from "react-router-dom";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import LandingHeader from "../components/landing/LandingHeader";
import Footer from "../components/layout/Footer";
import VideoSlider from "../components/landing/VideoSlider";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <VideoSlider />
      <LandingHeader />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
