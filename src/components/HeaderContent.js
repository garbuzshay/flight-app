import { Link } from "react-router-dom";

const HeaderContent = ({ variant = "desktop" }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-left space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sky-900">
          Your Journey Starts Here
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Transform your travel dreams into reality. Discover, book, and create
          memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/flights"
            className="inline-block px-8 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {variant === "mobile" ? "Find Flights" : "Start Your Adventure & Find Flight"}
          </Link>
          <Link
            to="/hotels"
            className="inline-block px-8 py-3 bg-white border border-sky-600 text-sky-800 hover:bg-sky-50 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {variant === "mobile" ? "Book Hotels" : "Find Your Perfect Hotel"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
