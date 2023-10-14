import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_fb7ad00efeed7cfda705c5046551a0a775ad4f4aa71c998c26bd91b39a6f4552";


export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if(orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }
      break;
  
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('OK');
}

export const config = {
  api: {
    bodyParser: false,
  }
};



// super-wows-oasis-helped
// acct_1O0NOQEzSTzQ4e7O