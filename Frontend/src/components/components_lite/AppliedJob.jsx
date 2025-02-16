import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader  className="border-black border-y-2">
          <TableRow>
            <TableHead className="font-bold text-black">Date</TableHead>
            <TableHead className="font-bold text-black">Job Title</TableHead>
            <TableHead className="font-bold text-black">Company</TableHead>
            <TableHead className="text-right font-bold text-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You Have Not Applied Any Job Yet. </span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="border-none">
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-800 hover:bg-red-500" 
                        : appliedJob?.status === "accepted"
                        ? "bg-blue-800 hover:bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {" "}
                    {appliedJob?.status}
                  </Badge>{" "}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      < Footer/>
    </div>
   
  );
};

export default AppliedJob;
