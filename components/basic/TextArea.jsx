import styled, { css } from "styled-components"

const StyledTextArea = styled.textarea`
  width: 100%;
  // padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #fff; 
  border-radius: 5px;
  box-sizing: border-box;

  min-height: 50px;


`;

export default function TextArea(props){
  return <StyledTextArea {...props}/>
}