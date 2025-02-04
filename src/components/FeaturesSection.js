const FeaturesSection = () => {
  return (
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
              <div className="text-5xl mb-4 md:mb-6 opacity-80">{feature.icon}</div>
              <h3 className={`text-xl font-semibold text-${feature.color}-900`}>{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
