import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET'){
        if (req.query?.id) {
			res.json(await Product.find({category:req.query.id}));
		}
        else {
			res.json(await Product.find());
		}
        
    }
     
}