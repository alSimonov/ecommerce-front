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




export default function MyOrders(){

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
        Мои заказы


          <Table >
            <Thead>
              <TrTh>
                <Th>Дата</Th>
                <Th>Оплата</Th>
                <Th>Адрес доставки</Th>
                <Th>Товары</Th>
                <Th></Th>
              </TrTh>
            </Thead>
            <tbody>
              {orders.length > 0 && orders.map(ord => (
                <tr key={ord._id}>
                  <Td>{(new Date(ord.createdAt)).toLocaleString()}</Td>
                  <Td>{ord.paid? "YES" : "NO"}</Td>
                  <Td>
                    {/* {ord.name} {ord.email}<br/> */}
                    {ord.country} г.{ord.city} ул.{ord.streetAddress}, {ord.postalCode} <br/> 
                    
                  </Td>
                  <Td>

                    {ord.line_items.map(l => (
                      <>
                        {l.price_data?.product_data?.name} x {l.quantity}<br/>                    
                      </>
                    ))}

                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>


        


      

      </AccountLayout>
    </>
  );
}

