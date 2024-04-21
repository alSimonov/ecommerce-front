import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";



export default function HomePage({featuredProduct, newProducts}) {
  

  return (
    <Layout>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </Layout>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65a3ef645e86368e3ed48cb7";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: {'_id': -1}, limit: 8 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };

}