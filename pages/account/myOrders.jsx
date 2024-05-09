import { AccountContext } from "@/components/AccountContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AccountLayout from "@/components/account/AccountLayout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
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
  text-align: center;
`;
const Td = styled.td`
  font-size: .7em;
  
  ${props => props.$green && css`
    color: #16a34a;
  `};
  ${props => props.$red && css`
    color: #dc2625;
  `};

`;

const ButtonCancel = styled(Button)`
  margin-left: 10px;
  background-color: #fecaca;
  color: #de255c;
`;

const StyledSelect = styled.select`
  width: 200px;
  padding: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  border: 1px solid #ccc; 
  border-radius: 5px;
  box-sizing: border-box;

`;

const SortRow = styled.div`
  display: flex;
  font-size: .8em;
`;




export default function MyOrders(){

  const {accountObj} = useContext(AccountContext);


  const [orders, setOrders] = useState([]);

  const [editedAddress, setEditedAddress] = useState(null);
  
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');


  const [title, setSearchTitle] = useState("");
  const [selectedSort, setSelectedSort] = useState("date");
  const [selectedSortVect, setSelectedSortVect] = useState("-1");


 
  useEffect(() => {
    fetchOrders();
  },[selectedSort])

  useEffect(() => {
    fetchOrders();
  },[selectedSortVect])



  useEffect(() => {
    fetchOrders();

  },[]);


  function fetchOrders(){
    axios.get('/api/orders?email='+accountObj.email+'&sort='+selectedSort+'&sortVect='+selectedSortVect).then(response => {
      setOrders(response.data);
    });
  }



  return (
    <>
      <AccountLayout>
        Мои заказы

          {/* <Input type="text" placeholder="Поиск" value={title} name="searchTitle" onChange={ev => setSearchTitle(ev.target.value)}/> */}
          <SortRow>
            <div>
              Сортировать по 
            </div>
            <StyledSelect 
              value={selectedSort}
              onChange={ev => setSelectedSort(ev.target.value)}
            >
              <option value="date">дате</option>
              <option value="paid">оплате</option>
              <option value="clientInfo">заказчику</option>
              <option value="statusOrder">статусу</option>
            </StyledSelect>
            <StyledSelect 
              value={selectedSortVect}
              onChange={ev => setSelectedSortVect(ev.target.value)}
            >
              <option value="-1">по убыванию</option>
              <option value="1">по возростанию</option> 
            </StyledSelect>
          </SortRow>


          <Table >
            <Thead>
              <TrTh>
                <Th>Дата</Th>
                <Th>Оплата</Th>
                <Th>Адрес доставки</Th>
                <Th>Товары</Th>
                <Th>Статус</Th>
                <Th></Th>
              </TrTh>
            </Thead>
            <tbody>
              {orders.length > 0 && orders.map(order => (
                <tr key={order._id}>
                  <Td>{(new Date(order.createdAt)).toLocaleString()}</Td>

                  {order.paid &&  
                    <Td $green >ДА</Td>
                   ||
                    <Td $red >НЕТ</Td>
                  }

                  <Td>
                    {order.postalCode}, {order.country} г.{order.city} ул.{order.streetAddress} д. {order.houseNumber}  <br/>                     
                  </Td>
                  <Td>

                    {order.line_items.map(l => (
                      <>
                        {l.price_data?.product_data?.name} | {l.quantity}шт. | ₽{(l.price_data?.unit_amount / 100) * l.quantity} <br/>                    
                      </>
                     ))}

                  </Td>

                  <Td>
                    {order.statusOrder}
                  </Td>


                </tr>
              ))}
            </tbody>
          </Table>


        


      

      </AccountLayout>
    </>
  );
}

