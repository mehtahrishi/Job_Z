import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; 
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-24">
        
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/logos/logo.png" alt="Logo" className="w-20 h-20 object-contain " />
          <h1 className="text-2xl font-bold">
            <span className="text-[#6B3AC2] font-extrabold">Job - </span>
            <span className="text-[#FA4F09] font-bold">Z</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"} className="font-extrabold hover:text-[#6B3AC2] transition-colors duration-200">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"} className="font-extrabold hover:text-[#fa4f09] transition-colors duration-200">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/Home"} className="font-extrabold hover:text-[#6B3AC2] transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/Browse"} className="font-extrabold hover:text-[#fa4f09] transition-colors duration-200">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to={"/Jobs"} className="font-extrabold hover:text-[#6B3AC2] transition-colors duration-200">
                    Jobs
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to={"/About"} className="font-extrabold  hover:text-[#fa4f09] transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to={"/Contact"} className="font-extrabold hover:text-[#6B3AC2] transition-colors duration-200">
               Contact
              </Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button className="bg-[#6b3ac2] hover:bg-[#fa4f09]">Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button className="bg-[#FA4F09] hover:bg-[#6B3AC2]">Register</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h3 className="text-white font-extrabold">{user?.fullname}</h3>
                    <p className="text-sm text-gray-200 font-semibold">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col my-2">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer ml-2">
                      <User2 className="text-white" />
                      <Button variant="link">
                        <Link to={"/Profile"} className="text-white">Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer ml-2">
                    <LogOut className="text-white" />
                    <Button onClick={logoutHandler} variant="link" className="text-white">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
