import styled, { css } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Input from "./Input";


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
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
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

export default function ProductBox({_id, title, description, prices, images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/' +_id;

  const [valueInput, setValueInput] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(prices[0]);


  function addAmount () {
    setValueInput(valueInput - 0 + 1);
  }
  function lessAmount () {
    setValueInput(valueInput === 1 ? 1 : valueInput - 1);
  }
  function selectMeasure(index){
    setCurrentPrice(prices[index]);
  }

  return (
    <ProductWrapper>
      <WhiteBox >
        <ImagexBox href={url}>
          <img src={images?.[0]} alt={title} />
        </ImagexBox>

        <ProductInfoBox>
          <Title href={url}>{title}</Title>



          <AmountRow>
            <div>
              <span>Кол-во:</span>
              <Button size="s" onClick={lessAmount}  >-</Button>
              <AmountInput $outlineNone type="number" min="0" 
                onChange={ev => setValueInput(ev.target.value < 1 ? 1 : ev.target.value)} value={valueInput} />
              <Button size="s" onClick={addAmount} >+</Button>
            </div>
            <MeasureBlock>
              {prices?.length > 0 && prices?.map((price, index) => (
                <MeasureButton size="s" $selected={currentPrice.measure === price.measure ? true : false} onClick={() =>  selectMeasure(index)} >{price.measure}</MeasureButton>
              ))}
              
            </MeasureBlock>

          </AmountRow>

          <PriceRow>
            <Price>
              от {currentPrice.value} руб./{currentPrice.measure}
            </Price>
            <Button $block onClick={() => addProduct(_id, valueInput, currentPrice)} $primary $outline>
              В корзину
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </WhiteBox>
    </ProductWrapper>
  );
}