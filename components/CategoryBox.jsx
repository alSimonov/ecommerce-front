import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import mongoose from "mongoose";


const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  text-align: center;
`;




export default function CategoryBox({ _id, name, images}) {
  

  const url = '/category/' +_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt={name} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{name}</Title>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

// export async function getServerSideProps(){
//   await mongooseConnect(); 

  
//   const product = await Product.findOne({category: mongoose.Types.ObjectId(_id)}).exec();
//   return {
//     props:{
//       product: JSON.parse(JSON.stringify(product)),
//     }
//   };
// }