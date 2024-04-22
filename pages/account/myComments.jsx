import { AccountContext } from "@/components/AccountContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AccountLayout from "@/components/account/AccountLayout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { withSwal } from 'react-sweetalert2';
import CommentsGrid from "@/components/product/CommentsGrid";




const InputWrapper = styled.div`
  margin: 10px 25px;
`;

const Table = styled.table`
  margin: 20px 0px;
  width: 100%;

`;

const Thead = styled.thead`
  
 
`;
const TrTh = styled.tr`
  

  
`;
const Th = styled.td`

  color: #4b5563;
  font-size: .7em;
  text-transform: uppercase;
`;
const Td = styled.td`
  font-size: .7em;
  
`;

const ButtonCancel = styled(Button)`
  margin-left: 10px;
  background-color: #fecaca;
  color: #de255c;
`;




export default function MyComments(){

  const {accountObj} = useContext(AccountContext);


  const [orders, setOrders] = useState([]);

  const [editedAddress, setEditedAddress] = useState(null);
  
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');


  useEffect(() => {
    fetchOrders();

  },[]);


  function fetchOrders(){
    axios.get('/api/orders?email='+accountObj.email).then(response => {
      setOrders(response.data);
		});
  }


  



  return (
    <>
      <AccountLayout>
        Мои отзывы



        <CommentsGrid />

        


      

      </AccountLayout>
    </>
  );
}

