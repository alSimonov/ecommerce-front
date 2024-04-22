import styled from "styled-components";


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

export default function MainAccountPage() {



  return(
    <>
    
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
  
    </>
   

  );
}
