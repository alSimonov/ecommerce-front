import { useSession, signIn, signOut } from "next-auth/react";
import IconYandex from "./Icons/IconYandex";
import Header from "./Header";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import Footer from "./Footer";
  


const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  gap: 50px;
`;


const ButtonSign = styled(Button)`
  background-color: #ccc;
`;

const WraperBody = styled.div`
  min-height: 85vh;
`;




export default function Layout({children}) {

  return (

    <div >
      <Header /> 
      <WraperBody>
        {children}
      </WraperBody>   
      <Footer/>
    </div>


  )
}
