import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1px 10px;
  background-color: #d7d7d7;
  height: 40px;
  
`;
 
export default function Select(props){
  return <StyledSelect {...props}/>
}