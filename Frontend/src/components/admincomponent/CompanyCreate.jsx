import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex flex-col">
  <Navbar />
  <div className="max-w-4xl mx-auto my-10 p-10 border border-black  bg-transparent shadow-sm hover:shadow-xl hover:shadow-[#6b3ac2] rounded-lg">
    <div className="my-5 mx-44">
    <h1 className="text-center my-4 font-bold text-black">Enter Company Details Carefully</h1>   
    </div>

    <Label>Company Name</Label>
    <Input
      type="text"
      placeholder="Company Name"
      className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-[#fa4f09] border-black"
      onChange={(e) => setCompanyName(e.target.value)}
    />

    <div className="flex items-center gap-2 my-10">
      <Button
        variant="outline"
        onClick={() => navigate("/admin/companies")}
        className="bg-transparent border-black hover:bg-[#fa4f09]"
      >
        Cancel
      </Button>
      <Button onClick={registerNewCompany}>Continue</Button>
    </div>
  </div>
</div>

  );
};

export default CompanyCreate;
