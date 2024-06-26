import styled, { css } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Input from "./Input";
import { Rating } from "@mui/material";
import Test from './Test';
import { Category } from "@/models/Category";
import Trash from "./icons/Trash";
import axios from "axios";
import IconConfirm from "./icons/IconConfirm";
import X_markIcon from "./icons/X_markIcon";

const ProductWrapper = styled.div`
  

`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  text-align: center;
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
const ImagexBox = styled(Link)`

  max-width: 100%;
  max-height: 100px;

`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1.1rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const RowRate = styled.div`
  display: flex;
  font-size: .9rem;
  
  text-color: #ccc;
  justify-content: space-between;
`;
const RowAvailable = styled.div`
  height: 1em;
  color: #16a34a;
  display: flex;
  font-size: .9rem;
  
  
  // justify-content: space-between;
`;
const RowUnavailable = styled.div`
  height: 1em;
  color: #dc2625;
  display: flex;
  font-size: .9rem;
  
  
  // justify-content: space-between;
`;
const IconWrapperConfirm = styled.div`

  height: 1em;
  color: #16a34a;
`;
const Properties = styled.div`
  display: block;
  font-size: .9rem;
  margin-top: 5px;
  text-color: #ccc;
  text-align: ;
`;
const Property = styled.div`
  display: flex;
  font-size: .85rem;
  color: #555;
  justify-content: space-between;
`;

const ProductInfoBox = styled.div`
  display: block;
  margin-top: 5px;
  text-color: #333;
  text-decoration: none;

`;
const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-around;
  }

  span{
    font-weight: 400;
    font-size: .7rem;
    color: #777;
  }
`;
const MeasureBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const MeasureButton = styled(Button)`
  font-size: .8rem;
  ${props => !props.$selected  && css`
    background-color: transparent;
  `};
`;
const AmountInput = styled(Input)`
  width: 35px;
  margin: 0px;
  outline: none;
  text-align: center;

  &::-webkit-outline-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

`;


const PriceRow = styled.div`
  display: block;

  @media screen and (min-width: 768px) {
    display: block;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 1rem;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-weight: 600;
    font-size: 1rem;
    text-align: left;
  }
`;

 
const ButtonRow = styled.div`
  display: flex;
  gap: 2px;

`;

const ButtonTrash = styled(Button)`
  padding: 4px;
  padding-left: 10px;
  color: red;
  background-color: white;


`;


export default function ProductBox({_id, title, description, price, measures, images, category, rate, properties, available}) {
  const {addProduct, cartProducts, removeProduct} = useContext(CartContext);
  const url = '/product/' +_id;

  const [currentMeasure, setCurrentMeasure] = useState({ measure: "шт." , value: 1}); 
  const [amount, setAmount] = useState(1);
  // const [currentMeasure, setCurrentMeasure] = useState({price: price, measure: "шт"});

  const [cartProductsTemp, setCartProductsTemp] = useState(cartProducts);
  const [propertyProduct, setPropertyProduct] = useState("");


  const [categoryObj, setCategoryObj] = useState({});
  const [productImg, setProductImg] = useState(images?.[0]);

  const [comments, setComments] = useState([]);
  const [productAvgRate, setProductAvgRate] = useState(0);
  const [countComments, setCountComments] = useState("");



  useEffect(() => {
		
    if(images[0] === undefined){
      axios.get('/api/categories?id='+category).then(response => {
        setProductImg(response.data[0]?.images[0]);
      });
      
    }

    axios.get('/api/comments?productId='+_id).then(response => {
      setComments(response.data);
    });
  
 
	}, []) 
  
  useEffect(() => {
    if(comments.length > 0){
      calculateAvgRate();
    }  
	}, [comments]) 

  function calculateAvgRate(){
    var sum = 0;
    comments.map(comm => sum += comm.ratingValue);
    var avgSum = (sum / comments.length)/10;
    setProductAvgRate(avgSum);

    switch(comments.length % 10){
      case 0: 
      case 5: 
      case 6: 
      case 7: 
      case 8: 
      case 9: setCountComments(comments.length + " отзывов"); break;

      case 1: setCountComments(comments.length + " отзыв"); break;
      case 2:  
      case 3: 
      case 4: setCountComments(comments.length + " отзыва"); break;
    }
  }


  


  // useEffect(() => {
  //   setProductImg(categoryObj[0]?.images[0]);
  //   console.log(categoryObj[0]?.images[0]);

	// }, [categoryObj]) 




  // console.log(category);

  // const categoryObj = await Category.findById(category);

  // console.log(categoryObj);

  // useEffect(() => {
  //   let propertyProducttxt = ""; 
  //   typeof properties !== 'undefined' && Object.entries(properties).map(([key, value]) => (
  //     propertyProducttxt += ` ${key}: ${value} \n`
  //   ))
  //   setPropertyProduct(propertyProducttxt)
  // })

  // useEffect(() => {
  //   setCurrentMeasure(cartProducts);
  // }, [cartProducts]);



  // function loadCart(){

  // }

  function addAmount () {
    setAmount( (currentMeasure.value - 0) + (amount - 0)  );
    // setAmount(amount - 0 + 1);
  
  }
  function lessAmount () {
    setAmount(amount <= currentMeasure.value ? currentMeasure.value : amount - currentMeasure.value);
  }
  function selectMeasure(index){
    setCurrentMeasure(measures[index]);
    setAmount(Math.round(measures[index].value));
  }
  function addProductToCart(id, amount, price){
    addProduct(id, amount, price)
    // loadCart();
  }

  

  return (
    <ProductWrapper>
      <WhiteBox >
        <ImagexBox href={url}>
          <img src={productImg} alt={title} />
          {/* <img src={images?.[0]} alt={title} /> */}
        </ImagexBox>

        <ProductInfoBox>
          <Title href={url}>{ title }</Title>
          
          <RowRate>
            <Rating name="half-rating-read" value={productAvgRate} precision={0.5} readOnly /> 
            {comments.length > 0 &&
              <>
                {countComments}
                {/* {comments.length} отзывов */}
              </>
            }

          </RowRate>


          { available && 
            <RowAvailable>
              <IconConfirm />
              Есть в наличии
            </RowAvailable>

            ||

            <RowUnavailable>
              <X_markIcon/>
              В наличии нет
            </RowUnavailable>
          }

          

          <Properties >
            { typeof properties !== 'undefined' && Object.entries(properties).map(([key, value]) => (
              <Property key={key} ><div>{key}:</div> <div>{value}</div></Property>
            ))}
          </Properties>






          {/* {console.log( Object.entries( properties).length  )} */}

          {/* { typeof properties !== 'undefined' && console.log(Object.keys(properties))} */}


          {/* <Property>
            {propertyProduct}
          </Property> */}

          {/* <Test /> */}
          

          <AmountRow>
            <div>
              <span>Кол-во:</span>
              <Button size="s" onClick={lessAmount}  >-</Button>
              <AmountInput $outlineNone type="number" min="0" 
                onChange={ev => setAmount(ev.target.value < 1 ? 1 : ev.target.value)} value={amount} />
              <Button size="s" onClick={addAmount} >+</Button>
            </div>
            <MeasureBlock>
              {measures?.length > 0 && measures?.map((measure, index) => (
                <MeasureButton key={index} size="s" $selected={currentMeasure.measure === measure.measure ? true : false} onClick={() =>  selectMeasure(index)} >{measure.measure}</MeasureButton>
                // <MeasureButton size="s" onClick={() =>  selectMeasure(index)} >{price}</MeasureButton>
              
              ))}
              
            </MeasureBlock>

          </AmountRow>

          <PriceRow>
            <Price>
              {/* от {currentPrice.value} руб./{currentPrice.measure} */}
              от {price * amount} руб.

            </Price>


                  
              {cartProducts?.length > 0 && cartProducts.map(pr => pr.productId).includes(_id) ? (
           
                <ButtonRow>



                  <Button $block onClick={() => addProductToCart(_id, amount, price)} $primary >
                      Добавить                
                  </Button>
                  

                  <Link href={"/cart"}>
                    <Button  $primary $outline  >
                    {/* <Button  $primary $outline onClick={() => location.href='/cart'} > */}
                      <CartIcon />
                      ({cartProducts.find(pr => pr.productId === _id).amount})
                    </Button>
                  </Link>

                  <ButtonTrash $block onClick={() => removeProduct(_id)} $primary $outline >
                      <Trash/>                
                  </ButtonTrash>
                      
                </ButtonRow> 
                  
                  )
                  :
                (

                  available ? 

                    <Button $block onClick={() => addProductToCart(_id, amount, price)} $primary $outline>
                      В корзину                
                    </Button>                
                    :
                    <Button $block onClick={() => {}} $primary $outline>
                      В корзину                
                    </Button>

                )
              }   

          
          </PriceRow>
        </ProductInfoBox>
      </WhiteBox>
    </ProductWrapper>
  );
}