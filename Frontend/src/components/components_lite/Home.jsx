import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import FactsModal from "./FactsModal"; // Import the FactsModal component

const facts = [
  "Over 70% of job openings are not advertised.",
  "The average person changes jobs 12 times during their career.",
  "Companies with a strong employer brand receive 50% more qualified applicants.",
  "Remote work can increase productivity by up to 47%.",
  "Networking can help you find a job faster than applying online.",
  "The highest paying jobs are often in technology and healthcare.",
  "Soft skills are just as important as technical skills in the job market.",
  "Companies that prioritize employee well-being see a 21% increase in profitability.",
];

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.jobs.allJobs); // Access Redux state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    // Show the modal immediately on component mount
    const fact = facts[Math.floor(Math.random() * facts.length)];
    setRandomFact(fact);
    setModalOpen(true); // Open the modal

    // No need for an interval since we want it to show once and close after 7 seconds
    const timer = setTimeout(() => {
      setModalOpen(false); // Close the modal after 7 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <Navbar />
      <Header />
      <Categories />
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      <Footer />
      <FactsModal open={modalOpen} setOpen={setModalOpen} fact={randomFact} duration={7000} /> {/* Set duration to 7000ms */}
    </div>
  );
};

export default Home;
