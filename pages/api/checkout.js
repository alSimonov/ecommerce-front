import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if( req.method !== "POST" ) {
    res.json('should be a POST request');
    return;
  }

  const {name, email, phone, city, postalCode, streetAddress, country, houseNumber, cartProducts, typeDelivery} = req.body;
  await mongooseConnect();
  // const productsIds = cartProducts;
  // console.log(productsIds);
  
  // const uniqueIds = [...new Set(productsIds)];

  // const {productId} = cartProducts;
     

  // const productsInfos = await Product.find({_id: cartProducts.productId});
  


  let line_items = [];
  for (const product of cartProducts) {


    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ product.productId");
    console.log(product.productId);
    console.log(typeof product.productId);
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ product.productId end ");


    // const productInfo = Product.find(p => p._id.toString() === product.productId);
    const productInfo = await Product.findById({_id: product.productId});
    const productInfoCategory = await Category.findById({_id: productInfo.category});
    // const quantity = productsIds.filter(id => id === productId).length || 0;
    // const {amount, price} = cartProducts.find(p => p.productId === productId);
    // const {amount} = product;


    const quantity = product.amount;
    // const unit_amount = product.amount * product.price * 100;
    const unit_amount = product.price * 100;

    console.log("fffffffffffffffffffff");
    console.log(productInfoCategory.name);
    
    if(quantity > 0 && productInfo) {
      line_items.push({
        quantity, 
        price_data: {
          currency: 'RUB',
          product_data: {name: productInfo.title, description: productInfoCategory.name},
          unit_amount:  unit_amount,
        }
      });
    }
  }

  var orderDoc = "";

  if(typeDelivery){
    orderDoc = await Order.create({
      line_items, name, email, phone,
      statusOrder: "В сборке", paid:false 
     })
  } else {
    orderDoc = await Order.create({
      line_items, name, city, email, phone,
      postalCode, streetAddress,
      country, houseNumber, statusOrder: "В сборке", paid:false 
     })

  }


   const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId: orderDoc._id.toString(), test: 'ok'}
   });

  

   res.json({
    url: session.url,
   })

}