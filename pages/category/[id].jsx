import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Select from "@/components/Select";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
  
`;

export default function CategoryPage({categories}) {

  const [products, setProducts] = useState([]);


  const router = useRouter();
	const {id} = router.query;
	useEffect(() => {
		if (!id ){
			return;
		}

		axios.get('/api/products?id='+id).then(response => {
			setProducts(response.data);
		});
	}, [id]);


  return (
    <>
      <Header />
      <Center>
        <SelectWrapper>
          <Title>Категории</Title>
          <Select >
            <option value="">Нет</option>
            {categories.length > 0 && categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </Select>
        </SelectWrapper>

        <ProductsGrid products={products}/>
      </Center>
    </>
  );
}
 
export async function getServerSideProps(){
  await mongooseConnect(); 

  // const products = await Product.find({}, null, {sort: {'_id': -1}});
  const categories = await Category.find({}, null, {sort: {'_id': -1}});


  return {
    props:{
      // products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    }
  };
}