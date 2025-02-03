import { Link } from "react-router-dom";

const HeaderContent = ({ variant = "desktop" }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-left space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sky-900">
          Your Journey Starts Here
        </h1>
        <p className="text-xl  text-gray-600 max-w-2xl">
          Transform your travel dreams into reality. Discover, book, and create
          memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4  sm:space-y-0 sm:space-x-4">
          <Link
            to="/flights"
            className="inline-block px-8 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {variant === "mobile" ? "Find Flights" : "Start Your Adventure & Find Flight"}
          </Link>
          <Link
            to="/hotels"
            className={`inline-block px-8 py-3  bg-white border border-sky-600 text-sky-800 hover:bg-sky-50 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            {variant === "mobile" ? "Book Hotels" : "Find Your Perfect Hotel"}
          </Link>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-white">
      {/* Mobile Header  */}
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
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "✈️",
                color: "sky",
                title: "Best Flight Deals",
                description:
                  "Intelligent flight comparison to find your perfect, most cost-effective route.",
              },
              {
                icon: "🏨",
                color: "emerald",
                title: "Perfect Hotels",
                description:
                  "Curated accommodations matching your unique travel style and budget.",
              },
              {
                icon: "🔄",
                color: "indigo",
                title: "Flexible Options",
                description:
                  "Worry-free booking with adaptable policies and simple cancellation.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-${feature.color}-50/50 rounded-2xl p-6 md:p-8 text-center border border-${feature.color}-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="text-5xl mb-4 md:mb-6 opacity-80">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold text-${feature.color}-900`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
