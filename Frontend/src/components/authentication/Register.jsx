import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-[#FA4F09]">
            Register Yourself 
          </h1>
          <div className="my-2">
            <Label>Full Name -</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="border-black"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email ID -</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              className="border-black"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password -</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="border-black"
            ></Input>
          </div>
          <div className="my-2">
         <Label>PAN Card Number -</Label>
            <Input
              type="text"
              value={input.pancard}
              name="pancard"
              onChange={changeEventHandler}
              placeholder="ABCDE1234G"
              className="border-black"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Aadhar Card Number -</Label>
            <Input
              type="text"
              value={input.adharcard}
              name="adharcard"
              onChange={changeEventHandler}
              placeholder="123456789012"
              className="border-black"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Contact Number -</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91 9876543210"
              className="border-black"
            ></Input>
          </div>
          <div className="flex items-center justify-between my-2">
            <RadioGroup className="flex items-center gap-4 ">
                          <Label>Your Role -</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">JobSeeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Label>Profile Photo -</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={ChangeFilehandler}
              className="cursor-pointer border-black"
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-1/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-[#FA4F09] hover:bg-[#6B3AC2] rounded-md"
            >
              Register
            </button>
          )}

          <p className="text-black font-semibold text-md my-2 flex items-center justify-center">
           Already have an account?{" "}
            <Link to="/login" className="text-[#6B3AC2] font-semibold ">
            &nbsp; Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
