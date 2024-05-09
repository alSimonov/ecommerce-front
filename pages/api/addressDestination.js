import { mongooseConnect } from "@/lib/mongoose";
import { AddressDestination } from "@/models/AddressDestination";
import { ClientAccount } from "@/models/ClientAccount";

export default async function handle(req, res){
	const {method} = req;
	await mongooseConnect();



	if( method === 'GET'){
		if (req.query?.clientAccountId) {
			res.json(await AddressDestination.find({clientAccountId:req.query.clientAccountId}));
		} else {
			res.json(await AddressDestination.find());
		}
	}

	if(method === 'POST') {
		const {city, postalCode, street, country, houseNumber, clientAccountId } = req.body;
		const AddressDestinationDoc = await AddressDestination.create({
			city, postalCode, street, country, houseNumber, clientAccountId 
		})
		res.json(AddressDestinationDoc);
	}

	if( method === 'PUT') {
		const {_id, city, postalCode, street, country, houseNumber, clientAccountId } = req.body;
		await AddressDestination.updateOne({_id}, {city, postalCode, street, country, houseNumber, clientAccountId  });
		res.json(true);
	}

	if(method === 'DELETE') {
		if (req.query?._id) {
			await AddressDestination.deleteOne({_id:req.query?._id});
			res.json(true);
		}
	}
}