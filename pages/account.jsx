import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import IconYandex from "@/components/icons/IconYandex";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Link from "next/link";
import axios from "axios";
import { AccountContext } from "@/components/AccountContext";




const Wrapper = styled.div`
  // display: flex;
  margin-top: 50px;


  padding: 10px;

  background-color: #fff;
  border-radius: 10px;
  width: 500px;



  text-align: center;
  justify-content: center;

  box-shadow: 0px 0px 5px #bbb;



  
`;

const WrapperMainForm = styled.div`
  padding-top: 50px;
  display: flex;
  gap: 50px;
`;


const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;



`;

const LinkReg = styled(Link)`
  matgin: 50px;
  text-decoration: none;
`;

const WhiteBoxSide = styled.div`
  background-color: #fff;
  padding: 20px;
  // text-align: center;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 240px;

  img{
    max-width: 100%;
    max-height: 100px;
  }

`;

const InputWrapper = styled.div`
  margin: 10px 25px;
`;

const Avatar = styled.div`
  display: table-cell;
  border-radius: 100%;
  width: 120px;
  height: 120px;

  text-align: center;
  vertical-align: middle;
  background-color: #eee;

  font-size: 3em;
  color: #ccc;

`;

const Name = styled.div`
  font-size: 2em;
`;

const WhiteBoxMain = styled.div`

  background-color: #fff;
  padding: 20px;
  // text-align: center;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 100%;
  
  font-size: 1.4em;

  


`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  text-align: center;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 100%;
  
  margin: 20px 0 ;

  box-shadow: 0px 0px 5px #bbb;

  font-size: .8em;

  

`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const CenterCenter = styled.div`
  display: flex;
  justify-content: center;
  


`;

const Title = styled.div`
  text-align: center;
  font-size: 1.2em;

`;

const ButtonDes = styled(Button)`
  margin: 5px 0;
`;




// const ButtonSign = styled(Button)`
//   background-color: #ccc;
// `;


// const { data: session } = useSession();
// const session = false;





export default function Account(){

  const {accountObj, setAccountObj, accountSession, setAccountSession, accountFI, setAccountFI, accountExit} = useContext(AccountContext);
  const [session, setSession] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clientAccountObj, setClientAccountObj] = useState({});
  
  const [FI, setFI] = useState("");




  useEffect(() => {
		
    CheckAccount(clientAccountObj);
    
 
	}, [clientAccountObj]) 

  


  async function SignInAccount(){

    axios.get('/api/clientAccount?email='+email).then(response => {
      setClientAccountObj(response.data);
    });
    
  }



  function CheckAccount(clientAccountObj){
    if(clientAccountObj.password === password){
      setAccountObj(clientAccountObj);
      setAccountSession(true);
      setAccountFI(clientAccountObj.name.substr(0,1) + clientAccountObj.surname.substr(0,1));
    }
  }
 
  function exit(){
    accountExit();
  }
 


  if(!accountSession){
    return (
      <>

        <Layout>
          <CenterCenter>
            <Wrapper>



                <Title>
                  Авторизация
                </Title>

                <InputWrapper>
                  <Input type="text" placeholder="Почта" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
                  <Input type="text" placeholder="Пароль" value={password} name="password" onChange={ev => setPassword(ev.target.value)}/>
                </InputWrapper>

                <ButtonWrapper>
                  <Button $primary onClick={SignInAccount}>
                    Войти
                  </Button>
                

                  
                  <LinkReg href={"/registration"} >
                    Регистрация
                  </LinkReg>

                </ButtonWrapper>




              
            

              {/* <ButtonSign onclick={() => signIn('yandex')} >
                <IconYandex/> 
                Авторизоваться
              </ButtonSign> */}
            


              

            </Wrapper>
          </CenterCenter>

        </Layout>
      </>
    );

  }

  return(
    <>
      <Layout>
        <Center>
          <WrapperMainForm>
            <WhiteBoxSide>

              <Avatar>
                {accountFI}
              </Avatar>


              <Name>
                {accountObj.name} <br /> {accountObj.surname}
              </Name>        


              <ButtonDes onClick>
                Изменить профиль  
              </ButtonDes >
             
              <ButtonDes onClick={exit}>
                Выйти  
              </ButtonDes>
              

            </WhiteBoxSide>
          

            <WhiteBoxMain>
              Мои данные

              <Row>
                <WhiteBox>
                  Мои заказы
                </WhiteBox>
                <WhiteBox>
                  Мои отзывы
                </WhiteBox>
                <WhiteBox>
                  Мои баллы
                </WhiteBox>
              </Row>

              Сервис и помощь

              <Row>
                <WhiteBox>
                  Как оплатить товар
                </WhiteBox>
                <WhiteBox>
                  Как отменить заказ
                </WhiteBox>
              </Row>



            </WhiteBoxMain>
          
          
          </WrapperMainForm>
        </Center>

      </Layout>


      
    
    </>
  );

}