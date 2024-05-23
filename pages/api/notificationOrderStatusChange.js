import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { NotificationOrderStatusChange } from "@/models/NotificationOrderStatusChange";

export default async function handle(req, res){
	const {method} = req;
	await mongooseConnect();



	if( method === 'GET'){
		if (req.query?.email) {
			res.json(await NotificationOrderStatusChange.find({email:req.query.email}).sort({createdAt:-1}));
		} else {
			res.json(await NotificationOrderStatusChange.find().sort({createdAt:-1}));
		}
	}

	if(method === 'POST') {
		const {order, email, watched, statusOrder} = req.body;
		const NotificationOrderStatusChangeDoc = await NotificationOrderStatusChange.create({
			order, email, watched, statusOrder,	
		})
		res.json(NotificationOrderStatusChangeDoc);
	}

	if( method === 'PUT') {
		const {order, email, watched, statusOrder, _id } = req.body;
		await NotificationOrderStatusChange.updateOne({_id}, {order, email, watched, statusOrder});
		res.json(true);
	}

	if(method === 'DELETE') {
		if (req.query?.id) {
			await NotificationOrderStatusChange.deleteOne({_id:req.query?.id});
			res.json(true);
		}
	}
}