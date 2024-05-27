import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { FeaturedProduct } from "@/models/FeaturedProduct";
import { Product } from "@/models/Product";
import axios from "axios";
import { useSession } from "next-auth/react";



export default function HomePage({featuredProduct, newProducts}) {
  
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  console.log(newProducts);

  function insertData(){
    axios.insert('/api/clientAccount');
  }

  return (
    <Layout>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const featuredProductId = "65a3ef645e86368e3ed48cb7";
  await mongooseConnect();

  const featuredProductId = await FeaturedProduct.findById("664f3dfe3b795a09c7aae38b");

  const featuredProduct = await Product.findById(featuredProductId.productId);

  const queryDB = {  active:  true  };
  

  // const newProducts = await Product.find({active: true}, null, { sort: {'_id': -1}, limit: 8 });
  const newProducts = await Product.find(queryDB, null, { sort: {'_id': -1}, limit: 8 });

 

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };

}