/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  location: string;
  company: string;
  category: string;
  type: string;
}

const JobsManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:4000/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Vakansiyalarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Ushbu vakansiyani o'chirmoqchimisiz?")) {
      try {
        await fetch(`http://localhost:4000/jobs/${id}`, {
          method: "DELETE",
        });
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <Loader2 className="animate-spin size-10 mb-2" />
        <p>Vakansiyalar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl! font-bold! text-gray-900!">
            Jobs Management
          </h1>
          <p className="text-gray-500! mt-1">Manage all your job postings</p>
        </div>
        <Link href={"/admin/createJob"} className="text-decoration-none">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a8a] text-white font-semibold! rounded-lg! hover:bg-blue-900! transition! shadow-md!">
            <Plus size={18} />
            Create New Job
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl! font-bold! text-gray-800!">
            All Jobs ({jobs.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfafb]">
              <tr>
                <th className="px-6 py-4 text-sm! font-semibold! text-gray-700!">
                  Title
                </th>
                <th className="px-6 py-4 text-sm! font-semibold! text-gray-700!">
                  Company
                </th>
                <th className="px-6 py-4 text-sm! font-semibold! text-gray-700!">
                  Category
                </th>
                <th className="px-6 py-4 text-sm font-semibold! text-gray-700!">
                  Type
                </th>
                <th className="px-6 py-4 text-sm! font-semibold! text-gray-700! ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y! divide-gray-100!">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50! transition!">
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900! leading-none!">
                        {job.title}
                      </p>
                      <p className="text-xs text-gray-400! mt-1">
                        {job.location}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-gray-600! font-medium!">
                      {job.company}
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-50! text-blue-700! text-xs! font-semibold! rounded-full! border border-blue-100!">
                        {job.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100! text-gray-600! text-xs! font-semibold! rounded-full! border border-gray-200!">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 ">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-4 py-1.5 border border-gray-300! text-red-600! text-sm! font-semibold! rounded-md! hover:bg-red-50! hover:border-red-200! transition! inline-flex! items-center! gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center! text-gray-400!">
                    Hech qanday vakansiya topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobsManagement;