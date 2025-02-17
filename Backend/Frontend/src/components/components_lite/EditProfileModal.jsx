import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  // Fetch updated user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/profile`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.split(",").map((skill) => skill.trim()));

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Update Redux state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[500px] bg-[url('/bg.jpg')] bg-cover bg-center"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Edit Profile Carefully</DialogTitle>
        </DialogHeader>
        {/* Form for editing profile */}
        <form onSubmit={handleFileChange}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <input
                type="text"
                id="fullname"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <input
                type="email"
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <input
                type="tel"
                id="phoneNumber"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <input
                type="text"
                id="bio"
                value={input.bio}
                name="bio"
                onChange={changeEventHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent"
              />
            </div>
            {/* Resume file upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 border border-black rounded-md p-2 shadow hover:shadow-[#fa4f09] bg-transparent cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 hover:bg-[#6b3ac2]">
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
