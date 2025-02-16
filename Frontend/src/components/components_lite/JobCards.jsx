import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const JobCards = ({job}) => {
  console.log(job);
  const navigate = useNavigate();
 
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-transparent border border-black cursor-pointer hover:shadow-2xl hover:shadow-black hover:p-3 max-h-full">
      <div className="flex items-center gap-2 my-2">
             <Button className="p-6 bg-transparent border border-transparent hover:bg-transparent hover:border-black" variant="default" size="icon">
               <Avatar>
                 <AvatarImage src={job?.company?.logo} />
               </Avatar>
             </Button>
             <div>
               <h1 className="font-medium text-lg">{job?.company?.name}</h1>
               <p className="text-sm text-black font-bold">India</p>
             </div>
           </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job.title}</h2>
        <p className="text-sm text-black">
          {
            job.description
          }
        </p>
      </div>
      <div className=" flex gap-2 items-center mt-4 ">
        <Badge className={" text-[#6B3AC2] font-bold border-black"} variant={"ghost"}>
          {job.position} Open Positions
        </Badge>
        <Badge className={" text-[#FA4F09] font-bold border-black "} variant={"ghost"}>
          {job.salary}LPA
        </Badge>
        <Badge className={" text-[#6B3AC2]  font-bold border-black"} variant={"ghost"}>
          {job.location}
        </Badge>
        <Badge className={" text-[#FA4F09] font-bold border-black"} variant={"ghost"}>
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
