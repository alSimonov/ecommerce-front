import Center from "@/components/Center";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";


export default function ProductsPage({products}){
  return (
    <>
      <Layout>
        <Center>
          <Title>All products</Title>
          <ProductsGrid products={products}/>
        </Center>
      </Layout>
    </>
  );
}

export async function getServerSideProps(){
  await mongooseConnect(); 
  const products = await Product.find({}, null, {sort: {'_id': -1}});

  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
} 