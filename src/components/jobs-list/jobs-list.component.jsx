import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { Link } from "react-router-dom";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const jobsSnapshot = await getDocs(jobsCollection);
      const jobsData = jobsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Current Jobs:</h1>
      {currentUser ? (
        jobs.map((job) => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Pay: {job.pay}</p>
            <p>Duration: {job.duration}</p>
            <Link to={`/jobs/${job.id}/proposals`}>Send Proposal</Link>
            {/* display any other fields you need for your job form */}
          </div>
        ))
      ) : (
        <p>Please log in to view jobs.</p>
      )}
    </div>
  );
};

export default JobsList;
