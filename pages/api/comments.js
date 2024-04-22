import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";


export default async function handle(req, res){
	const {method} = req;
	await mongooseConnect();


	if( method === 'GET'){
		if (req.query?.clientAccountId) {
			res.json(await Comment.find({clientAccountId:req.query.clientAccountId}));
		} else if (req.query?.productId) {
			res.json(await Comment.find({productId:req.query.productId}));
		} else {
			res.json(await Comment.find());
		}
	}

	if(method === 'POST') {
		const {commentText, ratingValue, clientAccountId, productId, } = req.body;
		const CommentDoc = await Comment.create({
			commentText, ratingValue, clientAccountId, productId,
		})
		res.json(CommentDoc);
	}

	if( method === 'PUT') {
		const {_id, commentText, ratingValue, clientAccountId, productId, } = req.body;
		await Comment.updateOne({_id}, {commentText, ratingValue, clientAccountId, productId,  });
		res.json(true);
	}

	if(method === 'DELETE') {
		if (req.query?._id) {
			await Comment.deleteOne({_id:req.query?._id});
			res.json(true);
		}
	}
}