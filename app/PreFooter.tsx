const StatisticsSection = () => {
  const stats = [
    { label: "Active Job Listings", value: "500+" },
    { label: "Top Companies", value: "200+" },
    { label: "Successful Placements", value: "50K+" },
    { label: "User Satisfaction", value: "98%" },
  ];

  return (
    <section className="bg-[#00337C] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl! md:text-4xl! font-bold! mb-4">
          Trusted by Job Seekers Worldwide
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-12 text-sm md:text-base">
          Our platform has helped thousands of professionals find their ideal
          career opportunities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-blue-200">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
