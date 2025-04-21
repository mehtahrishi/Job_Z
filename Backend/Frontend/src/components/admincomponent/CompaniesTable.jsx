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
import { ChevronDown, Edit2, MoreHorizontal, ExternalLink, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data"; // Adjust the import based on your project structure

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  const deleteCompany = async (companyId) => {
    try {
      const response = await axios.delete(`${COMPANY_API_ENDPOINT}/delete/${companyId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        // Optionally, you can show a success message
        console.log("Company deleted successfully");
        // Refresh the companies list or remove the deleted company from the state
        setFilterCompany((prev) => prev.filter(company => company._id !== companyId));
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      // Optionally, show an error message
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Your Recent Registered Companies</TableCaption>
        <TableHeader className="border-black border-y-2">
          <TableRow>
            <TableHead className="font-bold text-black">Company Logo</TableHead>
            <TableHead className="font-bold text-black">Company Name</TableHead>
            <TableHead className="font-bold text-black">Location</TableHead>
            <TableHead className="font-bold text-black">Description</TableHead>
            <TableHead className="font-bold text-black">Website</TableHead>
            <TableHead className="font-bold text-black">Date</TableHead>
            <TableHead className="text-right font-bold text-black">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <span className="text-[#6b3ac2] my-5 flex font-semibold">No Companies Added</span>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company.id} className="border-none">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || "default-logo-url"} alt={`${company.name} logo`} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>

                {/* Description Popover */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <ChevronDown className="cursor-pointer text-black hover:text-[#6b3ac2]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-64 text-white font-medium bg-black p-3 border shadow-md">
                      {company.description}
                    </PopoverContent>
                  </Popover>
                </TableCell>

                <TableCell>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 text-black hover:text-[#6b3ac2]" />
                    </a>
                  )}
                </TableCell>

                <TableCell>{company.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal  className="w-5 h-5 text-black hover:text-[#6b3ac2]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-25 text-white font-semibold bg-black">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer my-1"
                      >
                        <Edit2 className="w-4 font-bold text-[#6b3ac2]" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => deleteCompany(company._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer my-1"
                      >
                        <Trash className="w-4 font-bold  text-red-500" />
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

export default CompaniesTable;
