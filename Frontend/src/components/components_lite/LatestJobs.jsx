import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []); // Safely access allJobs

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-4xl font-bold text-center
      ">
        <span className="text-[#FA4F09]">Latest & Top </span>
        <span className="text-[#6B3AC2]">Job Openings</span>
      </h2>
      <p className="text-center text-black my-1">
          Explore our latest job openings.
        </p>
      {/* Job Cards */}
      <div className="grid grid-cols-3 gap-4 my-8">
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job}></JobCards>
              ) : (
                <span key={Math.random()}>Invalid Job Data</span>
              )
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
