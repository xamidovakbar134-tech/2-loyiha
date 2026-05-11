import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-white py-16 px-4 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-4">
          Career Opportunities
        </p>

        <h1 className=" text-black mb-6 font-bold! text-7xl!">
          Find Your Perfect <span className="text-blue-900">Career</span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover career opportunities from top companies. Search, filter, and
          apply to roles that match your skills and aspirations.
        </p>

        <div className="mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center shadow-sm border border-slate-200 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search by job title, company, or keyword..."
              className="w-full outline-none! p-2 text-slate-700! bg-slate-50/50!"
            />
            <Link href="/jobs">
              <button className="w-full sm:w-auto bg-[#0f3460]! hover:bg-[#1a4a80]! text-white py-2 px-3 font-medium transition-colors">
                Search
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link href={"/jobs"}>
            <button className="bg-[#0f3460]! rounded-2 py-2 px-3 text-white rounded-md font-semibold hover:bg-[#1a4a80]! transition-all">
              Browse All Jobs
            </button>
          </Link>
          <Link href={"/admin/createJob"}>
            <button className="bg-white text-slate-900! py-2 px-3 rounded-2 border border-slate-200! rounded-md font-semibold hover:bg-slate-50! transition-all!">
              Post a Job
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-900!">500+</span>
            <span className="text-slate-500! mt-1">Active Jobs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-900!">200+</span>
            <span className="text-slate-500! mt-1">Companies</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-900!">50K+</span>
            <span className="text-slate-500! mt-1">Placements</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
