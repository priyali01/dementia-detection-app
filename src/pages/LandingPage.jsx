import { Link } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
// import CTASection from '../components/landing/CTASection';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;