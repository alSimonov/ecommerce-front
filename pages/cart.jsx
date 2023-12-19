import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
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

export default function CartPage(){
  const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  let cartIds = [];
  useEffect(() => {
    loadCartProducts();
  }, [cartProducts]);

  useEffect(() => {
    if(typeof window === 'undefined') {
      return;
    }
    if( window?.location.href.includes('success')){
      setIsSuccess(true);
      clearCart();
    }
  }, [])

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
  
  function moreOfThisProduct(productId, amount, price){
    addProduct(productId, amount + 1, price);
    loadCartProducts();
  }
  function lessOfThisProduct(productId, amount, price){
    addProduct(productId, amount - 1, price);
    loadCartProducts();
  } 
  function removeThisProduct(id){
    removeProduct(id);
  } 
  

  async function goToPayment(){
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,cartProducts
    });
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
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Спасибо за покупку!</h1>
              <p>Мы пришлем письмо на почту, когда заказ будет отправлен.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
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
                          <img src={products.find(p => p._id === product.productId).images[0]} alt="" />
                        </ProductImageBox>
                        {products.find(p => p._id === product.productId).title}
                      </ProductInfoCell>
                      <td>
                        <Button 
                          onClick={() => lessOfThisProduct(product.productId, product.amount, product.price)}
                          >-</Button>
                        <QuantityLabel>
                          {product.amount}
                        </QuantityLabel>
                        <Button 
                          onClick={() => moreOfThisProduct(product.productId, product.amount, product.price)}
                          >+</Button>
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
              
              <Input type="text" placeholder="Имя" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
              <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
              <CityHolder>
                <Input type="text" placeholder="Город" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                <Input type="text" placeholder="Почтовый индекс" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type="text" placeholder="Улица" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input type="text" placeholder="Страна" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
              
              <Button $black $block onClick={goToPayment} >Продолжить оплату</Button>
            
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}