"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, X } from "lucide-react";

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
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSubmitting(true);

    const applicationData = {
      name: formData.name,
      email: formData.email,
      job: `${job.title} - ${job.company}`,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      const res = await fetch("http://localhost:4000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        setIsModalOpen(false);
        setFormData({ name: "", email: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!job)
    return (
      <div className="p-20 text-center text-red-500 font-bold">
        Job not found!
      </div>
    );

  return (
    <div className="bg-[#fcfcfc]! min-h-screen p-10 font-sans!">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black mb-8 border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm transition"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl! border border-gray-100! shadow-sm! p-10 mb-8">
          <div className="flex justify-between items-start!">
            <div>
              <h1 className="text-4xl! font-bold! text-gray-900! mb-3">
                {job.title}
              </h1>
              <p className="text-[#0a2e6e] text-xl! font-semibold! mb-6">
                {job.company}
              </p>

              <div className="flex gap-3">
                <span className="px-3 py-1.5 bg-[#eef2ff] text-[#3730a3] rounded-md! text-xs! font-bold!">
                  {job.category}
                </span>
                <span className="px-3 py-1.5 bg-[#f0f9ff] text-[#0369a1] rounded-md! text-xs! font-bold!">
                  {job.location}
                </span>
              </div>
            </div>
            <div className="text-[#c2410c] text-3xl! font-extrabold!">
              {job.salary}
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0a2e6e] hover:bg-[#07245a] text-white px-16 py-2 rounded-2 font-bold! text-lg! transition! shadow-lg1"
            >
              Apply Now
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-1">Apply for Position</h2>
              <p className="text-sm text-gray-500 mb-6">
                Apply to:{" "}
                <span className="font-semibold text-black">{job.title}</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0a2e6e]"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0a2e6e]"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full bg-[#0a2e6e] text-white py-3 rounded-lg font-bold hover:bg-[#07245a] transition flex justify-center items-center"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl! border border-gray-100 shadow-sm! p-10">
              <h2 className="text-2xl! font-bold! text-gray-900! mb-6">
                Job Description
              </h2>
              <p className="text-gray-600! leading-relaxed! text-lg!">
                {job.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl! border border-gray-100! shadow-sm! p-10">
              <h2 className="text-2xl! font-bold! text-gray-900! mb-6">
                Requirements
              </h2>
              <ul className="space-y-4">
                {job.skills?.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600! text-lg!"
                  >
                    <span className="size-1.5! bg-blue-900 rounded-full! mr-3 shrink-0!"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sticky top-10">
              <h2 className="text-xl! font-bold! text-gray-900! mb-8">
                Job Details
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="text-gray-400! text-sm! mb-1.5">Location</p>
                  <p className="font-bold! text-gray-900!">{job.location}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1.5">Job Type</p>
                  <p className="font-bold text-gray-900">{job.type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1.5">Category</p>
                  <p className="font-bold text-gray-900">{job.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1.5">Salary</p>
                  <p className="font-bold text-[#c2410c]">{job.salary}</p>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <p className="text-gray-400 text-sm mb-1.5">Company</p>
                  <p className="font-bold text-gray-900">{job.company}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
