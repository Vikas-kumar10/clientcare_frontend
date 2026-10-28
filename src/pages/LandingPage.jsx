import LandingNavbar from "../components/LandingComponent/LandingNavbar";
import LandingFooter from "../components/LandingComponent/LandingFooter";
import HeroSection from "../components/LandingComponent/HeroSection";
import FeaturesSection from "../components/LandingComponent/FeaturesSection.jsx";
import WorkflowSection from "../components/LandingComponent/WorkflowSection";
import SignupCta from "../components/LandingComponent/SignupCta";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#292524]">
      <LandingNavbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <SignupCta />
      </main>

      <LandingFooter />
    </div>
  );
}