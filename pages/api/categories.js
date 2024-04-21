import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if(method === 'GET'){
        if (req.query?.id) {
			res.json(await Category.find({_id:req.query.id}));
		}
        else if(req.query?.parent) {
			res.json(await Category.find({parent:req.query.parent}));
		} else {
			res.json(await Category.find().populate('parent'));
		}
        
    }
    
}