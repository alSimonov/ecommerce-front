import {mongooseConnect} from "@/lib/mongoose";
import { Order } from "@/models/Order";


export default async function handle(req, res) {
  await mongooseConnect();
  res.json(await Order.find({email:req.query.email}, null, { sort: {'createdAt': -1}}));
  console.log(req.query.email);
}