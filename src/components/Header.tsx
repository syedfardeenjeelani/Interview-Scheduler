import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1 className="font-bold text-2xl text-blue-700 hover:underline">
        Interview Scheduler
      </h1>
      <Nav>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/schedule">Schedule Interview</StyledLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
