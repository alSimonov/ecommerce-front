import { AccountContext } from "@/components/AccountContext";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import Table from "@/components/Table";
import Trash from "@/components/icons/Trash";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 15px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;

`;

const FiltersCheck = styled.div`
  font-size: .9em;
  font-weight: 300;
`;


const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc; 
  border-radius: 5px;
  box-sizing: border-box;




`;



const WarningLabel = styled.label`

  font-size: .8em;
  color: red;


`;




export default function CartPage(){
  const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
  const {accountObj} = useContext(AccountContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);


  const [warningName, setWarningName] = useState(false);
  const [warningEmail, setWarningEmail] = useState(false);
  const [warningAddress, setWarningAddress] = useState(false);


  const [addresses, setAddresses] = useState([]);
  const [addressesValues, setAddressesValues] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [categories, setCategories] = useState([]);

  const emailTrust = ["@mail.ru", "@gmail.com" ,"@yandex.ru", "@example.com", "@example2.com"];

  let cartIds = [];
  useEffect(() => {
    loadCartProducts();
  }, [cartProducts]);

  useEffect(() => {
    if(typeof window === 'undefined') {
      return;
    }
    if(window?.location.href.includes('success')){
      setIsSuccess(true);
      clearCart();
    }

    loadAccountInfo();

    fetchCategories();

    if(accountObj !== undefined && accountObj._id !== undefined){
      fetchAddresses();
    }


   


  }, [])

  useEffect(() => {

    var addressesValuesTemp = [];

    // for(let i = 0; i < addresses.length; i++){
    //   var values = Object.keys(addresses).map(function(key){
    //     return addresses[key];
    //   });
    //   addressesValuesTemp.push(values);
    // }

    // setAddressesValues(addressesValuesTemp);

    addresses.map(function(adr) {
      addressesValuesTemp.push( adr.postalCode+", " + adr.country + " г." + adr.city + " ул." + adr.street + " д." + adr.houseNumber );
    });

    setAddressesValues(addressesValuesTemp);

    console.log("tttttttttttttttttttttttttttt");
    console.log(addresses);
    console.log(addressesValues);

  },[addresses])


  function changeName(value) {
    if(value === ""){
      setWarningName(true);
    }
    else setWarningName(false);
    if (noDigits(value))
     setName(value);
  }
  function changeCity(value) {
    if (noDigits(value))
     setCity(value);
  }
  function changePostalCode(value) {
    if (onlyDigits(value))
     setPostalCode(value);
  }
  function changeStreetAddress(value) {
    if (noDigits(value))
     setStreetAddress(value);
  }
  function changeCountry(value) {
    if (noDigits(value))
     setCountry(value);
  }

  function noDigits(value){
    if(value.length === 0){
      return true;
    }
    return "1234567890".indexOf(value.substr(value.length - 1)) == -1
  }
  function onlyDigits(value){
    if(value.length === 0){
      return true;
    }
    return "1234567890".indexOf(value.substr(value.length - 1)) !== -1
  }

  function changeEmail(value) {

    setWarningEmail(true);


    for (var i = 0; i < emailTrust.length; i++){
      if ( value.endsWith(emailTrust[i]) ) {
        setWarningEmail(false);
        break;
      }
    }
  
    setEmail(value);  
  }

  function loadAccountInfo(){
    setName(accountObj.surname + " " + accountObj.name);
    setEmail(accountObj.email);
  }

  function fetchAddresses(){
    axios.get('/api/addressDestination?clientAccountId='+accountObj._id).then(response => {
      setAddresses(response.data);
      
		});
  }
  function fetchCategories(){
    axios.get('/api/categories').then(response => {
      setCategories(response.data);
      
		});
  }

  function loadCartProducts() {
    if(cartProducts.length > 0){
      {cartProducts.map(product => {
        cartIds.push(product.productId);
      })}
      axios.post(`/api/cart`, {ids:cartIds}).then(response => {
        setProducts(response.data);
      })
    } else {
      setProducts([]);
    }
  }
  
  function moreOfThisProduct(productId, price){
    addProduct(productId, 1, price);
    loadCartProducts();
  }
  function lessOfThisProduct(productId, price){
    addProduct(productId, -1, price);
    loadCartProducts();
  } 
  function removeThisProduct(id){
    removeProduct(id);
  } 
  

  async function goToPayment(){

    if(warningName){
      return
    }
    if(warningEmail){
      return
    }

    if(selectedAddress === "" ){
      if(!city || !postalCode || !streetAddress || !country || !houseNumber){
        setWarningAddress(true);
        return
      }
    } 

    var data = {};

    if(selectedAddress === "" ){
      data = {
        name,email,city,postalCode,streetAddress,country, houseNumber, cartProducts
      };
    } else{
      data = {
        name,email,city: addresses[selectedAddress].city, 
        postalCode: addresses[selectedAddress].postalCode, 
        streetAddress: addresses[selectedAddress].street, 
        country: addresses[selectedAddress].country, 
        houseNumber: addresses[selectedAddress].houseNumber, 
        cartProducts
      };
    }

    

    const response = await axios.post('/api/checkout', data);
    if(response.data.url){
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const product of cartProducts){
    total += product.price * product.amount;
  }

  if(isSuccess){
    return (
      <>
        <Layout>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Спасибо за покупку!</h1>
                <p>Мы пришлем письмо на почту, когда заказ будет отправлен.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Center>
          <ColumnsWrapper>
            <Box id="cart">
              <h2>Корзина</h2>
              {!cartProducts?.length && (
                <div>Ваша корзина пуста</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Продукт</th>
                      <th>Количество</th>
                      <th>Цена</th>
                      <th></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map(product => (
                      <tr key={product.productId}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={
                              
                              products.find(p => p._id === product.productId)?.images[0] || 
                              categories.find(c => c._id === products.find(p => p._id === product.productId).category)?.images[0]
                            
                            } alt="" />
                          </ProductImageBox>
                          {products.find(p => p._id === product.productId)?.title}
                        </ProductInfoCell>
                        <td>

                          {product.amount !== 1 ? (
                            <Button onClick={() => lessOfThisProduct(product.productId, product.price)}  $primary $light 
                              >
                                -
                              </Button>
                          ):(
                            <Button > 
                              - 
                            </Button>
                          ) 
                        
                          }
                
                          <QuantityLabel>
                            {product.amount}
                          </QuantityLabel>
                          <Button  onClick={() => moreOfThisProduct(product.productId, product.price)} $primary $light 
                            >
                              +
                            </Button>
                        </td>
                        <td>
                        ₽{product.amount * product.price}
                          
                        </td>
                        <td>
                          <Button onClick={() => removeThisProduct(product.productId)} $red  size="icon"><Trash /></Button>
                        </td>

                      </tr>
                    ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>₽{total}</td>
                        <td>
                          <Button onClick={clearCart} $red  size="icon"><Trash /></Button>
                        </td>
                      </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <h2>Информация заказа</h2>
                
                {warningName &&
                  <WarningLabel>*Укажите ваше имя</WarningLabel> 
                }
                <Input type="text" placeholder="Имя" value={name} name="name" onChange={ev => changeName(ev.target.value)}/>
                {warningEmail&&
                  <WarningLabel>*Сервер почты не опознан</WarningLabel> 
                }
                <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => changeEmail(ev.target.value)}/>

                {warningAddress &&
                  <WarningLabel>*Укажите адрес доставки</WarningLabel> 
                }

                <StyledSelect 
                  value={selectedAddress}
                  onChange={ev => setSelectedAddress(ev.target.value)}
                >
                  <option value="">Выберите адрес доставки</option>
                  {addressesValues.length > 0 && Object.entries(addressesValues).map(([key, value]) => (
                    <option value={key}>{value}</option>
                  ))}
                </StyledSelect>
                   
                {selectedAddress === "" &&
                  <>
                    <div>
                      Или напишите вручную
                    </div>
                    <Input type="text" placeholder="Страна" value={country} name="country" onChange={ev => changeCountry(ev.target.value)}/>

                    <CityHolder>
                      <Input type="text" placeholder="Город" value={city} name="city" onChange={ev => changeCity(ev.target.value)}/>
                      <Input type="text" placeholder="Почтовый индекс" value={postalCode} name="postalCode" onChange={ev => changePostalCode(ev.target.value)}/>
                    </CityHolder>
                    <Input type="text" placeholder="Улица" value={streetAddress} name="streetAddress" onChange={ev => changeStreetAddress(ev.target.value)}/>
                    <Input type="text" placeholder="Номер дома" value={houseNumber} name="houseNumber" onChange={ev => setHouseNumber(ev.target.value)}/>
                  </>
                }   
                <Button $black $block onClick={goToPayment} >Продолжить оплату</Button>
              
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </Layout>
    </>
  );
}