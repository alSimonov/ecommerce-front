import styled, { css } from "styled-components";
import ProductBox from "./ProductBox";
import { Category } from "@/models/Category";


const StyledProductsGridCss = css`
  display: grid;
  grid-template-columns: 1fr ;
  gap: 20px;
  


  @media screen and (min-width: 768px) {
    // grid-template-columns: 1fr 1fr 1fr ;
    grid-template-columns: repeat(3, auto);
    place-content: start;


	}
  
  ${props => props.$countcolumns === '4' && css`
    @media screen and (min-width: 768px) {
      // grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-columns: repeat(4, auto);
      place-content: start;

    };
  `};
  
  ${props => props.$countcolumns === '3' && css`
    @media screen and (min-width: 768px) {
      // grid-template-columns: 1fr 1fr 1fr ;
      grid-template-columns: repeat(3, auto);
      place-content: start;

    }
  `};



`;

const StyledProductsGrid = styled.div`
   ${StyledProductsGridCss}
`;
 
export default function ProductsGrid({products,...rest}) {

  return (
    <StyledProductsGrid {...rest}>
      {products?.length > 0 && products.map((product) => (

        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}