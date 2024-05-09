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
  font-size: .8em;
  
`;

const ButtonCancel = styled(Button)`
  margin-left: 10px;
  background-color: #fecaca;
  color: #de255c;
`;




function Address({swal}){

  const {accountObj} = useContext(AccountContext);


  const [addresses, setAddresses] = useState([]);

  const [editedAddress, setEditedAddress] = useState(null);
  
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [houseNumber, setHouseNumber] = useState('');


  useEffect(() => {
    fetchAddresses();

  },[]);

  async function saveAdressDestinaion(){

    const clientAccountId = accountObj._id;

    const data = {
      city, postalCode, street, country, houseNumber, clientAccountId,
   };

    if(editedAddress){
      data._id = editedAddress._id;
      await axios.put('/api/addressDestination', data);
      setEditedAddress(null);
    } else {
      await axios.post('/api/addressDestination', data);
    }


    setEditedAddress({});
    setCity('');
    setPostalCode('');
    setStreet('');
    setCountry('');
    setHouseNumber('');

    fetchAddresses();
  }

  function fetchAddresses(){
    axios.get('/api/addressDestination?clientAccountId='+accountObj._id).then(response => {
      setAddresses(response.data);
		});
  }

  function editAddress(addressObj) {
    setEditedAddress(addressObj);
    setCity(addressObj.city);
    setPostalCode(addressObj.postalCode);
    setStreet(addressObj.street);
    setCountry(addressObj.country);
    setHouseNumber(addressObj.houseNumber);
  }
  function deleteAddress(addressObj){
    swal.fire({
      title: 'Вы уверены?',
      text: `Вы уверены что хотите удалить этот адрес ?`,
      showCancelButton: true,
      cancelButtonText: 'Отмена',
      confirmButtonText: 'Да, удалить!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if(result.isConfirmed){
        const {_id} = addressObj;
        await axios.delete('/api/addressDestination?_id='+_id);
        fetchAddresses();
      }
    });
  }



  return (
    <>
      <AccountLayout>
        Адреса доставки

        <InputWrapper>
          <Input type="text" placeholder="Почтовый индекс" value={postalCode} name="PostalCode" onChange={ev => setPostalCode(ev.target.value)}/>
          <Input type="text" placeholder="Страна" value={country} name="Country" onChange={ev => setCountry(ev.target.value)}/>
          <Input type="text" placeholder="Город" value={city} name="City" onChange={ev => setCity(ev.target.value)}/>
          <Input type="text" placeholder="Улица" value={street} name="Street" onChange={ev => setStreet(ev.target.value)}/>
          <Input type="text" placeholder="Номер дома" value={houseNumber} name="houseNumber" onChange={ev => setHouseNumber(ev.target.value)}/>

          
        </InputWrapper>

        <Button >
          Отменить
        </Button>
        <Button $primary onClick={saveAdressDestinaion}>
          Сохранить
        </Button>


        {/* {!editedAddress && ( */}

          <Table >
            <Thead>
              <TrTh>
                <Th>индекс</Th>
                <Th>Страна</Th>
                <Th>Город</Th>
                <Th>Улица</Th>
                <Th>Дом</Th>
                <Th></Th>
              </TrTh>
            </Thead>
            <tbody>
              {addresses.length > 0 && addresses.map(addr => (
                <tr key={addr._id}>
                  <Td>{addr.postalCode}</Td>
                  <Td>{addr.country}</Td>
                  <Td>{addr.city}</Td>
                  <Td>{addr.street}</Td>
                  <Td>{addr.houseNumber}</Td>
                  <Td>
                    <Button  
                      onClick={() => editAddress(addr)} 
                    >
                      Изменить
                    </Button >
                    <ButtonCancel 
                      onClick={() => deleteAddress(addr)}
                    >
                      Удалить
                    </ButtonCancel>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        {/* )} */}


      

      </AccountLayout>
    </>
  );
}

export default withSwal(({swal}, ref) => (
  <Address swal={swal}/>
));