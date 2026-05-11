import Link from "next/link";

const CareerBanner = () => {
  return (
    <section className="relative! w-full py-20 px-6 flex flex-col items-center justify-center text-center bg-[#1e3a8a]! text-white overflow-hidden!">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br! from-blue-900/50 via-transparent to-blue-800/30! pointer-events-none!"></div>

      <div className="relative  max-w-3xl mx-auto">
        <h2 className="text-4xl! w-120!  mx-auto md:text-5xl! font-bold! mb-6 tracking-tight!">
          Ready to Advance Your Career?
        </h2>

        <p className="text-lg! md:text-xl! text-blue-100 mb-10 leading-relaxed! mt-10! max-w-2xl! mx-auto">
          Discover hundreds of job opportunities from leading companies. Start
          your journey to your next role today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={"/jobs"}>
            <button className="px-3 py-2 rounded-2 bg-blue-50 text-blue-900 font-semibold rounded-md hover:bg-black! hover:text-white transition-colors! duration-200! shadow-lg!">
              Explore Jobs
            </button>
          </Link>
          <Link href={"/admin/createJob"}>
            <button className="px-3 py-2 rounded-2 bg-transparent! border border-blue-300/50! text-white font-semibold! rounded-md! hover:bg-white/10! transition-all! duration-200!">
              Post a Job
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerBanner;
