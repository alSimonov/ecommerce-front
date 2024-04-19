import { mongooseConnect } from "@/lib/mongoose";
import { ClientAccount } from "@/models/ClientAccount";

export default async function handle(req, res){
	const {method} = req;
	await mongooseConnect();



	if( method === 'GET'){
		if (req.query?.email) {
			res.json(await ClientAccount.findOne({email:req.query.email}));
		} else {
			res.json(await ClientAccount.find());
		}
	}

	if(method === 'POST') {
		const {email, surname, name, password } = req.body;
		const ClientAccountDoc = await ClientAccount.create({
			email, surname, name, password,
		})
		res.json(ClientAccountDoc);
	}

	if( method === 'PUT') {
		const {email, surname, name, password } = req.body;
		await ClientAccount.updateOne({_id}, {email, surname, name, password });
		res.json(true);
	}

	if(method === 'DELETE') {
		if (req.query?.id) {
			await ClientAccount.deleteOne({_id:req.query?.id});
			res.json(true);
		}
	}
}