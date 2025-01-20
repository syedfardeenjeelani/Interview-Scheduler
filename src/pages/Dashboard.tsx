import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useInterviewStore } from "../store";
import { toast } from "react-toastify";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  p {
    color: #666;
    margin: 4px 0 0 0;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #eee;
  color: #666;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled(Button)`
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #dee2e6;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: #e9ecef;
  color: #495057;
`;

const Dashboard = () => {
  const { interviews, deleteInterview } = useInterviewStore();
  const [dateFilter, setDateFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this interview? This action cannot be undone."
      )
    ) {
      deleteInterview(id);
      toast.success("Interview deleted successfully");
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const dateMatch = interview.date.includes(dateFilter);
    const searchMatch =
      interview.candidateName
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      interview.interviewerName
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      interview.type.toLowerCase().includes(searchFilter.toLowerCase());
    return dateMatch && searchMatch;
  });

  return (
    <PageContainer>
      <Header>
        <HeaderText>
          <h1>Interview Dashboard</h1>
          <p>Manage and track your upcoming interviews</p>
        </HeaderText>
        <Link to="/new">
          <PrimaryButton>New Interview</PrimaryButton>
        </Link>
      </Header>

      <Card>
        <FilterContainer>
          <Input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by name or interview type..."
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </FilterContainer>

        <Table>
          <thead>
            <tr>
              <Th>Candidate</Th>
              <Th>Interviewer</Th>
              <Th>Date & Time</Th>
              <Th>Type</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredInterviews.map((interview) => (
              <tr key={interview.id}>
                <Td style={{ fontWeight: 500 }}>{interview.candidateName}</Td>
                <Td>{interview.interviewerName}</Td>
                <Td>
                  {interview.date} at {interview.time}
                </Td>
                <Td>
                  <Badge>{interview.type}</Badge>
                </Td>
                <Td>
                  <ButtonGroup>
                    <Link to={`/edit/${interview.id}`}>
                      <EditButton>Edit</EditButton>
                    </Link>
                    <DeleteButton onClick={() => handleDelete(interview.id)}>
                      Delete
                    </DeleteButton>
                  </ButtonGroup>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
