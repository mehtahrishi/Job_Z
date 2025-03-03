import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data"; // Adjust the import based on your project structure

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  const deleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        // Optionally, you can show a success message
        console.log("Job deleted successfully");
        // Refresh the jobs list or remove the deleted job from the state
        setFilterJobs((prev) => prev.filter(job => job._id !== jobId));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      // Optionally, show an error message
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Your Recent Posted Jobs</TableCaption>
        <TableHeader className="border-black border-y-2">
          <TableRow>
            <TableHead className="font-bold text-black">Company Logo</TableHead>
            <TableHead className="font-bold text-black">Company Name</TableHead>
            <TableHead className="font-bold text-black">Role</TableHead>
            <TableHead className="font-bold text-black">Description</TableHead>
            <TableHead className="font-bold text-black">Location</TableHead>
            <TableHead className="font-bold text-black">Salary</TableHead>
            <TableHead className="font-bold text-black">Job Type</TableHead>
            <TableHead className="font-bold text-black">Date Posted</TableHead>
            <TableHead className="font-bold text-black text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span className="text-[#6b3ac2] my-5 flex font-semibold text-right">No Job Posted</span>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job.id} className="border-none">
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={job?.company?.logo || "default-logo-url"}
                      alt={`${job?.company?.name || "Company"} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <ChevronDown className="cursor-pointer text-black hover:text-[#6b3ac2]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-white font-medium bg-black p-3 border shadow-md">
                      {job.description}
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-black text-white font-semibold">
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer my-1">
                        <Eye className="w-4 font-bold text-yellow-200"></Eye>
                        <span>Applicants</span>
                      </div>
                      <div onClick={() => deleteJob(job._id)} className="flex items-center gap-2 w-fit cursor-pointer my-1 ">
                        <Trash className="w-4 font-bold text-red-500" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
