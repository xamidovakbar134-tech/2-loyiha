import { Search, Star, Sparkles, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl! font-bold! text-gray-900 mb-4">
          Why Choose JobPortal?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We ve designed the most intuitive job search platform to help you find
          opportunities that align with your career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md! transition-shadow!">
          <div className="mb-4">
            <Search className="text-blue-500! w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Powerful Search
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Advanced filtering by job title, category, and more. Find exactly
            what you re looking for in seconds.
          </p>
        </div>

        <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md! transition-shadow!">
          <div className="mb-4">
            <Star className="text-yellow-400! w-8 h-8 fill-yellow-400!" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Curated Opportunities
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Carefully selected job postings from verified companies across
            industries and experience levels.
          </p>
        </div>

        <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md! transition-shadow!">
          <div className="mb-4">
            <Sparkles className="text-orange-400 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            User-Friendly Interface
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Intuitive design makes job hunting simple and enjoyable. Browse,
            filter, and explore with ease.
          </p>
        </div>

        <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md! transition-shadow!">
          <div className="mb-4">
            <Zap className="text-orange-500! w-8 h-8 fill-orange-500!" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Real-Time Updates
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Instant notifications for new job postings. Never miss an
            opportunity that matches your profile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
