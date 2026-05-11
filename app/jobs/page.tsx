"use client";

import { useEffect, useState } from "react";
import { MapPin, DollarSign, Loader2, ChevronDown } from "lucide-react";
import Link from "next/link";
import Header from "../Header";

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  skills: string[];
  requirements: string;
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    fetch("https://1-loyiha-eight.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
   const matchesSearch =
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="bg-[#f9fafb] min-h-screen font-sans p-12 mt-28">
      <Header />
      <div className="max-w-7xl! mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl! font-bold! text-gray-950! mb-3">
            Find Your Next Opportunity
          </h1>
          <p className="text-gray-500! text-lg!">
            Explore our curated list of job openings and find the perfect match
            for your career.
          </p>
        </header>

        <div className="flex gap-10">
          <aside className="w-[320px] shrink-0! bg-white p-8 rounded-2xl! border border-gray-100! shadow-sm! h-fit!">
            <h2 className="text-xl! font-bold! mb-8">Filter Jobs</h2>

            <div className="space-y-8">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-3 block">
                  Search by keyword
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Job title, company, or skills..."
                  className="w-full px-4 py-2 bg-[#fcfcfc] border border-gray-100! rounded-3 text-sm! outline-none! focus:border-blue-200! transition!"
                />
              </div>

              <div>
                <label className="text-sm! font-medium! text-gray-500! mb-3 block!">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-[#fcfcfc] border border-gray-100 rounded-3 text-sm! appearance-none! outline-none!"
                  >
                    <option>All Categories</option>
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                  <ChevronDown className="absolute! right-4! top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                }}
                className="w-full py-2 bg-[#f8f9fa] hover:bg-gray-100! text-gray-900! font-semibold! rounded-xl! border border-gray-100! transition!"
              >
                Reset Filters
              </button>

              <p className="text-xs text-gray-400! pt-4">
                Category: {selectedCategory}
              </p>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl! font-bold!">Available Jobs</h2>
              <span className="text-gray-400 text-sm!">
                {filteredJobs.length} positions
              </span>
            </div>

            <div className="space-y-8">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-950 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        {job.company}
                      </p>
                    </div>
                    <div className="size-12 bg-[#0a2e6e] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {job.company.charAt(0)}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
                      {job.category}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="text-pink-400" />{" "}
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DollarSign size={16} className="text-orange-300" />{" "}
                      {job.salary}
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs text-gray-400 font-semibold mb-3">
                      {job.requirements}
                    </p>
                    <div className="flex gap-2 items-center">
                      {job.skills?.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills?.length > 3 && (
                        <span className="text-xs text-gray-400 ml-1">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="w-full ...">
                    <button className="w-full py-2 bg-[#0a2e6e] hover:bg-[#07245a] text-white rounded-3 font-bold! transition">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
