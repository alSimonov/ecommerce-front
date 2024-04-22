import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { Rating } from "@mui/material";
import axios from "axios";




const Wrapper = styled.div`
  // display: flex;
  margin-top: 10px;


  padding: 10px;

  background-color: #fff;
  border-radius: 10px;
  width: 500px;



  text-align: center;
  justify-content: center;

  box-shadow: 0px 0px 5px #bbb;



  
`;


const Avatar = styled.div`
  display: table-cell;
  border-radius: 100%;
  width: 40px;
  height: 40px;

  line-height: 40px;

  text-align: center;
  vertical-align: middle;
  background-color: #eee;

  font-size: 1em;
  color: #ccc;

`;

const RowTop = styled.div`
  display: flex;
  justify-content: justify;
  gap: 10px;
`;
const RowTopLeft = styled.div`
  display: flex;

  vertical-align: middle;
  line-height: 40px;


  gap: 10px;
`;
const RowTopRight = styled.div`
  display: flex;


  margin-left: auto;

  text-align: right;
  
  vertical-align: middle;
  line-height: 40px;


  gap: 10px;
`;
const RowMiddle = styled.div`
  text-align: left;  
  margin: 10px 0px;
`;
const RowBottom = styled.div`
  text-align: left;  
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 10px;

`;
const Question = styled.div`
  font-size: .9em;
  color: #4b5563;
`;

const PersonName = styled.div`
   font-size: 1.2em;
`;

export default function CommentBox({_id, productId, commentText, ratingValue, clientAccount, createdAt, updatedAt}) {

  const [accountFIAvatar, setAccountFIAvatar] = useState("ФИ");
  const [accountFI, setAccountFI] = useState("Фролов Илья");
  const [account, setAccount] = useState("");

  const [commentCreatedAt, setCommentCreatedAt] = useState(new Date().toLocaleDateString());
  // const [commentText, setCommentText] = useState("asdfzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxaaaaaaaaaaaaafa");
  
  
  useEffect(() => {
    axios.get('/api/clientAccount?id='+clientAccount).then(response => {
      setAccount(response.data);
    });
	}, []) 
  
  useEffect(() => {
    substrAccountFI();
  }, [account]) 
  
  function substrAccountFI(){
    setAccountFIAvatar(account[0]?.name?.substr(0,1) + account[0]?.surname?.substr(0,1));
    setAccountFI(account[0]?.name + " " + account[0]?.surname)
  }


  return (
    <>

      <Wrapper>


        <RowTop>

          <RowTopLeft>

            <Avatar>
              {accountFIAvatar}
            </Avatar> 
            <PersonName>
              {accountFI}
            </PersonName>

          </RowTopLeft>

          <RowTopRight>

            {createdAt}

            <Rating name="half-rating-read" value={ratingValue/10} precision={0.5} readOnly /> 


          </RowTopRight>

        </RowTop>

        <RowMiddle>
          {commentText} 
        </RowMiddle>

        <RowBottom>

          <Question>
            Вам помог этот отзыв?
          </Question>

          <ButtonRow>
            <Button>
              Да 
            </Button>
            <Button>
              Нет
            </Button>
          </ButtonRow>


        </RowBottom>



      </Wrapper>

    </>
  );
}