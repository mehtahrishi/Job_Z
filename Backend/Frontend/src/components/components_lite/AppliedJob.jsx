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
import { Check, Loader2, X } from "lucide-react";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <Check className="text-green-500 animate-check" />; // Add animate-check
      case "pending":
        return <Loader2 className="text-yellow-500 animate-spin" />;
      case "rejected":
        return <X className="text-red-500 animate-x" />; // Add animate-x
      default:
        return null;
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader className="border-black border-y-2">
          <TableRow>
            <TableHead className="font-bold text-black">Date</TableHead>
            <TableHead className="font-bold text-black">Job Title</TableHead>
            <TableHead className="font-bold text-black">Company</TableHead>
            <TableHead className="text-right font-bold text-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You Have Not Applied Any Job Yet.</span>
          ) : (
            allAppliedJobs
              .filter((appliedJob) => appliedJob.job)
              .map((appliedJob) => (
                <TableRow key={appliedJob._id} className="border-none">
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company.name}</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    <Badge className="flex items-center bg-transparent hover:bg-transparent">
                      {renderStatusIcon(appliedJob?.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <Footer />
      <style jsx>{`
        .animate-spin {
          animation: spin 2s linear infinite;
        }

        .animate-check {
          animation: checkScale 1.5s ease-in-out infinite alternate;
        }

        .animate-x {
          animation: xScale 1.5s ease-in-out infinite alternate;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes checkScale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }

        @keyframes xScale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default AppliedJob;