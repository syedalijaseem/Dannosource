import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { useJobsContext } from "../../contexts/jobs.context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase/firebase.utils";
import { v4 } from "uuid";

const CreateJob = () => {
  const { currentUser } = useContext(UserContext);
  const { createJob } = useJobsContext();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    pay: "",
    duration: "",
  });

  const [uploading, setUploading] = useState(false);

  const uploadFile = async (files, jobId) => {
    if (files.length === 0) return;

    const userFolderRef = ref(storage, `users/${currentUser.uid}`);
    const jobFolderRef = ref(userFolderRef, jobId);
    const promises = [];

    Array.from(files).forEach((file) => {
      const fileRef = ref(jobFolderRef, `${file.name}_${v4()}`);
      promises.push(uploadBytes(fileRef, file));
    });

    try {
      await Promise.all(promises);
      console.log("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setUploading(true);
      const job = {
        ...jobData,
        userId: currentUser.uid,
        displayName: currentUser.displayName,
      };
      const jobId = await createJob(job);
      console.log("Job created successfully!");
      await uploadFile(event.target.elements.images.files, jobId); // Pass jobId here
      setJobData({
        title: "",
        description: "",
        pay: "",
        duration: "",
      });
    } catch (error) {
      console.error("Error creating job", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={jobData.title}
        onChange={handleChange}
      />
      <input type="file" id="images" name="images" multiple />
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Job"}
      </button>
    </form>
  );
};

export default CreateJob;
