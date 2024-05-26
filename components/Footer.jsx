import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";
import Button from "./Button";
import IconHelp from "./icons/IconHelp";


const StyledHeader = styled.div`
  display: flex;
  background-color: #222;
  color: #fff;

  position: relative;

  margin-top: 20px;
  bottom: 0px;
  padding: 20px 0px;
  width: 100%;

`;

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #222;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const ButtonHelpWrap = styled.div`
  position: absolute;
`;

export default function Footer() {

  function openPdf() {
    var docLocation = 'https://res.cloudinary.com/dbzdjqnvx/raw/upload/v1715277655/documents/%D0%9F%D0%B0%D0%BC%D1%8F%D1%82%D0%BA%D0%B0_%D0%B4%D0%BB%D1%8F_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F_zy2vty.docx';
    window.open(docLocation,"resizeable,scrollbar"); 
  }

  return(
    <StyledHeader>
      <ButtonHelpWrap>
        <Button onClick={openPdf} $white size="icon"><IconHelp /> Помощь</Button>
      </ButtonHelpWrap>
      <Center>
        
      <Wraper   >
        © 2024 Copyright: 
        <NavLink  href='https://github.com/alSimonov'>
          AlSimonov
        </NavLink>
      </Wraper>
        
      </Center>
    </StyledHeader>
  );
}
