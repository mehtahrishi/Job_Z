import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

 
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">

      <Navbar />

      <div className="max-w-4xl mx-auto  border-2 border-black rounded-br-full my-5 p-8 hover:border-[#FA4F09]">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h1 className=" text-xl font-extrabold">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right bg-transparent border-black hover:bg-none"
            variant="outline"
          >
            <Pen  className="text-right font-bold text-black"/>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="font-bold text-black"/>
            <span className="font-bold text-black">
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="font-semibold text-black">
              <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </span>
          </div>
        </div>

        <div>
          <div className="my-5">
            <h1 className=" text-black mb-2 font-semibold" >Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-semibold mb-3"> Resume</label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  className="w-1/4 px-2 py-1 mb-10 text-right text-white bg-black hover:bg-[#FA4F09] rounded-md"
                >
                  Download
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-transparent rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
