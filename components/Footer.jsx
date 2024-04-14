import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";


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
`;

export default function Footer() {



  return(
    <StyledHeader>
      <Center>
        
      <Wraper   >
        © 2020 Copyright: 
        <NavLink  href='https://github.com/alSimonov'>
          AlSimonov
        </NavLink>
      </Wraper>
        
      </Center>
    </StyledHeader>
  );
}
