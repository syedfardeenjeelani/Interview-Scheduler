import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInterviewStore, Interview } from "../store";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const ScheduleInterview: React.FC = () => {
  const navigate = useNavigate();
  const { interviews, addInterview } = useInterviewStore();
  const [formData, setFormData] = useState<Omit<Interview, "id">>({
    candidateName: "",
    interviewerName: "",
    date: "",
    time: "",
    type: "Technical",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for conflicts
    const conflict = interviews.some(
      (interview) =>
        interview.date === formData.date &&
        interview.time === formData.time &&
        (interview.interviewerName === formData.interviewerName ||
          interview.candidateName === formData.candidateName)
    );

    if (conflict) {
      toast.error(
        "There is a scheduling conflict. Please choose a different time or date."
      );
      return;
    }

    const newInterview: Interview = {
      ...formData,
      id: Date.now().toString(),
    };

    addInterview(newInterview);
    toast.success("Interview scheduled successfully");
    navigate("/");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Schedule New Interview</h2>
      <Input
        type="text"
        name="candidateName"
        value={formData.candidateName}
        onChange={handleChange}
        placeholder="Candidate Name"
        required
      />
      <Input
        type="text"
        name="interviewerName"
        value={formData.interviewerName}
        onChange={handleChange}
        placeholder="Interviewer Name"
        required
      />
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <Input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <Select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="Technical">Technical</option>
        <option value="HR">HR</option>
        <option value="Behavioral">Behavioral</option>
      </Select>
      <Button type="submit">Schedule Interview</Button>
    </FormContainer>
  );
};

export default ScheduleInterview;
