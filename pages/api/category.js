import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
  await mongooseConnect();
  res.json(await Category.findOne({_id:req.query.parent}));
  console.log(req.query.parent);
}