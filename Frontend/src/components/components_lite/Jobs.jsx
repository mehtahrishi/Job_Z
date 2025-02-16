import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import Footer from "./Footer";

import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    // If no search query is provided, reset to all jobs
    //     if (searchedQuery)
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    // Filter based on the searched query across various fields (title, description, etc.)
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        (job.experience && typeof job.experience === "string" 
          ? job.experience.toLowerCase().includes(query)
          : false) ||
        (job.salary && typeof job.salary === "string" 
          ? job.salary.toLowerCase().includes(query)
          : false)
      );
    });
    

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[99vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4 p-10">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={job.id}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
