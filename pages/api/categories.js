import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET'){
        if (req.query?.id) {
			res.json(await Category.find({parent:req.query.id}));
		} else {
			res.json(await Category.find().populate('parent'));
		}
        
    }
    
}