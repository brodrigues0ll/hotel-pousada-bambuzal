import React from 'react';
import styled from 'styled-components';

const Button = ({ title, onClick }) => {
  return (
    <StyledButton
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: #eb5422c8;
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  padding: 8px 50px;
  font-weight: 100;
  font-size: 1.5rem;
  :hover {
    background-color: #eb5422;
  }

  @media screen and (max-width: 1920px){
     /*styles here*/ 
  }

  @media screen and (max-width: 1440px){ 
    /*styles here*/
  }

  @media screen and (max-width: 1200px){ 
    /*styles here*/ 
  }

  @media screen and (max-width: 1024px){ 
      /*styles here*/
    
  }


  @media screen and (max-width: 992px){
     /*styles here*/
  }

  @media screen and (max-width: 768px){
     /*styles here*/
  }

  @media screen and (max-width: 576px){ 
    /*styles here*/ 
  }

  @media screen and (max-width: 480px){
     /*styles here*/ 
  }
  
  @media screen and (max-width: 320px){
     /*styles here*/ 

  }
 
`;
