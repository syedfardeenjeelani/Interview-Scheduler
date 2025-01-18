import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useInterviewStore, Interview } from "../store";
import { toast } from "react-toastify";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InterviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const InterviewItem = styled.li`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: #000;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: #fff;
`;

const Dashboard: React.FC = () => {
  const { interviews, deleteInterview } = useInterviewStore();
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      deleteInterview(id);
      toast.success("Interview deleted successfully");
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const dateMatch = interview.date.includes(dateFilter);
    const nameMatch =
      interview.candidateName
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) ||
      interview.interviewerName
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
    return dateMatch && nameMatch;
  });

  return (
    <DashboardContainer>
      <h2>Interview Dashboard</h2>
      <FilterContainer>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by date"
        />
        <Input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Filter by name"
        />
      </FilterContainer>
      <InterviewList>
        {filteredInterviews.map((interview) => (
          <InterviewItem key={interview.id}>
            <div>
              <strong>{interview.candidateName}</strong> with{" "}
              {interview.interviewerName}
              <br />
              {interview.date} at {interview.time} - {interview.type} Interview
            </div>
            <ButtonGroup>
              <Link to={`/edit/${interview.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
              <DeleteButton onClick={() => handleDelete(interview.id)}>
                Delete
              </DeleteButton>
            </ButtonGroup>
          </InterviewItem>
        ))}
      </InterviewList>
    </DashboardContainer>
  );
};

export default Dashboard;
