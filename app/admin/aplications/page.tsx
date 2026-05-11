/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

interface Application {
  id: string | number;
  name: string;
  email: string;
  job: string;
  date: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:4000/applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleView = (app: Application) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("O'chirilsinmi?")) {
      try {
        await fetch(`http://localhost:4000/applications/${id}`, {
          method: "DELETE",
        });
        setApplications(applications.filter((app) => app.id !== id));
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
        <p className="text-gray-500">
          Review and manage all job applications ({applications.length} total)
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="py-4 px-6 font-semibold text-sm text-gray-700">
                Name
              </th>
              <th className="py-4 px-6 font-semibold text-sm text-gray-700">
                Email
              </th>
              <th className="py-4 px-6 font-semibold text-sm text-gray-700">
                Job
              </th>
              <th className="py-4 px-6 font-semibold text-sm text-gray-700">
                Applied date
              </th>
              <th className="py-4 px-6 font-semibold text-sm text-gray-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
              >
                <td className="py-4 px-6 text-sm! text-gray-800! font-medium!">
                  {app.name}
                </td>
                <td className="py-4 px-6 text-sm! text-gray-600!">{app.email}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{app.job}</td>
                <td className="py-4 px-6 text-sm! text-gray-800!">{app.date}</td>
                <td className="py-4 px-6 text-sm! text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleView(app)}
                      className="text-gray-900 hover:underline font-medium flex items-center gap-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:text-red-700 font-medium!"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 pb-2 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">
                  Application Details
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  View the full application details
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Name
                </label>
                <p className="text-lg text-gray-900 font-medium mt-0.5">
                  {selectedApp.name}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Email
                </label>
                <p className="text-lg text-gray-900 font-medium mt-0.5">
                  {selectedApp.email}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Job Position
                </label>
                <p className="text-lg text-gray-900 font-medium mt-0.5">
                  {selectedApp.job}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Applied Date
                </label>
                <p className="text-lg text-gray-900 font-medium mt-0.5">
                  {selectedApp.date}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;