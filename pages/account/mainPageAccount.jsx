import Center from "@/components/Center";
import Header from "@/components/Header";
import styled, { css } from "styled-components";
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


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";



const StyledGridCss = css`
  display: grid;
  grid-template-columns: 1fr ;
  
  
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr  ;

	}
  
  
`;

const StyledGrid = styled.div`
   ${StyledGridCss}
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: #677586;
  font-size: .7em;

`;
const Value = styled.div`
  // color: #677586;
  font-size: .8em;

`;

const InputWrapper = styled.div`
  margin: 10px 25px;
`;

const ButtonDes = styled(Button)`
  margin: 5px 0;
`;

const ButtonSave = styled(Button)`
  margin: 5px 0;
  background-color: #0d3d28;
  color: #fff;
`;


// const ButtonSign = styled(Button)`
//   background-color: #ccc;
// `;


// const { data: session } = useSession();
// const session = false;





export default function Account(){

  const {accountObj, setAccountObj, accountSession, setAccountSession, accountFI, accountExit} = useContext(AccountContext);
  const [session, setSession] = useState(false);

  const [editedProfile, setEditedProfile] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  
  
  
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editPhone, setEditPhone] = useState("");


  // const [dateOfBirth, setDateOfBirth] = useState(dayjs('2022-04-17'));
  
  const [passwordMatching, setPasswordMatching] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  

  const [clientAccountObj, setClientAccountObj] = useState({});
  
  const [FI, setFI] = useState("");


  useEffect(() => {
    setSurname(accountObj.surname);
    setName(accountObj.name);
    setEmail(accountObj.email);
    setPhone(accountObj.phone);
    
  },[accountObj])


  useEffect(() => {
    CheckAccount(clientAccountObj);
	}, [clientAccountObj]) 

  function changePhoneValue(value){
    if (onlyDigits(value))
      setEditPhone(value);
  }

  function onlyDigits(value){
    if(value.length === 0){
      return true;
    }
    return "1234567890".indexOf(value.substr(value.length - 1)) !== -1
  }
  
  async function saveProfile(){

    console.log("ssssssssssssssssssssss");
    console.log(accountObj);
    console.log(accountObj._id);



    const data = {
      _id: accountObj._id, email: editEmail, phone: editPhone,  surname: editSurname, 
      name: editName , password : accountObj.password, 
    };

    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");


    console.log(data);
    
    
    //update
    await axios.put('/api/clientAccount', data);
    
    axios.get('/api/clientAccount?_id='+accountObj._id).then(response => {
      setAccountObj(response.data);
    });

  
    console.log(accountObj);
    setEditedProfile(false);
  }

  function startEdit(){

    setEditPhone(phone);
    setEditSurname(surname);
    setEditName(name);
    // setEditPassword(password);
    setEditEmail(email);


    setEditedProfile(!editedProfile)
  }

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
        
        <Top>
          <div>
            Учетные данные 
          </div>

          <ButtonDes onClick={() => startEdit()}>
            Изменить профиль  
          </ButtonDes >

        </Top>


        { editedProfile &&
          <>

            <StyledGrid>

              <div>
                <Title>
                  ФИО
                </Title>
                <Value>
                  <Input type="text" maxlength="100" placeholder="Фамилия" value={editSurname} name="Surname" onChange={ev => setEditSurname(ev.target.value)}/>
                  <Input type="text" maxlength="100" placeholder="Имя" value={editName} name="Name" onChange={ev => setEditName(ev.target.value)}/>
                </Value>
              </div>

              {/* <div>
                <Title>
                  Дата рождения
                </Title>
                <Value>
                  {dateOfBirth} 

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                       
                      value={dateOfBirth}
                      onChange={(newValue) => setDateOfBirth(newValue)}

                      />
                  </LocalizationProvider>


                </Value>

              </div> */}

              <div>
                <Title>
                  Телефон
                </Title>
                <Value>
                  <Input type="text" maxlength="11" placeholder="Телефон" value={editPhone} name="phone" onChange={ev => changePhoneValue(ev.target.value)}/>

                </Value>
              </div>

              <div>
                <Title>
                  Почта
                </Title>
                <Value>
                  <Input type="text" maxlength="100" placeholder="Почта" value={editEmail} name="email" onChange={ev => setEditEmail(ev.target.value)}/>

                </Value>
              </div>

              {/* <div>
                <Title>
                  Пароль
                </Title>
                <Value>
                  <Input type="text" placeholder="Пароль" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
                  <Input type="text" placeholder="Повторите пароль" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>

                </Value>
              </div> */}

            </StyledGrid>


            
            <ButtonSave onClick={() => saveProfile()}  >
                Сохранить               
            </ButtonSave>
          

          </>
         
          ||

            <StyledGrid>

            <div>
              <Title>
                ФИО
              </Title>
              <Value>
                {surname} {name}
              </Value>
            </div>

            {/* <div>
              <Title>
                Дата рождения
              </Title>
              <Value>
                {dateOfBirth} 
              </Value>
            
            </div> */}
            
            <div>
              <Title>
                Телефон
              </Title>
              <Value>
                {phone} 
              </Value>
            </div>
            
            <div>
              <Title>
                Почта
              </Title>
              <Value>
                {email} 
              </Value>
            </div>
            

          </StyledGrid>
        }


      </AccountLayout>


      
    
    </>
  );

}