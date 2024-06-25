import React from "react";
import styled from "styled-components";
import Button from "../common/Button/button";

const BoxContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Header() {
  return (
    <header className="py-4">
      <div className="container text-center">
        <BoxContainer>
          <Button
			onClick={() => {
				window.location.href = "/Nav";
			  }}
            title="Nav →"
            titleColor="var(--primary-color)"
            backgroundColor="#ecf7ff"
            titleFontWeight={300}
          />
          <Button
            onClick={() => {
				window.location.href = "/Main";
			  }}	
            title="Main →"
            titleColor="var(--primary-color)"
            backgroundColor="#ecf7ff"
            titleFontWeight={300}
          />
          <Button
            onClick={() => {
				window.location.href = "/Trip";
			  }}	
            title="Trip →"
            titleColor="var(--primary-color)"
            backgroundColor="#ecf7ff"
            titleFontWeight={300}
          />
        </BoxContainer>
      </div>
    </header>
  );
}

export default Header;
