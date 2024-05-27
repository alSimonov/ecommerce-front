import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { ClientAccount } from "@/models/ClientAccount";
import { Comment } from "@/models/Comment";
import { FeaturedProduct } from "@/models/FeaturedProduct";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import axios from "axios";
import { useSession } from "next-auth/react";


await mongooseConnect();

export default function GeneratePage() {
  
  

  return (
    <Layout>
      fffffffffffffffffff
        
      
    </Layout>
  );
}


export async function getServerSideProps() {
  // const featuredProductId = "65a3ef645e86368e3ed48cb7";
  await mongooseConnect();

  // await Comment.insertMany(


    


  // );

  // await Order.insertMany(

  // );

  // await Product.insertMany(

    

  // );
  
  return ;
  

}