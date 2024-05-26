import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
// import IconYandex from "@/components/icons/IconYandex";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Link from "next/link";
import axios from "axios";
// import bcrypt from "bcrypt";




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

const WarningWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

const WarningLabel = styled.label`
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

  const [warningSurname, setWarningSurname] = useState(false);
  const [warningName, setWarningName] = useState(false);
  const [warningEmailExist, setWarningEmailExist] = useState(false);
  const [warningEmail, setWarningEmail] = useState(false);
  const [warningPassword, setWarningPassword] = useState(false);


  const [clientAccountObj, setClientAccountObj] = useState("fff");

  const emailTrust = ["@mail.ru", "@gmail.com" ,"@yandex.ru", "@example.com", "@example2.com"];



  const crypto = require('crypto');


  useEffect(() => {
    if(clientAccountObj){
      setWarningEmailExist(true);
    } else if (!clientAccountObj) {
      console.log("cccccccccccccccccccc");
      console.log(clientAccountObj);
      setWarningEmailExist(false);
      createAccount();
    }
  },[clientAccountObj])

  async function createAccount(){
    var passwordHash = crypto.createHash('sha1')
    .update(passwordFirst).digest('hex');

    const response = await axios.post('/api/clientAccount', {
      email, surname, name, password: passwordHash
    });
    
    if(response.data){
      window.location = "/account/mainPageAccount";
    }
  }
  
  function noDigits(value){
    if(value.length === 0){
      return true;
    }
    return "1234567890".indexOf(value.substr(value.length - 1)) == -1
  }

  function changeSurname(value) {
    if (noDigits(value))
     setSurname(value);
  }
  function changeName(value) {
    if (noDigits(value))
     setName(value);
  }

  function changeEmail(value) {

    checkEmailServer(value);
  
    setEmail(value);  
  }
  
  function checkEmailServer(value){
    setWarningEmail(true);


    for (var i = 0; i < emailTrust.length; i++){
      if ( value.endsWith(emailTrust[i]) ) {
        setWarningEmail(false);
        break;
      }
    }
  
  }


  async function SignUpAccount(){

    if(warningSurname === ""){
      setWarningSurname(true);
      return;
    } else setWarningSurname(false);
    if(warningName === ""){
      setWarningName(true);
      return;
    } else setWarningName(false);
   
    checkEmailServer(email);

    if(warningEmail){
      return
    }

    if(passwordFirst === "" && passwordSecond === ""){
      setWarningPassword(true);
      return;
    }
    else{
      setWarningPassword(false);
    }

    if(passwordFirst === passwordSecond){

      setPasswordMatching(true);


      await axios.get('/api/clientAccount?email='+email).then(response => {
        setClientAccountObj(response.data);
      });

     
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
              {/* <Input type="text" placeholder="Почта" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/> */}
             
              <WarningWrapper>
                {warningEmail&&
                  <WarningLabel>*Сервер почты не опознан</WarningLabel> 
                }
              </WarningWrapper>
              <WarningWrapper>
                {warningEmailExist&&
                  <WarningLabel>*Эта почта уже зарегистрирована</WarningLabel> 
                }
              </WarningWrapper>
              <Input type="text" placeholder="Почта" value={email} name="email" onChange={ev => changeEmail(ev.target.value)}/>
            

              <WarningWrapper>
                {warningSurname &&
                  <WarningLabel>*Укажите вашу фамилию</WarningLabel> 
                }
              </WarningWrapper>
              <Input type="text" placeholder="Фамилия" value={surname} name="Surname" onChange={ev => changeSurname(ev.target.value)}/>
              
              <WarningWrapper>
                {warningName &&
                  <WarningLabel>*Укажите ваше имя</WarningLabel> 
                } 
              </WarningWrapper>
              <Input type="text" placeholder="Имя" value={name} name="Name" onChange={ev => changeName(ev.target.value)}/>
             
              <WarningWrapper>
                {warningPassword &&
                  <WarningLabel>*Придумайте пароль</WarningLabel> 
                } 
              </WarningWrapper>
              <Input type="text" placeholder="Пароль" value={passwordFirst} name="password" onChange={ev => setPasswordFirst(ev.target.value)}/>
              
              <WarningWrapper>
                { !passwordMatching &&
                    <WarningText> 
                      *Пароли не совпадают
                    </WarningText>   
                }
              </WarningWrapper>
              <Input type="text" placeholder="Повторите пароль" value={passwordSecond} name="password" onChange={ev => setPasswordSecond(ev.target.value)}/>
             
            </InputWrapper>


            <ButtonWrapper>

              <Button $primary onClick={SignUpAccount}>
                Зарегистрироваться
              </Button>
            
              <LinkReg href={"/account/mainPageAccount"} >
                Авторизация
              </LinkReg>

            </ButtonWrapper>

        </Wrapper>
      </CenterCenter>
    </Layout>
  </>
  );

}