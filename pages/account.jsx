import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import IconYandex from "@/components/icons/IconYandex";
import Button from "@/components/Button";




const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  gap: 50px;
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


const ButtonSign = styled(Button)`
  background-color: #ccc;
`;


// const { data: session } = useSession();
const session = false;

export default function Account(){

  if(!session){
    return (
      <>
        <Header/>
        <Center>
          <Wrapper>

            Авторизация

            <ButtonSign onclick={() => signIn('yandex')} >
              <IconYandex/> 
              Авторизоваться
            </ButtonSign>
          
          </Wrapper>
        </Center>
      </>
    );

  }

  return(
    <>
      <Header/>

      <Center>
        <Wrapper>
          <WhiteBoxSide>

            <Avatar>
              ИФ
            </Avatar>


            <Name>
              Иван <br />Фролов
            </Name>        

            Изменить профиль

            Выйти  

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
        
        
        </Wrapper>
      </Center>

      
    
    </>
  );

}