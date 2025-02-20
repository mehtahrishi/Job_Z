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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, ExternalLink, Info, BookOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently applied users</TableCaption>
        <TableHeader  className="border-black border-y-2">
          <TableRow >
            <TableHead className="font-bold text-black">Full Name</TableHead>
            <TableHead className="font-bold text-black">Bio</TableHead>
            <TableHead className="font-bold text-black">Skills</TableHead>
            <TableHead className="font-bold text-black">Email</TableHead>
            <TableHead className="font-bold text-black">Contact</TableHead>
            <TableHead className="font-bold text-black">Resume</TableHead>
            <TableHead className="font-bold text-black">Date Applied</TableHead>
            <TableHead className="text-right font-bold text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id} className="hover:bg-neutral-200 border-b-transparent">
              
              {/* Full Name */}
              <TableCell>{item?.applicant?.fullname}</TableCell>

              {/* Bio with Popover */}
              <TableCell>
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <Info className="w-5 h-5 text-black  hover:text-[#6b3ac2]" />
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-black border border-black p-2">
                    <p className="text-sm font-medium text-white">
                      {item?.applicant?.profile?.bio || "No bio available"}
                    </p>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/* Skills with Popover */}
              <TableCell>
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <BookOpen className="w-5 h-5 text-black hover:text-[#6b3ac2]" />
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-black border border-black p-2">
                    <p className="text-sm font-medium text-white">
                      {item?.applicant?.profile?.skills?.join(", ") || "No skills available"}
                    </p>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/* Email */}
              <TableCell>{item?.applicant?.email}</TableCell>

              {/* Contact */}
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>

              {/* Resume */}
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-black cursor-pointer"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 text-black hover:text-[#6b3ac2]" />
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>

              {/* Date Applied */}
              <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>

              {/* Actions */}
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-black text-white p-2">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex items-center my-2 cursor-pointer"
                      >
                        <input type="radio" name={`shortlistingStatus-${item?._id}`} value={status} className="mr-2" />
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
