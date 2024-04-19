import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import IconYandex from "@/components/icons/IconYandex";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Link from "next/link";
import axios from "axios";




const Wrapper = styled.div`
  // display: flex;
  margin-top: 50px;

  padding: 10px;

  background-color: #fff;
  border-radius: 10px;
  width: 500px;

  text-align: center;

  box-shadow: 0px 0px 5px #bbb;


  
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


const InputWrapper = styled.div`
  margin: 10px 25px;
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

const WarningText = styled.div`
  text-align: left;
  font-size: .8em;
  color: red;
`;




// const ButtonSign = styled(Button)`
//   background-color: #ccc;
// `;


// const { data: session } = useSession();
const session = false;






export default function Registraion(){

  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  
  const [passwordMatching, setPasswordMatching] = useState(true);



  async function SignUpAccount(){

    if(passwordFirst === passwordSecond){

      setPasswordMatching(true);

      const response = await axios.post('/api/clientAccount', {
        email, surname, name, password: passwordFirst
      });
      if(response.data.url){
        window.location = "/account";
      }
    }
    else{
      setPasswordMatching(false);
    }

  
  }


  return(
    <>

    <Layout>
      <CenterCenter>
        <Wrapper>



            <Title>
              Регистрация
            </Title>

            <InputWrapper>
              <Input type="text" placeholder="Почта" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
              <Input type="text" placeholder="Фамилия" value={surname} name="Surname" onChange={ev => setSurname(ev.target.value)}/>
              <Input type="text" placeholder="Имя" value={name} name="Name" onChange={ev => setName(ev.target.value)}/>
              <Input type="text" placeholder="Пароль" value={passwordFirst} name="password" onChange={ev => setPasswordFirst(ev.target.value)}/>
              
              { !passwordMatching &&
                  <WarningText> 
                    *Пароли не совпадают
                  </WarningText>
                  
              }
              <Input type="text" placeholder="Пароль" value={passwordSecond} name="password" onChange={ev => setPasswordSecond(ev.target.value)}/>
             
            </InputWrapper>


            <ButtonWrapper>

              <Button $primary onClick={SignUpAccount}>
                Зарегистрироваться
              </Button>
            
              <LinkReg href={"/account"} >
                Авторизация
              </LinkReg>

            </ButtonWrapper>

        </Wrapper>
      </CenterCenter>
    </Layout>
  </>
  );

}