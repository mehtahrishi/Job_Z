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

import { ChevronDown, Edit2, MoreHorizontal ,ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
                  <PopoverContent className="w-64 text-white font-medium bg-black p-3 border  shadow-md">
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
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-25 text-white font-semibold bg-black">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4 font-bold text-[#6b3ac2]" />
                      <span>Edit</span>
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