import styled from "styled-components";
import Button from "../Button";


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

const ButtonDes = styled(Button)`
  margin: 5px 0;
`;



export default function SideAccountMenu(accountFI, ) {


  function startEdit(){
    setEdit(true);
    setEditedEmail(email);
    setEditedSurname(clientAccountObj.surname);
    setEditedName(clientAccountObj.name);
  }

  function exit(){
    accountExit();
  }


  return(
    <>
      <WhiteBoxSide>

        <Avatar>
          {accountFI}
        </Avatar>


        <Name>
          {accountObj.name} <br /> {accountObj.surname}
        </Name>        


        <ButtonDes onClick={() => startEdit()}>
          Изменить профиль  
        </ButtonDes >

        <ButtonDes onClick={() => exit()}>
          Выйти  
        </ButtonDes>


      </WhiteBoxSide>
  
    </>
   

  );
}
