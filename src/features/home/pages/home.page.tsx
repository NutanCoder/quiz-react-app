import Navbar from '@/components/landing/Navbar';
import Footer from '@/layouts/footer';
import {
  FAQSection,
  FeaturesSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
} from '@/features/home/components';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
