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
import AccountLayout from "@/components/account/AccountLayout";




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

  const {accountObj, setAccountObj, accountSession, setAccountSession, accountFI, accountExit} = useContext(AccountContext);
  const [session, setSession] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  
  const [passwordMatching, setPasswordMatching] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  

  const [clientAccountObj, setClientAccountObj] = useState({});
  
  const [FI, setFI] = useState("");


  // useEffect(() => {
    
  // },[])


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
    }
  }
 
  function exit(){
    accountExit();
  }
 



  return(
    <>
      <AccountLayout>
        
        Мои данные

        <InputWrapper>
          <Input type="text" placeholder="Почта" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
          <Input type="text" placeholder="Фамилия" value={surname} name="Surname" onChange={ev => setSurname(ev.target.value)}/>
          <Input type="text" placeholder="Имя" value={name} name="Name" onChange={ev => setName(ev.target.value)}/>

          
          {/* { !passwordMatching &&
              <WarningText> 
                *Пароли не совпадают
              </WarningText>
              
          }
          <Input type="text" placeholder="Пароль" value={passwordSecond} name="password" onChange={ev => setPasswordSecond(ev.target.value)}/>
        */}
        </InputWrapper>
        
      </AccountLayout>


      
    
    </>
  );

}