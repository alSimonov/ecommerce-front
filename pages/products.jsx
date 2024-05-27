import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';


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
`;
const PaginationWrapper = styled.div`
  
  display: flex;
  margin-top: 30px;  
  justify-content: center;
  
`;


export default function ProductsPage(){

  const [products, setProducts] = useState("");
  const [sorteredProducts, setSorteredProducts] = useState("");
  const [title, setSearchTitle] = useState("");
  const [selectedSort, setSelectedSort] = useState("title");
  const [selectedSortVect, setSelectedSortVect] = useState("-1");

  const [page, setPage] = useState(1);
  const [countProduct, setCountProduct] = useState(10);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchProducts();
  },[page])


  useEffect(() => {
    fetchProducts();
  },[title])

  useEffect(() => {
    fetchProducts();
  },[selectedSort])

  useEffect(() => {
    fetchProducts();
  },[selectedSortVect])


  // useEffect(() => {
  //   sorteredProductsFunc();
  // },[selectedSort])
  
  async function fetchProducts(){
    await axios.get('/api/products?title='+title+'&sort='+selectedSort+'&sortVect='+selectedSortVect+'&page='+page).then(response => {
      setProducts(response.data);
		});
    
    await axios.get('/api/products?count='+1).then(response => {
      setCountProduct(response.data );
		});

  }

  function sorteredProductsFunc(){

    setSorteredProducts();
  }

  return (
    <>
      <Layout>
        <Center>
          <Title>Все товары</Title>
          <Input type="text" placeholder="Поиск" value={title} name="searchTitle" onChange={ev => setSearchTitle(ev.target.value)}/>
          <SortRow>
            <div>
              Сортировать по 
            </div>
            <StyledSelect 
              value={selectedSort}
              onChange={ev => setSelectedSort(ev.target.value)}
            >
              <option value="title">названию</option>
              {/* <option value="rate">рейтингу</option>  */}
              <option value="price">цене</option>
            </StyledSelect>
            <StyledSelect 
              value={selectedSortVect}
              onChange={ev => setSelectedSortVect(ev.target.value)}
            >
              <option value="-1">по убыванию</option>
              <option value="1">по возростанию</option> 
            </StyledSelect>
          </SortRow>
          <ProductsGrid $countcolumns="4" products={products}/>

          <PaginationWrapper>
            <Pagination count={countProduct} page={page} onChange={handleChangePage} />
          </PaginationWrapper>

        </Center>
      </Layout>
    </>
  );
}

// export async function getServerSideProps(){
//   await mongooseConnect(); 
//   const products = await Product.find({}, null, {sort: {'_id': -1}});
  
//   return {
//     props:{
//       products: JSON.parse(JSON.stringify(products)),
//     }
//   };
// } 