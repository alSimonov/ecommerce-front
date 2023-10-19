import CategoriesGrid from "@/components/CategoriesGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
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

export default function CategoriesPage() {

  const [categories, setCategories] = useState([]);


  const router = useRouter();
	const {id} = router.query;
	useEffect(() => {
		if (!id ){
			return;
		}

		axios.get('/api/categories?id='+id).then(response => {
			setCategories(response.data);
		});
	}, [id]);


  // useEffect(() => {
  //   fetchCategories();
  // },[])
 
  // function fetchCategories() {
  //   axios.get('/api/categories').then(result => {
  //     setCategories(result.data);
  //   });
  // }

  return (
    <>
      <Header />
      <Center>
        <Title>Категории</Title>
        <CategoriesGrid categories={categories}/>
      </Center>
    </>
  );
}
 
// export async function getServerSideProps(){
//   await mongooseConnect(); 

//   const categories = await Category.find({}, null, {sort: {'_id': -1}});


//   return {
//     props:{
//       categories: JSON.parse(JSON.stringify(categories)),
//     }
//   };
// }