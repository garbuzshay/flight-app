import HeaderContent from "../components/HeaderContent";
import FeaturesSection from "../components/FeaturesSection";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-white">
      {/* Mobile Header */}
      <section className="md:hidden relative py-12 bg-gradient-to-br text-gray-900 from-sky-100 via-sky-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-sky-600 opacity-[0.03]"></div>
        <HeaderContent variant="mobile" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Desktop Header */}
      <section
        className="hidden md:block relative bg-cover bg-center text-gray-900 py-16"
        style={{ backgroundImage: "url('/banner1.jpg')" }}
      >
        <HeaderContent variant="desktop" />
      </section>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}

export default HomePage;
