import styled, { css } from "styled-components"

const StyledSelect = styled.select`
  width: 100%;
  // padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #fff; 
  border-radius: 5px;
  box-sizing: border-box;




`;

export default function Select(props){
  return <StyledSelect {...props}/>
}