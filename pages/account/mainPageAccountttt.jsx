import { AccountContext } from "@/components/AccountContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AccountLayout from "@/components/account/AccountLayout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { withSwal } from 'react-sweetalert2';


const InputWrapper = styled.div`
  margin: 10px 25px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
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


export default function MainAccountPage(){

  


  return (
    <>
      <AccountLayout>
        {/* Учетные данные 

        <div>
          
          <div>
            ФИО
          </div>
          <div>
            
          </div>
        </div> */}

        Мои данные

        <Row>
          <WhiteBox>
            Мои заказы
          </WhiteBox>
          <WhiteBox>
            Мои отзывы
          </WhiteBox>

          <WhiteBox>
            Адреса доставки
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




      </AccountLayout>
    </>
  );
}

