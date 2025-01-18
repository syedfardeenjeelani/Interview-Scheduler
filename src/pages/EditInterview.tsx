import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #218838;
  }
`;

const EditInterview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { interviews, updateInterview } = useInterviewStore();
  const [formData, setFormData] = useState<Interview | null>(null);

  useEffect(() => {
    const interview = interviews.find((i) => i.id === id);
    if (interview) {
      setFormData(interview);
    } else {
      toast.error("Interview not found");
      navigate("/");
    }
  }, [id, interviews, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Check for conflicts
      const conflict = interviews.some(
        (interview) =>
          interview.id !== id &&
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

      updateInterview(id!, formData);
      toast.success("Interview updated successfully");
      navigate("/");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Edit Interview</h2>
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
      <Button type="submit">Update Interview</Button>
    </FormContainer>
  );
};

export default EditInterview;
