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

  const { data: session } = useSession();
  if(!session){
    return (
      <>
        <Header/>
        <Center>
          <Wrapper>

            Авторизация

            <ButtonSign onClick={() => signIn('yandex')} >
              <IconYandex/> 
              Авторизоваться
            </ButtonSign>
          
          </Wrapper>
        </Center>
      </>
    );

  }

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
